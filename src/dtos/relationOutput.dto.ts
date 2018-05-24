import { UnitOutputDto } from "./unitOutput.dto";
import { TypeRelation } from "../schemas/typeRelation.enum";

export interface RelationOutputDto {
    type: TypeRelation;
    topUnit: UnitOutputDto;
    lowerUnit: UnitOutputDto;
    semantics: string;
    cardinalTopUnit: string;
    cardinalLowerUnit: string;
}
