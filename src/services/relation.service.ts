import mongoose from "mongoose";
import Relation from "../models/relation.model";
import { TypeRelation } from "../models/typeralation.enum";
import { ObjectId } from "bson";
import { UnitEntity } from "../entities/unit";
import Unit from "../models/unit.model";


export class RelationService {
    async findByLowerUnit(id: Number) {
        return await Relation.find({ lowerUnit: id.toString() });
    }

    async deleteByTop(_id: Number) {
        await Relation.deleteOne({ topUnit: _id });
    }

    async deleteByDown(_id: Number) {
        await Relation.deleteOne({ lowerUnit: _id });
    }
}
