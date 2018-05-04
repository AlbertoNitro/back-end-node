import { Request, Response } from "express";
import { RelationService } from "../services/relation.service";
import { RelationEntity } from "../entities/relation.entity";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { RelationDto } from "../dtos/relation.dto";

export class RelationController {

    relationService: RelationService = new RelationService();
    constructor() {
    }

    async findByLowerUnit(unit: Number) {
        return await this.relationService.findByLowerUnit(unit);
    }

    async create(req: Request, res: Response) {
        const relationDto: RelationDto = req.body;
        const relation = await this.relationService.create(relationDto);
        relation ? res.status(HttpStatusCode.CREATED).json(relation) : res.status(HttpStatusCode.BAD_REQUEST);
    }

}

