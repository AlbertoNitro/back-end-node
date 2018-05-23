import { RelationDao } from "../services/dao/relation.dao";
import { Relation } from "../models/relation.model";
import { RelationInputDto } from "../dtos/relationInput.dto";
import { Unit } from "../models/unit.model";
import logger from "../util/logger";

export class RelationResource {
    private relationDao: RelationDao;

    constructor() {
        this.relationDao = new RelationDao();
    }

    async findAll() {
        const relations: Relation[] = await this.relationDao.findAll();
        return relations;
    }
    async findByLowerUnit(unit: number): Promise<Relation[]> {
        logger.info(unit.toString());
        const relations: Relation[] = await this.relationDao.findByLowerUnit(unit);
        logger.info(JSON.stringify(relations));
        return relations;
    }
    async findByTopUnit(unit: number): Promise<Relation[]> {
        return await this.relationDao.findByTopUnit(unit);
    }
    async create(relationDto: RelationInputDto): Promise<Relation> {
        return await this.relationDao.create(relationDto);
    }
    async deleteByConexion(unit: Unit): Promise<boolean> {
        const relationsLower: Relation[] = await this.findByLowerUnit(unit.getId());
        const relationsTop: Relation[] = await this.findByTopUnit(unit.getId());
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
    async delete(id: number): Promise<boolean> {
        return await this.relationDao.delete(id);
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
    async findByTopAndLowerUnit(top: Unit, lower: Unit): Promise<Relation[]> {
        return this.relationDao.findByTopAndLowerUnit(top, lower);
    }
    existValue(relationArray: Relation[], relation: Relation): boolean {
        for ( let i = 0; i < relationArray.length; i++) {
            if (relationArray[i].getId().toString() == relation.getId().toString()) {
                return true;
            }
        }
        return false;
    }
    async getRelations(units: Unit[]): Promise<Relation[]> {
        const relationArray: Relation[] = [];
        for (let i = 0; i < units.length; i++) {
            for (let j = 0; j < units.length; j++) {
                const relation: any = await this.findByTopAndLowerUnit(units[i], units[j]);
                if (relation.length > 0) {
                    if (this.existValue(relationArray, relation[0]) == false)
                        relationArray.push(relation[0]);
                }
            }
        }
        return relationArray;
    }
}
