import { UnitDao } from "../services/dao/unit.dao";
import { Unit } from "../models/unit.model";
import { RelationResource } from "./relation.resource";
import { Relation } from "../models/relation.model";
import logger from "../util/logger";

import { UnitOutputDto } from "../dtos/unitOutput.dto";

export class UnitResource {
    private unitDao: UnitDao;
    private relationResource: RelationResource;

    constructor() {
        this.unitDao = new UnitDao();
        this.relationResource = new RelationResource();
    }

    async create(name: string): Promise<Unit> {
        return await this.unitDao.create(name);
    }
    async findByName(name: string): Promise<UnitOutputDto[]> {
        let result: UnitOutputDto[] = undefined;
        const units: Unit[] = await this.unitDao.findByName(name);
        if (units) {
            result = [];
            for (let i = 0 ; i < units.length ; i++) {
                const topUnits: Unit[] = await this.getTopUnits(units[i].getId());
                if (topUnits) {
                    for (let j = 0 ; j < topUnits.length ; j++) {
                        const unitOutputDto: UnitOutputDto = {name: units[i].getName(), code: units[i].getCode(), topUnit: {name: topUnits[j].getName(), code: topUnits[j].getCode()}};
                        result.push(unitOutputDto);
                    }
                } else {
                    const unitOutputDto: UnitOutputDto = {name: units[i].getName(), code: units[i].getCode(), topUnit: undefined};
                    result.push(unitOutputDto);
                }
            }
        }
        return result;
    }
    async findAll(): Promise<Unit[]> {
        return  await this.unitDao.findAll();
    }
    async findByCode(code: number): Promise<Unit> {
        return await this.unitDao.findByCode(code);
    }
    async delete(unit: Unit): Promise<boolean> {
        const statusDeleteRelations: boolean = await this.relationResource.deleteByConexion(unit);
        const statusDeleteUnit: boolean = await this.unitDao.delete(unit.getId());
        return statusDeleteRelations && statusDeleteUnit;
    }
    async findById(id: number): Promise<Unit> {
        return await this.unitDao.findById(id);
    }
    async getFriends(unit: number, n: number): Promise<Set<number>> {
        console.log("ESTOY EN: " + unit);
        const lowerUnits: number[]  =  await this.relationResource.findIdByTopUnit(unit);
        console.log(lowerUnits);
        console.log("-------------");

        // console.log(lowerUnits);
        // ∫console.log("lowerUnits.length " + lowerUnits.length);

        if ( lowerUnits.length == 0) {
            const set =  new Set();
            set.add(unit);
            return set;
        }
        else {
            let set =  new Set();
            for ( let i = 0; i < lowerUnits.length; i++ ) {
                if (n > -1) {
                    set = set.add(await this.getFriends(lowerUnits[i], n - 1));
                }
            }
            set.add(unit);
            // console.log("SETTT-----" + JSON.stringify(set));
            return set;
        }
    }
    async getTopUnits(code: number): Promise<Unit[]> {
        let topUnits: Unit[] = undefined;
        const relations: Relation[] = await this.relationResource.findByLowerUnit(code);
        if (relations && (relations.length > 0)) {
            topUnits = [];
            for (let i = 0 ; i < relations.length; i++) {
                const topUnit: Unit = await this.findById(relations[i].getTopUnit().getId());
                if (topUnit) {
                    topUnits.push(topUnit);
                }
            }
        }
        return topUnits;
    }
}
