import { Request, Response } from "express";
import { RelationService } from "../services/dao/relation.dao";
import { Relation } from "../models/relation.model";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { RelationInputDto } from "../dtos/relationInput.dto";
import { RelationResource } from "../resources/relation.resource";

export class RelationController {
    private relationResource: RelationResource;

    constructor() {
        this.relationResource = new RelationResource();
    }
    async create(req: Request, res: Response): Promise<any> {
        const relationDto: RelationInputDto = req.body;
        const relation: Relation = await this.relationResource.create(relationDto);
        relation ? res.status(HttpStatusCode.CREATED).json(relation) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

