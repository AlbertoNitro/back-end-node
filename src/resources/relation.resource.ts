import { RelationDao } from "../services/dao/relation.dao";
import { Relation } from "../models/relation.model";
import { RelationInputDto } from "../dtos/relationInput.dto";
import { Unit } from "../models/unit.model";
import { UnitDao } from "../services/dao/unit.dao";
import logger from "../util/logger";

export class RelationResource {
    private relationDao: RelationDao;

    private unitDao: UnitDao;

    constructor() {
        this.relationDao = new RelationDao();
        this.unitDao = new UnitDao();
    }

    async findAll() {
        const relations: Relation[] = await this.relationDao.findAll();
        return relations;
    }
    async findByLowerUnit(unit: number): Promise<Relation[]> {
        const relations: Relation[] = await this.relationDao.findByLowerUnit(unit);
        logger.info(JSON.stringify(relations));
        logger.info(relations.length.toString());
        return relations;
    }
    async findByTopUnit(unit: number): Promise<Relation[]> {
        return await this.relationDao.findByTopUnit(unit);
    }
    async create(relationDto: RelationInputDto): Promise<Relation> {
        return await this.relationDao.create(relationDto);
    }
    async deleteByConexion(unit: Unit): Promise<boolean> {
        const relationsLower: Relation[] = await this.findByLowerUnit(unit.getCode());
        const relationsTop: Relation[] = await this.findByTopUnit(unit.getCode());
        let sucessDeleteLowers: boolean = true;
        let sucessDeleteTops: boolean = true;
        if (relationsLower) {
            for (let i = 0 ; i < relationsLower.length ; i++ ) {
                const success: boolean = await this.delete(relationsLower[i].getId());
                sucessDeleteLowers = sucessDeleteLowers && success;
            }
        }
        if (relationsTop) {
            for (let i = 0 ; i < relationsTop.length ; i++ ) {
                const success: boolean = await this.delete(relationsTop[i].getId());
                sucessDeleteTops = sucessDeleteTops && success;
            }
        }
        return sucessDeleteLowers && sucessDeleteTops;
    }
    async delete(id: string): Promise<boolean> {
        return await this.relationDao.delete(id);
    }
    async findUnitsByLowerUnit(unit: Unit) {
        const relations: Relation[] = await this.findByLowerUnit(unit.getCode());
        const topUnits: Unit[] = [];
        for ( let i = 0; i < relations.length ; i++) {
            topUnits.push(relations[i].getTopUnit());
        }
        return topUnits;
    }
    async findUnitsByTopUnit(unit: Unit) {
        const relations: Relation[] = await this.findByTopUnit(unit.getCode());
        console.log("relations " + relations);
        const topUnits: Unit[] = [];
        for ( let i = 0; i < relations.length ; i++) {
            topUnits.push(relations[i].getTopUnit());
        }
        console.log("topUnits " + topUnits);
        return topUnits;
    }

    async findIdByTopUnit(unit: number): Promise<number[]> {
        const relations: Relation[] = await this.findByTopUnit(unit);
        const topUnits: number[] = [];
        for ( let i = 0; i < relations.length ; i++) {
            topUnits.push(relations[i].getLowerUnit().getId());
        }
        return topUnits;
    }

    async findIdByLowerUnit(unit: number): Promise<number[]> {
        const relations: Relation[] = await this.findByLowerUnit(unit);
        const topUnits: number[] = [];
        if (relations.length) {
            for ( let i = 0; i < relations.length ; i++) {
                topUnits.push(relations[i].getTopUnit().getId());
            }
        }
        return topUnits;
    }
}