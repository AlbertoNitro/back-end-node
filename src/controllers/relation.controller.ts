import { Request, Response } from "express";
import { Relation } from "../models/relation.model";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { RelationInputDto } from "../dtos/relationInput.dto";
import { RelationResource } from "../resources/relation.resource";
import logger from "../util/logger";

export class RelationController {
    private relationResource: RelationResource;

    constructor() {
        this.relationResource = new RelationResource();
    }

    async findAll(req: Request, res: Response): Promise<any> {
        const relations: Relation[] = await this.relationResource.findAll();
        relations ? res.status(HttpStatusCode.OK).json(relations) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async create(req: Request, res: Response): Promise<any> {
        const relationDto: RelationInputDto = req.body;
        console.log(relationDto);
        logger.info(req.body);
        const relation: Relation = await this.relationResource.create(relationDto);
        relation ? res.status(HttpStatusCode.CREATED).json(relation) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

