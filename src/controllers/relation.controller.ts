import { Request, Response } from "express";
import { RelationService } from "../services/relation.service";
import { RelationEntity } from "../entities/relation.entity";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { RelationDto } from "../dtos/relation.dto";

export class RelationController {

    private relationService: RelationService;

    constructor() {
        this.relationService = new RelationService();
    }

    async findByLowerUnit(unit: Number) {
        return await this.relationService.findByLowerUnit(unit);
    }
    async create(req: Request, res: Response): Promise<any> {
        const relationDto: RelationDto = req.body;
        /*
        if (!isValid)
        res.status(HttpStatusCode.BAD_REQUEST)
         */
        const relation: RelationEntity = await this.relationService.create(relationDto);
        relation ? res.status(HttpStatusCode.CREATED).json(relation) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

