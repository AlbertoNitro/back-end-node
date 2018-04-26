
import Relation from "../models/relation.model";
import { TypeRelation } from "../models/typeralation.enum";
import { ObjectId } from "bson";
import Unit from "../models/unit.model";
import { UnitEntity } from "../entities/unit";
export class UnitService {
    response: String;
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
                this.response = "{ success: \"false\", \"message\": \"ERROR: No se ha podido crear la unidad\"}";
            }
            else {
                this.response =  "{ success: \"true\", \"unit\":" + unit + "}";
            }
        });
        return this.response;
    }
}