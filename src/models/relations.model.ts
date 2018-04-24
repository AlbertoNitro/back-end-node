import * as mongoose from "mongoose";
import { TypeRelation } from "./typeralation.enum";

export const UnitSchema = new mongoose.Schema({
    type: TypeRelation,
    topUnit: { type: mongoose.SchemaTypes.ObjectId, ref: "Unit" } ,
    lowerUnit: { type: mongoose.SchemaTypes.ObjectId, ref: "Unit" }
});