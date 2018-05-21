import { UnitDao } from "../services/dao/unit.dao";
import { Unit } from "../models/unit.model";
import { RelationResource } from "./relation.resource";
import { Relation } from "../models/relation.model";
import logger from "../util/logger";
import { SearchByNameOutputDto } from "../dtos/searchByNameOutput.dto";

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
    async findByName(name: string): Promise<SearchByNameOutputDto[]> {
        let result: SearchByNameOutputDto[] = undefined;
        const units: Unit[] = await this.unitDao.findByName(name);
        logger.info(JSON.stringify(units));
        if (units) {
            result = [];
            for (let i = 0 ; i < units.length ; i++) {
                const topUnits: Unit[] = await this.getTopUnits(units[i].getId());
                if (topUnits) {
                    logger.info("topUnits " + topUnits.length);
                    logger.info("2--------------------------- " + topUnits.length);
                    for (let j = 0 ; j < topUnits.length ; j++) {
                        const autocompleteOutputDto: SearchByNameOutputDto = {unit: units[i], topUnit: topUnits[j]};
                        result.push(autocompleteOutputDto);
                    }
                } else {
                    logger.info("topUnits UNDEFINED");
                    const autocompleteOutputDto: SearchByNameOutputDto = {unit: units[i], topUnit: undefined};
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
        if (relations) {
            topUnits = [];
            logger.info("----------------------- relations " + JSON.stringify(relations));
            for (let i = 0 ; i < relations.length; i++) {
                const topUnit: Unit = await this.findById(relations[i].getTopUnit().getId());
                if (topUnit) {
                    topUnits.push(topUnit);
                }
            }
        }
        logger.info("----------------------- topUnits " + JSON.stringify(topUnits));
        return topUnits;
    }
}
