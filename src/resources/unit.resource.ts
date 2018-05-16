import { UnitDao } from "../services/dao/unit.dao";
import { Unit } from "../models/unit.model";
import { RelationResource } from "./relation.resource";
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
    async findByName(name: string): Promise<Unit[]> {
        return await this.unitDao.findByName(name);
    }
    async findAll(): Promise<Unit[]> {
        return  await this.unitDao.findAll();
    }
    async findByCode(code: number): Promise<Unit> {
        logger.info(code.toString());
        return await this.unitDao.findByCode(code);
    }
    async delete(id: number): Promise<boolean> {
        let success = false;
        const unit: Unit = await this.unitDao.findByCode(id);
        if (unit) {
            const statusDeleteUnit: boolean = await this.unitDao.delete(id);
            const statusDeleteRelations: boolean = await this.relationResource.deleteByConexion(id);
            success = statusDeleteUnit && statusDeleteRelations;
        }
        return success;
    }
    async findById(id: number): Promise<Unit> {
        return await this.unitDao.findByCode(id);
    }

    async getFriends(unit: Unit, n: number): Promise<any> {
        const lowerUnits: Unit[] = await this.relationResource.findUnitsByTopUnit(unit);
        console.log(lowerUnits);
        console.log("lowerUnits.length " + lowerUnits.length);

        if ( lowerUnits.length == 0) {
            const set =  new Set();
            set.add(unit);
            return set;
        }
        else {
            let set =  new Set();
            for ( let i = 0; i < lowerUnits.length; i++ ) {
                set = set.add(await this.getFriends(lowerUnits[i], n - 1));
            }
            set.add(unit);
            return set;
        }
    }

}