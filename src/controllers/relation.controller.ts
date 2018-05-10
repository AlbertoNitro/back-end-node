import { Request, Response } from "express";
import { RelationService } from "../services/dao/relation.dao";
import { Relation } from "../models/relation.model";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { RelationInputDto } from "../dtos/relationInput.dto";

export class RelationController {
    private relationService: RelationService;

    constructor() {
        this.relationService = new RelationService();
    }

    async findByLowerUnit(unit: number) {
        return await this.relationService.findByLowerUnit(unit);
    }
    async create(req: Request, res: Response): Promise<any> {
        const relationDto: RelationInputDto = req.body;
        const relation: Relation = await this.relationService.create(relationDto);
        relation ? res.status(HttpStatusCode.CREATED).json(relation) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
    async deleteByConexion(id: number): Promise<boolean> {
        const deleteByTopStatus: boolean = await this.deleteByTop(id);
        const deleteByLowerStatus: boolean = await this.deleteByDown(id);
        if ( deleteByTopStatus === true && deleteByLowerStatus === true) {
            return deleteByTopStatus;
        }
        else {
            return undefined;
        }
    }
    async deleteByTop(id: number): Promise<boolean> {
        return await this.relationService.deleteByTop(id);
    }
    async deleteByDown(id: number): Promise<boolean> {
        return await this.relationService.deleteByDown(id);
    }
}

