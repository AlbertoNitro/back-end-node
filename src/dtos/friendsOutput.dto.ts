import { UnitOutputDto } from "./unitOutput.dto";
import { RelationOutputDto } from "./relationOutput.dto";

export interface FriendsOutputDto {
    unit: UnitOutputDto;
    topUnits: UnitOutputDto[];
    lowerUnits: UnitOutputDto[];
    relations: RelationOutputDto[];
}
