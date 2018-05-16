import { RelationDao } from "../services/dao/relation.dao";
import { Relation } from "../models/relation.model";
import { RelationInputDto } from "../dtos/relationInput.dto";
import { Unit } from "../models/unit.model";
import { UnitDao } from "../services/dao/unit.dao";

export class RelationResource {
    private relationDao: RelationDao;

    private unitDao: UnitDao;

    constructor() {
        this.relationDao = new RelationDao();
        this.unitDao = new UnitDao();
    }

    async findAll(): Promise<Relation[]> {
        return await this.relationDao.findAll();
    }
    async findByLowerUnit(unit: Unit): Promise<Relation[]> {
        return await this.relationDao.findByLowerUnit(unit.getId());
    }
    async findByTopUnit(unit: Unit): Promise<Relation[]> {
        return await this.relationDao.findByTopUnit(unit.getId());
    }
    async create(relationDto: RelationInputDto): Promise<Relation> {
        console.log("relationDto" + JSON.stringify(relationDto));
        return await this.relationDao.create(relationDto);
    }
    async deleteByConexion(code: number): Promise<boolean> {
        const statusDeleteByTop: boolean = await this.deleteByTop(code);
        const statusDeleteByLower: boolean = await this.deleteByDown(code);
        return statusDeleteByTop && statusDeleteByLower;
    }
    async deleteByTop(code: number): Promise<boolean> {
        return await this.relationDao.deleteByTop(code);
    }
    async deleteByDown(code: number): Promise<boolean> {
        return await this.relationDao.deleteByDown(code);
    }
    async findUnitsByLowerUnit(unit: Unit) {
        const relations: Relation[] = await this.findByLowerUnit(unit);
        const topUnits: Unit[] = [];
        for ( let i = 0; i < relations.length ; i++) {
            topUnits.push(await this.unitDao.findById(relations[i].getTopUnit()));
        }
        return topUnits;
    }
    async findUnitsByTopUnit(unit: Unit) {
        const relations: Relation[] = await this.findByTopUnit(unit);
        console.log("relations " + relations);
        const topUnits: Unit[] = [];
        for ( let i = 0; i < relations.length ; i++) {
            topUnits.push(await this.unitDao.findById(relations[i].getTopUnit()));
        }
        console.log("topUnits " + topUnits);
        return topUnits;
    }
}