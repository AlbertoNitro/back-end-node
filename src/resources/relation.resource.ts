import { RelationDao } from "../services/dao/relation.dao";
import { Relation } from "../models/relation.model";
import { RelationInputDto } from "../dtos/relationInput.dto";

export class RelationResource {

    private relationDao: RelationDao;

    constructor() {
        this.relationDao = new RelationDao();
    }
    async findByLowerUnit(unit: number) {
        return await this.relationDao.findByLowerUnit(unit);
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
}