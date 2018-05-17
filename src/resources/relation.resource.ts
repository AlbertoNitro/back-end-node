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
        return await this.relationDao.findAll();
    }
    async findByLowerUnit(codeUnit: number): Promise<Relation[]> {
        return await this.relationDao.findByLowerUnit(codeUnit);
    }
    async findByTopUnit(codeUnit: number): Promise<Relation[]> {
        return await this.relationDao.findByTopUnit(codeUnit);
    }
    async create(relationDto: RelationInputDto): Promise<Relation> {
        console.log("relationDto" + JSON.stringify(relationDto));
        return await this.relationDao.create(relationDto);
    }
    async deleteByConexion(codeUnit: number): Promise<boolean> {
        const relationsLower: Relation[] = await this.findByLowerUnit(codeUnit);
        const relationsTop: Relation[] = await this.findByTopUnit(codeUnit);
        let sucessDeleteLowers: boolean = true;
        let sucessDeleteTops: boolean = true;
        if (relationsLower) {
            for (let i = 0 ; i < relationsLower.length ; i++ ) {
                const success: boolean = await this.delete(relationsLower[i].getId());
                logger.info(success.toString());
                sucessDeleteLowers = sucessDeleteLowers && success;
            }
        }
        if (relationsTop) {
            for (let i = 0 ; i < relationsTop.length ; i++ ) {
                const success: boolean = await this.delete(relationsTop[i].getId());
                logger.info(success.toString());
                sucessDeleteTops = sucessDeleteTops && success;
            }
        }
        return sucessDeleteLowers && sucessDeleteTops;
    }
    async delete(id: number): Promise<boolean> {
        return await this.relationDao.delete(id);
    }
    async findUnitsByLowerUnit(unit: Unit) {
        const relations: Relation[] = await this.findByLowerUnit(unit.getId());
        const topUnits: Unit[] = [];
        for ( let i = 0; i < relations.length ; i++) {
            topUnits.push(relations[i].getTopUnit());
        }
        return topUnits;
    }
    async findUnitsByTopUnit(unit: Unit) {
        const relations: Relation[] = await this.findByTopUnit(unit.getId());
        console.log("relations " + relations);
        const topUnits: Unit[] = [];
        for ( let i = 0; i < relations.length ; i++) {
            topUnits.push(relations[i].getTopUnit());
        }
        console.log("topUnits " + topUnits);
        return topUnits;
    }
}