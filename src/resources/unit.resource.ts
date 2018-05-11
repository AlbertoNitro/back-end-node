import { UnitDao } from "../services/dao/unit.dao";
import { Unit } from "../models/unit.model";
import { RelationResource } from "./relation.resource";

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
    async delete(id: number): Promise<boolean> {
        let success = false;
        const unit: Unit = await this.unitDao.findById(id);
        if (unit) {
            const statusDeleteUnit: boolean = await this.unitDao.delete(id);
            const statusDeleteRelations: boolean = await this.relationResource.deleteByConexion(id);
            success = statusDeleteUnit && statusDeleteRelations;
        }
        return success;
    }
    async findById(id: number): Promise<Unit> {
        return await this.unitDao.findById(id);
    }

    async getFriends(unit: Unit, n: number): Promise<any> {
        const lowerUnits: Unit[] = await this.relationResource.findUnitsByTopUnit(unit);
        if ( lowerUnits.length == 0) {
            const set =  new Set();
            set.add(unit);
            return set;
        }
        else {
            const set =  new Set();
            for ( let i = 0; i < lowerUnits.length; i++ ) {

            }
        }
    }

}