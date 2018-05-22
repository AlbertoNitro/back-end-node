import { TypeRelation } from "../schemas/typeRelation.enum";

export interface RelationInputDto {
     type: TypeRelation;
     codeTopUnit: number;
     codeLowerUnit: number;
}
