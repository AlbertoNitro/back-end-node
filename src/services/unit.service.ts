import { UnitEntity, UnitBuilder } from "../entities/unit.entity";
import Unit from "../models/unit.model";
import logger from "../util/logger";

export class UnitService {
    constructor() {
    }

    async create(name: string): Promise<UnitEntity> {
        const unitEntity = new UnitBuilder(name).build();
        const unit = new Unit(unitEntity);
        return unit.save()
            .then( unit => {
                return unit;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async findById(id: number): Promise<UnitEntity> {
        return await Unit.findById(id)
            .then( unit => {
                return unit;
            })
            .catch ( err => {
                return undefined;
            });
    }
    async findByName(name: string): Promise<UnitEntity[]> {
        return await Unit.find({name: new RegExp("^" + name + "[a-zA-Z]*?")})
            .then( units => {
                return units;
            })
            .catch ( err => {
                return undefined;
            });
    }
    async findAll(): Promise<UnitEntity[]> {
        return await Unit.find({})
            .then( units => {
                return units;
            })
            .catch ( err => {
                return undefined;
            });
    }
    async delete(id: number): Promise<boolean> {
        return await Unit.deleteOne({id})
            .then( unit => {
                return true;
            })
            .catch ( err => {
                return false;
            });
    }
}
