import { Request, Response } from "express";
import { TypeRelation } from "../models/typeralation.enum";
import { RelationService } from "../services/relation.service";
import { UnitEntity } from "../entities/unit";

export class RelationController {

    relationService: RelationService = new RelationService();
    constructor() {
    }

    findByLowerUnit(unit: Number) {
        return this.relationService.findByLowerUnit(unit);
    }

}

