import { Document } from "mongoose";
import { UnitEntity } from "./unit.entity";

export interface UnitI extends Document {
     _id: Number;
     name: String;
     topUnit: UnitEntity;
}