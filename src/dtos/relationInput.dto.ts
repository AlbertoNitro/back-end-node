import { TypeRelation } from "../schemas/typeRelation.enum";

export interface RelationInputDto {
     type: TypeRelation;
     idTopUnit: number;
     idLowerUnit: number;
}
