
import Relation from "../models/relation.model";
import { TypeRelation } from "../models/typeralation.enum";
import { ObjectId } from "bson";

export class UnitService {
    constructor() {}
    async forceGenerate(unit: String) {
        const relation = new Relation(
            {
              type: TypeRelation.USE,
              topUnit: new ObjectId("5adf231d85dded040f3f6d03"),
              lowerUnit: new ObjectId("5adf231d85dded040f3f6d03")
            }
          );
          await relation.save();
    }
    prueba() {
        console.log("ENTRANDO EN METODO DE PRUEBA");
    }
}