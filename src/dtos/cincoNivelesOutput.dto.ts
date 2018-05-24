import { Relation } from "../models/relation.model";
import { UnitOutputDto } from "./unitOutput.dto";
import { RelationOutputDto } from "./relationOutput.dto";

export interface CincoNivelesOutputDto {
    unit: UnitOutputDto;
    topUnits: UnitOutputDto[];
    lowerUnits: UnitOutputDto[];
    relations: RelationOutputDto[];
}
