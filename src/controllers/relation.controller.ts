import { Request, Response } from "express";
import { Relation } from "../models/relation.model";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { RelationInputDto } from "../dtos/relationInput.dto";
import { RelationResource } from "../resources/relation.resource";
import logger from "../util/logger";
import { RelationOutputDto } from "../dtos/relationOutput.dto";
import { DtoService } from "../services/dto.service";

export class RelationController {
    private relationResource: RelationResource;

    constructor() {
        this.relationResource = new RelationResource();
    }

    async findAll(req: Request, res: Response): Promise<any> {
        const relations: Relation[] = await this.relationResource.findAll();
        const relationOutputDtos: RelationOutputDto[] = DtoService.toArrayRelationOutputDto(relations);
        relations ? res.status(HttpStatusCode.OK).json(relationOutputDtos) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async create(req: Request, res: Response): Promise<any> {
        const relationInputDto: RelationInputDto = req.body;
        logger.info(JSON.stringify(relationInputDto));
        const relation: Relation = await this.relationResource.create(relationInputDto);
        const relationOutputDto: RelationOutputDto = DtoService.toRelationOutputDto(relation);
        relation ? res.status(HttpStatusCode.CREATED).json(relationOutputDto) : res.status(HttpStatusCode.BAD_REQUEST).end();
    }
}

