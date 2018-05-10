import { Request, Response } from "express";
import { UnitDao } from "../services/dao/unit.dao";
import { RelationController } from "./relation.controller";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { Unit } from "../models/unit.model";

export class UnitController {
  private unitDao: UnitDao;
  private relationController: RelationController;

  constructor() {
    this.unitDao = new UnitDao();
    this.relationController = new RelationController();
  }

  async create(req: Request, res: Response): Promise<any> {
    const unit: Unit = await this.unitDao.create(req.body.name);
    unit ? res.status(HttpStatusCode.CREATED).json(unit) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
  }
  async findByName(req: Request, res: Response) {
    const name: string = req.params.name;
    const units: Unit[] = await this.unitDao.findByName(name);
    units ? res.status(HttpStatusCode.OK).json(units) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
  }
  async findAll(req: Request, res: Response): Promise<any> {
      const units: Unit[] = await this.unitDao.findAll();
      units ? res.status(HttpStatusCode.OK).json(units) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
  }
  async delete(req: Request, res: Response): Promise<any> {
      const unit: Unit = await this.unitDao.findById(req.params.id);
      if (unit) {
          const statusDeleteUnit: boolean = await this.unitDao.delete(req.params.id);
          const statusDeleteRelations: boolean = await this.relationController.deleteByConexion(req.params.id);
          statusDeleteUnit && statusDeleteRelations ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
      } else {
          res.status(HttpStatusCode.NOT_FOUND).end();
      }
  }
}
