export interface RelationInputDto {
     type: string;
     topUnitCode: number;
     lowerUnitCode: number;
     semantics?: string;
     cardinalTopUnit?: string;
     cardinalLowerUnit?: string;
}
