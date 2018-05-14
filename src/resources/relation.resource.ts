import { RelationDao } from "../services/dao/relation.dao";
import { Relation } from "../models/relation.model";
import { RelationInputDto } from "../dtos/relationInput.dto";
import { Unit } from "../models/unit.model";

export class RelationResource {
    private relationDao: RelationDao;

    constructor() {
        this.relationDao = new RelationDao();
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
        return await this.relationDao.create(relationDto);
    }
    async deleteByConexion(id: number): Promise<boolean> {
        const deleteByTopStatus: boolean = await this.deleteByTop(id);
        const deleteByLowerStatus: boolean = await this.deleteByDown(id);
        if ( deleteByTopStatus === true && deleteByLowerStatus === true) {
            return deleteByTopStatus;
        }
        else {
            return undefined;
        }
    }
    async deleteByTop(id: number): Promise<boolean> {
        return await this.relationDao.deleteByTop(id);
    }
    async deleteByDown(id: number): Promise<boolean> {
        return await this.relationDao.deleteByDown(id);
    }
    async findUnitsByLowerUnit(unit: Unit) {
        const relations: Relation[] = await this.findByLowerUnit(unit);
        const topUnits: Unit[] = [];
        for ( let i = 0; i < relations.length ; i++) {
            topUnits.push(relations[i].getTopUnit());
        }
        return topUnits;
    }
    async findUnitsByTopUnit(unit: Unit) {
        const relations: Relation[] = await this.findByTopUnit(unit);
        console.log("relations " + relations);
        const topUnits: Unit[] = [];
        for ( let i = 0; i < relations.length ; i++) {
            topUnits.push(relations[i].getTopUnit());
        }
        console.log("topUnits " + topUnits);
        return topUnits;
    }
}