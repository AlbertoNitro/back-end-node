import { UnitOutputDto } from "./unitOutput.dto";
import { TypeRelation } from "../schemas/typeRelation.enum";

export interface RelationOutputDto {
    _id: number;
    type: TypeRelation;
    topUnit: UnitOutputDto;
    lowerUnit: UnitOutputDto;
}
