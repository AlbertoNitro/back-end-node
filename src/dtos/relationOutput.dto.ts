import { TypeRelation } from "../models/typeRelation.enum";
import { UnitOutputDto } from "./unitOutput.dto";

export interface RelationOutputDto {
    _id: number;
    type: TypeRelation;
    topUnit: UnitOutputDto;
    lowerUnit: UnitOutputDto;
}
