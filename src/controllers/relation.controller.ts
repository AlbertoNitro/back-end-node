import { Request, Response } from "express";
import { TypeRelation } from "../models/typeralation.enum";
import { RelationService } from "../services/relation.service";
import { UnitEntity } from "../entities/unit";

export class RelationController {

    relationService: RelationService = new RelationService();
    constructor() {
    }

    async findByLowerUnit(unit: Number) {
        return await this.relationService.findByLowerUnit(unit);
    }

    async deleteByConexion(id: Number) {
        await this.deleteByTop(id);
        await this.deleteByDown(id);
    }
    async deleteByTop(id: Number) {
        await this.relationService.deleteByTop(id);
    }

    async deleteByDown(id: Number) {
        await this.relationService.deleteByDown(id);
    }

}

