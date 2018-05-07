import { TypeRelation } from "../models/typeRelation.enum";

export interface RelationInputDto {
     type: TypeRelation;
     idTopUnit: number;
     idLowerUnit: number;
}