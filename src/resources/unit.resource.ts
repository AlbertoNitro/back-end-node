import { UnitDao } from "../services/dao/unit.dao";
import { Unit } from "../models/unit.model";
import { RelationResource } from "./relation.resource";
import { Relation } from "../models/relation.model";
import { AutocompleteOutputDto } from "../dtos/autocompleteOutput.dto";
import logger from "../util/logger";

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
    async findByName(name: string): Promise<AutocompleteOutputDto[]> {
        let result: AutocompleteOutputDto[] = undefined;
        const units: Unit[] = await this.unitDao.findByName(name);
        logger.info(JSON.stringify(units));
        if (units) {
            result = [];
            let topUnits: Unit[] = [];
            for (let i = 0 ; i < units.length; i++) {
                topUnits = await this.getTopUnits(units[i].getId());
                if (topUnits) {
                    for (let j = 0 ; j < units.length; j++) {
                        const autocompleteOutputDto: AutocompleteOutputDto = {unit: units[i], topUnit: topUnits[j]};
                        result.push(autocompleteOutputDto);
                    }
                } else {
                    const autocompleteOutputDto: AutocompleteOutputDto = {unit: units[i], topUnit: undefined};
                    result.push(autocompleteOutputDto);
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
    async delete(code: number): Promise<boolean> {
        const statusDeleteUnit: boolean = await this.unitDao.delete(code);
        const statusDeleteRelations: boolean = await this.relationResource.deleteByConexion(code);
        return statusDeleteUnit && statusDeleteRelations;
    }
    async findById(id: number): Promise<Unit> {
        return await this.unitDao.findById(id);
    }
    async getTopUnits(code: number): Promise<Unit[]> {
        let topUnits: Unit[] = undefined;
        const relations: Relation[] = await this.relationResource.findByLowerUnit(code);
        if (relations) {
            topUnits = [];
        }
        for (let i = 0 ; i < relations.length; i++) {
            const topUnit: Unit = await this.findById(relations[i].getTopUnit().getId());
            if (topUnit) {
                topUnits.push(topUnit);
            }
        }
        return topUnits;
    }
    async getFriends(unit: Unit, n: number): Promise<any> {
        const lowerUnits: Unit[] = await this.relationResource.findUnitsByTopUnit(unit);
        console.log(lowerUnits);
        console.log("lowerUnits.length " + lowerUnits.length);

        if ( lowerUnits.length == 0) {
            const set =  new Set();
            set.add(unit);
            return set;
        }
        else {
            let set =  new Set();
            for ( let i = 0; i < lowerUnits.length; i++ ) {
                set = set.add(await this.getFriends(lowerUnits[i], n - 1));
            }
            set.add(unit);
            return set;
        }
    }
}
