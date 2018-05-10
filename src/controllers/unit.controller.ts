import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { Unit } from "../models/unit.model";
import { UnitResource } from "../resources/unit.resource";
import { RelationResource } from "../resources/relation.resource";

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
      const units: Unit[] = await this.unitService.findAll();
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
}
