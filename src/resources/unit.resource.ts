import { UnitDao } from "../daos/unit.dao";
import { Unit } from "../models/unit.model";
import { RelationResource } from "./relation.resource";
import { Relation } from "../models/relation.model";
import logger from "../utils/logger";

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
        return await this.unitDao.findAll();
    }
    async findByCode(code: number): Promise<Unit> {
        return await this.unitDao.findByCode(code);
    }
    async delete(unit: Unit): Promise<boolean> {
        const statusDeleteRelations: boolean = await this.relationResource.deleteByConexion(unit);
        const statusDeleteUnit: boolean = await this.unitDao.delete(unit.getId());
        return statusDeleteRelations && statusDeleteUnit;
    }
    async findById(id: string): Promise<Unit> {
        return await this.unitDao.findById(id);
    }
    async getFriends(id: string, iteration: number): Promise<Set<string>> {
        return this.getFriendsAux(id, iteration, id);
    }
    async getTopUnits(id: string): Promise<Unit[]> {
        let topUnits: Unit[] = undefined;
        const relations: Relation[] = await this.relationResource.findByLowerUnit(id);
        if (relations && relations.length > 0 ) {
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
    async getUnits(ids: string[]): Promise<Unit[]> {
        const units: Unit[] = [];
        for (let i = 0; i < ids.length ; i++) {
            units.push(await this.unitDao.findById(ids[i]));
        }
        return units;
    }
    private async getFriendsAux(id: string, iteration: number, shaftUnitId: string): Promise<Set<string>> {
        const lowerUnitsIds: string[] = await this.relationResource.findIdByTopUnit(id);
        const set =  new Set<string>();
        if ( lowerUnitsIds && lowerUnitsIds.length === 0) {
            if (id !== shaftUnitId) {
                set.add(id);
            }
        } else {
            for ( let i = 0; i < lowerUnitsIds.length; i++ ) {
                if (iteration > -1) {
                    const temporal = Array.from(await this.getFriendsAux(lowerUnitsIds[i], iteration - 1, shaftUnitId));
                    for ( let j = 0; j < temporal.length; j++)
                        set.add(temporal[j]);
                }
            }
            if (id != shaftUnitId) {
                set.add(id);
            }
        }
        return set;
    }
    async findNotRelated(): Promise<Unit[]> {
        const unit: Unit[] = await this.unitDao.findAll();
        const notRelatedUnits: Unit[] = [];
        for (let i = 0; i < unit.length ; i++ ) {
            if ((await this.relationResource.findByLowerUnit(unit[i].getId())).length == 0 && (await this.relationResource.findByTopUnit(unit[i].getId())).length == 0) {
                notRelatedUnits.push(unit[i]);
            }
        }
        return notRelatedUnits;
    }
    async update(code: string, content: string): Promise<Unit> {
        return await this.unitDao.update(code, content);
    }
}
