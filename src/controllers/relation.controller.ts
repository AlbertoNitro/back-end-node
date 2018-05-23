import { Request, Response } from "express";
import { Relation } from "../models/relation.model";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { RelationInputDto } from "../dtos/relationInput.dto";
import { RelationResource } from "../resources/relation.resource";
import logger from "../util/logger";
import { RelationOutputDto } from "../dtos/relationOutput.dto";

export class RelationController {
    private relationResource: RelationResource;

    constructor() {
        this.relationResource = new RelationResource();
    }

    async findAll(req: Request, res: Response): Promise<any> {
        const relations: Relation[] = await this.relationResource.findAll();
        const relationOutputDtos: RelationOutputDto[] = this.toArrayRelationOutputDto(relations);
        relations ? res.status(HttpStatusCode.OK).json(relationOutputDtos) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async create(req: Request, res: Response): Promise<any> {
        const relationDto: RelationInputDto = req.body;
        const relation: Relation = await this.relationResource.create(relationDto);
        const relationOutputDto: RelationOutputDto = this.toRelationOutputDto(relation);
        relation ? res.status(HttpStatusCode.CREATED).json(relationOutputDto) : res.status(HttpStatusCode.BAD_REQUEST).end();
    }
    private toRelationOutputDto(relation: Relation): RelationOutputDto {
        const relationOutputDto: RelationOutputDto = {
            type: relation.getType(),
            topUnit: {name: relation.getTopUnit().getName(), code: relation.getTopUnit().getCode()},
            lowerUnit: {name: relation.getLowerUnit().getName(), code: relation.getLowerUnit().getCode()},
            semantics: relation.getSemantics(),
            cardinalTopUnit: relation.getCardinalTopUnit(),
            cardinalLowerUnit: relation.getCardinalLowerUnit()
        };
        return relationOutputDto;
    }
    private toArrayRelationOutputDto(relations: Relation[]): RelationOutputDto[] {
        const relationOutputDtos: RelationOutputDto[] = [];
        for (let i = 0 ; i < relations.length ; i++ ) {
            relationOutputDtos.push(this.toRelationOutputDto(relations[i]));
        }
        return relationOutputDtos;
    }
}

