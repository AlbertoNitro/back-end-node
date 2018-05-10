import { Request, Response } from "express";
import { UnitService } from "../services/dao/unit.dao";
import { Unit } from "../models/unit.model";
import { RelationController } from "./relation.controller";
import { HttpStatusCode } from "../util/http-status-codes.enum";

export class UnitController {
  private unitService: UnitService;
  private relationController: RelationController;

  constructor() {
    this.unitService = new UnitService();
    this.relationController = new RelationController();
  }

  async create(req: Request, res: Response): Promise<any> {
    const unit: Unit = await this.unitService.create(req.body.name);
    unit ? res.status(HttpStatusCode.CREATED).json(unit) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
  }
  async findByName(req: Request, res: Response) {
    const name: string = req.params.name;
    const units: Unit[] = await this.unitService.findByName(name);
    units ? res.status(HttpStatusCode.OK).json(units) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
  }
  async findAll(req: Request, res: Response): Promise<any> {
      const units: Unit[] = await this.unitService.findAll();
      units ? res.status(HttpStatusCode.OK).json(units) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
  }
  async delete(req: Request, res: Response): Promise<any> {
      const unit: Unit = await this.unitService.findById(req.params.id);
      if (unit) {
          const statusDeleteUnit: boolean = await this.unitService.delete(req.params.id);
          const statusDeleteRelations: boolean = await this.relationController.deleteByConexion(req.params.id);
          statusDeleteUnit && statusDeleteRelations ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
      } else {
          res.status(HttpStatusCode.NOT_FOUND).end();
      }
  }
}
