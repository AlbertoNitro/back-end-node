import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { Unit } from "../models/unit.model";
import { UnitResource } from "../resources/unit.resource";
import { RelationResource } from "../resources/relation.resource";
import { UnitInputDto } from "../dtos/unitInputDto.dto";

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
    const name: string = req.params.name;
    const units: Unit[] = await this.unitResource.findByName(name);
    units ? res.status(HttpStatusCode.OK).json(units) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
  }
  async findAll(req: Request, res: Response): Promise<any> {
      const units: Unit[] = await this.unitResource.findAll();
      units ? res.status(HttpStatusCode.OK).json(units) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
  }
  async delete(req: Request, res: Response): Promise<any> {
      const id: number = req.params.id;
      const unit: Unit = await this.unitResource.findById(id);
      if (unit) {
          const success: boolean = await this.unitResource.delete(id);
          success ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
      } else {
          res.status(HttpStatusCode.NOT_FOUND).end();
      }
  }

  async getFriendsByUnit(req: Request, res: Response) {
    const unit: Unit = await this.unitResource.findById(req.params.id);
    console.log("--------");
    const topUnits: Unit[] = await this.relationResource.findUnitsByLowerUnit(unit);
    console.log("--------");
    const lowerUnits: Unit[] = await this.unitResource.getFriends(unit, 5);
    console.log(lowerUnits);
    /*const relations: Unit[] = this.relationResource.findRelations(lowerUnits.concat(topUnits.concat(unit)));*/
  }

}
