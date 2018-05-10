import { Unit } from "../models/unit.model";
import { Relation } from "../models/relation.model";

export interface UnitFriendsOutputDto {
    unit: Unit;
    topUnits: Unit[];
    lowerUnits: Unit[];
    relations: Relation;

}