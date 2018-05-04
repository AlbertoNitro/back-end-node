import { TypeRelation } from "../models/typeralation.enum";

export interface RelationDto {
     type: TypeRelation;
     idTopUnit: number;
     idLowerUnit: number;
}