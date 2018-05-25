import { UnitOutputDto } from "./unitOutput.dto";

export interface RelationOutputDto {
    type: string;
    topUnit: UnitOutputDto;
    lowerUnit: UnitOutputDto;
    semantics: string;
    cardinalTopUnit: string;
    cardinalLowerUnit: string;
}
