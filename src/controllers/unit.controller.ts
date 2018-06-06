import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { Unit } from "../models/unit.model";
import { UnitResource } from "../resources/unit.resource";
import { RelationResource } from "../resources/relation.resource";
import logger from "../util/logger";
import { Relation } from "../models/relation.model";
import { UnitOutputDto } from "../dtos/output/unitOutput.dto";
import { DtoService } from "../services/dto.service";
import { NeighborsOutputDto } from "../dtos/output/neighborsOutput.dto";
import { RelatedUnitsOutputDto } from "../dtos/output/relatedUnitsOutput.dto";

export class UnitController {
    private unitResource: UnitResource;
    private relationResource: RelationResource;

    constructor() {
        this.unitResource = new UnitResource();
        this.relationResource = new RelationResource();
    }

    async getNeighbors(req: Request, res: Response): Promise<any> {
        const LEVELS_TO_EXPLORER: number = 5;
        const unit: Unit = await this.unitResource.findByCode(req.params.code);
        if (unit) {
            const topUnitsIds: number[] = await this.relationResource.findIdByLowerUnit(unit.getId());
            const topUnits: Unit[] = await this.unitResource.getUnits(topUnitsIds);
            const lowerUnitsIds: number[] = Array.from(await this.unitResource.getFriends(unit.getId(), LEVELS_TO_EXPLORER));
            const lowerUnits: Unit[] = await this.unitResource.getUnits(lowerUnitsIds);
            const relations: Relation[] = await this.relationResource.getRelations(topUnits.concat(unit).concat(lowerUnits));
            const neighborsOutputDto: NeighborsOutputDto = DtoService.toNeighborsOutputDto(unit, topUnits, lowerUnits, relations);
            neighborsOutputDto ? res.status(HttpStatusCode.OK).json(neighborsOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }
    async create(req: Request, res: Response): Promise<any> {
        const unit: Unit = await this.unitResource.create(req.body.name);
        const unitOutputDto: UnitOutputDto = DtoService.toUnitOutputDto(unit);
        unit ? res.status(HttpStatusCode.CREATED).json(unitOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async findByName(req: Request, res: Response) {
        const name: string = req.query.name;
        const units: Unit[] = await this.unitResource.findByName(name);
        const relatedUnitsOutputDtos: RelatedUnitsOutputDto[] = [];
        if (units) {
            for (let i = 0 ; i < units.length ; i++) {
                const topUnits: Unit[] = await this.unitResource.getTopUnits(units[i].getId());
                if (topUnits) {
                    for (let j = 0 ; j < topUnits.length ; j++) {
                        const relationsUnitsOutputDto: RelatedUnitsOutputDto = { unit: {name: units[i].getName(), code: units[i].getCode()}, topUnit: {name: topUnits[j].getName(), code: topUnits[j].getCode()}};
                        relatedUnitsOutputDtos.push(relationsUnitsOutputDto);
                    }
                } else {
                    const relationsUnitsOutputDto: RelatedUnitsOutputDto = { unit: {name: units[i].getName(), code: units[i].getCode()}, topUnit: undefined};
                    relatedUnitsOutputDtos.push(relationsUnitsOutputDto);
                }
            }
        }
        relatedUnitsOutputDtos ? res.status(HttpStatusCode.OK).json(relatedUnitsOutputDtos) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async findAll(req: Request, res: Response): Promise<any> {
        const units: Unit[] = await this.unitResource.findAll();
        const unitOutputDtos: UnitOutputDto[] = DtoService.toArrayUnitOutputDto(units);
        units ? res.status(HttpStatusCode.OK).json(unitOutputDtos) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async delete(req: Request, res: Response): Promise<any> {
        const code: number = req.params.code;
        const unit: Unit = await this.unitResource.findByCode(code);
        if (unit) {
            const success: boolean = await this.unitResource.delete(unit);
            success ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }
    async findByCode(req: Request, res: Response): Promise<any> {
        const code: number = req.params.code;
        const unit: Unit = await this.unitResource.findByCode(code);
        const unitOutputDto: UnitOutputDto = DtoService.toUnitOutputDto(unit);
        unit ? res.status(HttpStatusCode.OK).json(unitOutputDto) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
}
