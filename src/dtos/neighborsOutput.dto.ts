import { UnitOutputDto } from "./unitOutput.dto";
import { RelationOutputDto } from "./relationOutput.dto";

export interface NeighborsOutputDto {
    unit: UnitOutputDto;
    topUnits: UnitOutputDto[];
    lowerUnits: UnitOutputDto[];
    relations: RelationOutputDto[];
}
