import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { Unit } from "../models/unit.model";
import { UnitResource } from "../resources/unit.resource";
import { RelationResource } from "../resources/relation.resource";
import logger from "../util/logger";
import { UnitOutputDto } from "../dtos/unitOutput.dto";

export class UnitController {
    private unitResource: UnitResource;
    private relationResource: RelationResource;

    constructor() {
        this.unitResource = new UnitResource();
        this.relationResource = new RelationResource();
    }

    async create(req: Request, res: Response): Promise<any> {
        const unit: Unit = await this.unitResource.create(req.body.name);
        unit ? res.status(HttpStatusCode.CREATED).json(unit) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async findByName(req: Request, res: Response) {
        const name: string = req.query.name;
        logger.info(name);
        const unitOutputDtos: UnitOutputDto[] = await this.unitResource.findByName(name);
        unitOutputDtos ? res.status(HttpStatusCode.OK).json(unitOutputDtos) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async findAll(req: Request, res: Response): Promise<any> {
        const units: Unit[] = await this.unitResource.findAll();
        units ? res.status(HttpStatusCode.OK).json(units) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
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
        unit ? res.status(HttpStatusCode.OK).json(unit) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async findByCode(req: Request, res: Response): Promise<any> {
        const code: number = req.params.code;
        const unit: Unit = await this.unitResource.findByCode(code);
        unit ? res.status(HttpStatusCode.OK).json(unit) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async getFriendsByUnit(req: Request, res: Response) {
        const unit: Unit = await this.unitResource.findByCode(req.params.id);
        const topUnits: number[] = await this.relationResource.findIdByLowerUnit(unit.getId());
        const lowerUnits: any[] = Array.from(await this.unitResource.getFriends(unit.getId(), 5));
        for ( let i = 0 ; i < lowerUnits.length - 1; i++) {
            const set: Set<number> = lowerUnits[i];
            const setArray: number[] = Array.from(set);
            for (let j = 0 ; j < setArray.length; j++) {
                // if (typeof(setArray[j]) == "number")
                // console.log(typeof(setArray[j]));
                // console.log("HOLAAAAA" + setArray[j]);
            }
        }
        console.log("$$$$$$$" + JSON.stringify(lowerUnits));
        /*const relations: Unit[] = this.relationResource.findRelations(lowerUnits.concat(topUnits.concat(unit)));*/
    }
}