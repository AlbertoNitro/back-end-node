import { TypeRelation } from "../schemas/typeRelation.enum";

export interface RelationInputDto {
     type: TypeRelation;
     topUnitCode: number;
     lowerUnitCode: number;
}
