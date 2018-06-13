import { Request, Response } from "express";
import { Relation } from "../models/relation.model";
import { HttpStatusCode } from "../utils/http-status-codes.enum";
import { RelationInputDto } from "../dtos/input/relationInput.dto";
import { RelationResource } from "../resources/relation.resource";
import logger from "../utils/logger";
import { RelationOutputDto } from "../dtos/output/relationOutput.dto";
import { DtoService } from "../services/dto.service";
import { DeleteRelationInputDto } from "../dtos/input/deleteRelationInput.dto";
import { UnitResource } from "../resources/unit.resource";
import { Unit } from "../models/unit.model";

export class RelationController {
    private relationResource: RelationResource;
    private unitResource: UnitResource;
    private dtoService: DtoService;

    constructor() {
        this.relationResource = new RelationResource();
        this.unitResource = new UnitResource();
        this.dtoService = new DtoService();
    }
    async findAll(req: Request, res: Response): Promise<any> {
        const relations: Relation[] = await this.relationResource.findAll();
        const relationsOutputDtos: RelationOutputDto[] = this.dtoService.toArrayRelationOutputDto(relations);
        relations ? res.status(HttpStatusCode.OK).json(relationsOutputDtos) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async create(req: Request, res: Response): Promise<any> {
        const relationInputDto: RelationInputDto = req.body;
        const relation: Relation = await this.relationResource.create(relationInputDto);
        const relationOutputDto: RelationOutputDto = this.dtoService.toRelationOutputDto(relation);
        relation ? res.status(HttpStatusCode.CREATED).json(relationOutputDto) : res.status(HttpStatusCode.BAD_REQUEST).end();
    }
    async delete(req: Request, res: Response): Promise<any> {
        const deleteRelationInputDto: DeleteRelationInputDto = req.body;
        const topUnit: Unit = await this.unitResource.findByCode(deleteRelationInputDto.topUnitCode);
        const lowerUnit: Unit = await this.unitResource.findByCode(deleteRelationInputDto.lowerUnitCode);
        if (topUnit && lowerUnit) {
            const relations: Relation[] =  await this.relationResource.findByTopAndLowerUnit(topUnit, lowerUnit);
            const success: boolean = await this.relationResource.delete(relations[0].getId());
            success ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.BAD_REQUEST).end();
        }
    }
}

