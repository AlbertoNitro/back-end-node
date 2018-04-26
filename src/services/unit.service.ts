import mongoose from "mongoose";
import Relation from "../models/relation.model";
import { TypeRelation } from "../models/typeralation.enum";
import { ObjectId } from "bson";
import { UnitEntity } from "../entities/unit";
import Unit from "../models/unit.model";
export class UnitService {
    response: any;
    constructor() {}
    async forceGenerate(unit: String) {
        const relation = new Unit(
            {
              name: "prueba",
            }
          );
          await relation.save();
    }
    async create(unitEntity: UnitEntity) {
        const unit = new Unit(unitEntity);
        await unit.save((err) => {
            if (err) {
                this.response = unit;
            }
            else {
                this.response =  unit;
            }
        });
        return this.response;
    }
    async findByName(name: RegExp) {
        console.log(name);
        await Unit.find({ name }, (err, units) => {
            this.response = units;
        });
        return this.response;
    }
}
