import { UnitDao } from "../services/dao/unit.dao";
import { Unit } from "../models/unit.model";
import {HttpStatusCode} from "../util/http-status-codes.enum";

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
    async findByName(name: string): Promise<Unit[]> {
        return await this.unitDao.findByName(name);
    }
    async findAll(): Promise<Unit[]> {
        return  await this.unitDao.findAll();
    }
    async delete(id: number): Promise<any> {
        const unit: Unit = await this.unitDao.findById(id);
        if (unit) {
            const statusDeleteUnit: boolean = await this.unitDao.delete(id);
            const statusDeleteRelations: boolean = await this..deleteByConexion(req.params.id);
            statusDeleteUnit && statusDeleteRelations ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }
}