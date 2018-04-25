
import Relation from "../models/relation.model";
import { TypeRelation } from "../models/typeralation.enum";
import { ObjectId } from "bson";
import Unit from "../models/unit.model";
import { UnitEntity } from "../entity/unit";

export class UnitService {
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
        unit.save();
    }
}