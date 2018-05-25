import { UnitOutputDto } from "../dtos/unitOutput.dto";
import { Unit } from "../models/unit.model";
import { RelationOutputDto } from "../dtos/relationOutput.dto";
import { Relation } from "../models/relation.model";
import { CincoNivelesOutputDto } from "../dtos/cincoNivelesOutput.dto";

export class DtoService {
    constructor() {
    }

    public static toUnitOutputDto(unit: Unit): UnitOutputDto {
        let unitOutputDto: UnitOutputDto = undefined;
        if (unit) {
            unitOutputDto = {name: unit.getName(), code: unit.getCode()};
        }
        return unitOutputDto;
    }
    public static toArrayUnitOutputDto(units: Unit[]): UnitOutputDto[] {
        const unitOutputDtos: UnitOutputDto[] = [];
        if (units.length > 0) {
            for (let i = 0 ; i < units.length ; i++ ) {
                unitOutputDtos.push(DtoService.toUnitOutputDto(units[i]));
            }
        }
        return unitOutputDtos;
    }
    public static toRelationOutputDto(relation: Relation): RelationOutputDto {
        let relationOutputDto: RelationOutputDto = undefined;
        if (relation) {
            relationOutputDto = {
                type: relation.getType(),
                topUnit: {name: relation.getTopUnit().getName(), code: relation.getTopUnit().getCode()},
                lowerUnit: {name: relation.getLowerUnit().getName(), code: relation.getLowerUnit().getCode()},
                semantics: relation.getSemantics(),
                cardinalTopUnit: relation.getCardinalTopUnit(),
                cardinalLowerUnit: relation.getCardinalLowerUnit()
            };
        }
        return relationOutputDto;
    }
    public static toArrayRelationOutputDto(relations: Relation[]): RelationOutputDto[] {
        const relationOutputDtos: RelationOutputDto[] = [];
        if (relations.length > 0) {
            for (let i = 0; i < relations.length; i++) {
                relationOutputDtos.push(DtoService.toRelationOutputDto(relations[i]));
            }
        }
        return relationOutputDtos;
    }

    public static toFriendsOutputDto(unit: Unit, topUnits: Unit[], lowerUnits: Unit[], relations: Relation[]): CincoNivelesOutputDto {
        let cincoNivelesOutputDto: CincoNivelesOutputDto = undefined;
        if (unit) {
            cincoNivelesOutputDto = {unit: DtoService.toUnitOutputDto(unit), topUnits: DtoService.toArrayUnitOutputDto(topUnits), lowerUnits: DtoService.toArrayUnitOutputDto(lowerUnits), relations: DtoService.toArrayRelationOutputDto(relations)};
        }
        return cincoNivelesOutputDto;
    }
}
