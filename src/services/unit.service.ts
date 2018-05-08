import { UnitEntity } from "../entities/unit.entity";
import Unit from "../models/unit.model";
import logger from "../util/logger";

export class UnitService {
    response: any;

    constructor() {
    }

    async create(name: string): Promise<UnitEntity> {
        const unitEntity = new UnitEntity(name);
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
    async findByName(name: RegExp) {
        console.log(name);
        await Unit.find({ name }, (err, units) => {
            this.response = units;
        });
        return this.response;
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
    async findById(id: number): Promise<UnitEntity> {
        return await Unit.findById(id)
            .then( unit => {
                return unit;
            })
            .catch ( err => {
                return undefined;
            });
    }

    async delete(_id: number): Promise<boolean> {
        return await Unit.deleteOne({_id})
            .then( unit => {
                return true;
            })
            .catch ( err => {
                return false;
            });
    }
}
