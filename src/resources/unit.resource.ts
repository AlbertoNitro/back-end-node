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
            for (let i = 0 ; i < units.length ; i++) {
                const topUnits: Unit[] = await this.getTopUnits(units[i].getId());
                if (topUnits) {
                    logger.info("topUnits " + topUnits.length);
                    logger.info("2--------------------------- " + topUnits.length);
                    for (let j = 0 ; j < topUnits.length ; j++) {
                        const autocompleteOutputDto: AutocompleteOutputDto = {unit: units[i], topUnit: topUnits[j]};
                        result.push(autocompleteOutputDto);
                    }
                } else {
                    logger.info("topUnits UNDEFINED");
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
    async getFriends(unitCode: number, iteracion: number): Promise<Set<number>> {
        const lowerUnits: number[]  =  await this.relationResource.findIdByTopUnit(unitCode);

        if ( lowerUnits.length == 0) {
            const set =  new Set();
            return set.add(unitCode);
        }
        else {
            let set =  new Set();
            for ( let i = 0; i < lowerUnits.length; i++ ) {
                if (iteracion > -1) {
                    const temporal = Array.from(await this.getFriends(lowerUnits[i], iteracion - 1));
                    for ( let j = 0; j < temporal.length; j++)
                        set = set.add(temporal[j]);
                }
            }
            return set.add(unitCode);
        }
    }
    async getTopUnits(code: number): Promise<Unit[]> {
        let topUnits: Unit[] = undefined;
        const relations: Relation[] = await this.relationResource.findByLowerUnit(code);
        if (relations) {
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
    async getUnits(unitCodes: number[]): Promise<Unit[]> {
        const unitArray: Unit[] = [];
        for (let i = 0; i < unitCodes.length ; i++) {
            unitArray.push(await this.unitDao.findById(unitCodes[i]));
        }
        return unitArray;
    }
}
