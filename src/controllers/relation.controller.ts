import { Request, Response } from "express";
import { TypeRelation } from "../models/typeralation.enum";
import { RelationService } from "../services/relation.service";
import {RelationEntity} from "../entities/relation.entity";
import Relation from "../models/relation.model";

export class RelationController {

    relationService: RelationService = new RelationService();
    constructor() {
    }

    async findByLowerUnit(unit: Number) {
        return await this.relationService.findByLowerUnit(unit);
    }

    async create(req: Request, res: Response) {
        const relationDto: RelationEntity = req.body;
        console.log(relationDto);
        const relation: Relation = await this.relationService.create(relationDto);
        console.log(relation);
    }

}

