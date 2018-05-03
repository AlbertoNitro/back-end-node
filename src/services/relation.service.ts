import mongoose from "mongoose";
import Relation from "../models/relation.model";
import { TypeRelation } from "../models/typeralation.enum";
import { ObjectId } from "bson";
import { UnitEntity } from "../entities/unit";
import Unit from "../models/unit.model";


export class RelationService {
    async findByLowerUnit(unit: Number) {
        return await Relation.find({ lowerUnit: unit.toString() });
    }
}
