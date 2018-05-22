import { Unit } from "../models/unit.model";
import { Relation } from "../models/relation.model";

export interface CincoNivelesOutputDto {
    unit: Unit;
    topUnits: Unit[];
    lowerUnits: Unit[];
    relations: Relation[];
}
