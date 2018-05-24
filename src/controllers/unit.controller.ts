import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { Unit } from "../models/unit.model";
import { UnitResource } from "../resources/unit.resource";
import { RelationResource } from "../resources/relation.resource";
import logger from "../util/logger";
import { Relation } from "../models/relation.model";
import { CincoNivelesOutputDto } from "../dtos/cincoNivelesOutput.dto";
import { UnitOutputDto } from "../dtos/unitOutput.dto";
import { RelationOutputDto } from "../dtos/relationOutput.dto";

export class UnitController {
    private unitResource: UnitResource;
    private relationResource: RelationResource;

    constructor() {
        this.unitResource = new UnitResource();
        this.relationResource = new RelationResource();
    }

    async getFriendsByUnit(req: Request, res: Response) {
        const unit: Unit = await this.unitResource.findByCode(req.params.id);
        const topUnitsId: number[] = await this.relationResource.findIdByLowerUnit(unit.getId());
        const topUnits: Unit[] = await this.unitResource.getUnits(topUnitsId);
        const lowerUnitsId: number[] = Array.from(await this.unitResource.getFriends(unit.getId(), 5, unit.getId()));
        const lowerUnits: Unit[] = await this.unitResource.getUnits(lowerUnitsId);
        const relations: Relation[] = await this.relationResource.getRelations(topUnits.concat(unit).concat(lowerUnits));
        const cincoNivelesOutput: CincoNivelesOutputDto = { unit: UnitController.toUnitOutputDto(unit), topUnits: UnitController.toArrayUnitOutputDto(topUnits), lowerUnits: UnitController.toArrayUnitOutputDto(lowerUnits), relations: relations };
        cincoNivelesOutput ? res.status(HttpStatusCode.OK).json(cincoNivelesOutput) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async create(req: Request, res: Response): Promise<any> {
        const unit: Unit = await this.unitResource.create(req.body.name);
        unit ? res.status(HttpStatusCode.CREATED).json(unit) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async findByName(req: Request, res: Response) {
        const name: string = req.query.name;
        const units: Unit[] = await this.unitResource.findByName(name);
        const unitOutputDtos: UnitOutputDto[] = [];
        if (units) {
            for (let i = 0 ; i < units.length ; i++) {
                const topUnits: Unit[] = await this.unitResource.getTopUnits(units[i].getId());
                if (topUnits) {
                    for (let j = 0 ; j < topUnits.length ; j++) {
                        const unitOutputDto: UnitOutputDto = {name: units[i].getName(), code: units[i].getCode(), topUnit: {name: topUnits[j].getName(), code: topUnits[j].getCode()}};
                        unitOutputDtos.push(unitOutputDto);
                    }
                } else {
                    const unitOutputDto: UnitOutputDto = {name: units[i].getName(), code: units[i].getCode(), topUnit: undefined};
                    unitOutputDtos.push(unitOutputDto);
                }
            }
        }
        unitOutputDtos ? res.status(HttpStatusCode.OK).json(unitOutputDtos) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async findAll(req: Request, res: Response): Promise<any> {
        const units: Unit[] = await this.unitResource.findAll();
        const unitOutputDtos: UnitOutputDto[] = UnitController.toArrayUnitOutputDto(units);
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
    async findById(req: Request, res: Response): Promise<any> {
        const id: number = req.params.id;
        const unit: Unit = await this.unitResource.findById(id);
        const unitOutputDto: UnitOutputDto = UnitController.toUnitOutputDto(unit);
        unit ? res.status(HttpStatusCode.OK).json(unitOutputDto) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async findByCode(req: Request, res: Response): Promise<any> {
        const code: number = req.params.code;
        const unit: Unit = await this.unitResource.findByCode(code);
        const unitOutputDto: UnitOutputDto = UnitController.toUnitOutputDto(unit);
        unit ? res.status(HttpStatusCode.OK).json(unitOutputDto) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    private static toUnitOutputDto(unit: Unit): UnitOutputDto {
        let unitOutputDto: UnitOutputDto = undefined;
        if (unit) {
            unitOutputDto = {name: unit.getName(), code: unit.getCode()};
        }
        return unitOutputDto;
    }
    private static toArrayUnitOutputDto(units: Unit[]): UnitOutputDto[] {
        const unitOutputDtos: UnitOutputDto[] = [];
        if (units.length > 0) {
            for (let i = 0 ; i < units.length ; i++ ) {
                unitOutputDtos.push(UnitController.toUnitOutputDto(units[i]));
            }
        }
        return unitOutputDtos;
    }
}
