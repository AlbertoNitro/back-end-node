import { Request, Response } from "express";
import { UnitService } from "../services/unit.service";
import { UnitEntity } from "../entities/unit.entity";
import { RelationController } from "./relation.controller";
import { HttpStatusCode } from "../util/http-status-codes.enum";

export class UnitController {
  private unitService: UnitService;
  private relationController: RelationController;

  constructor() {
    this.unitService = new UnitService();
    this.relationController = new RelationController();
  }

  async create(req: Request, res: Response) {
    const unit: UnitEntity = await this.unitService.create(req.body.name);
    unit ? res.status(HttpStatusCode.CREATED).json(unit) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
  async findByName(req: Request, res: Response) {
    const name: String = req.params.name;
    const units = await this.unitService.findByName(new RegExp(name + "[a-zA-Z]+"));
    const response: UnitEntity[] = [];
    console.log(Object.keys(units).length);
    for (let i = 0 ; i < Object.keys(units).length; i++) {
      const relations: any = await this.relationController.findByLowerUnit(units[i]._id); // Obtengo las relaciones
      if (relations[0] != undefined  ) {
        for (let j = 0 ; j < Object.keys(relations).length; j++) {
          let unitEntity: UnitEntity = new UnitEntity(units[i].name);
          const topDocument: any = await this.unitService.findById(relations[j].topUnit);
          const topUnit: UnitEntity = new UnitEntity(topDocument.name);
          topUnit.$id = topDocument._id;
          unitEntity.$id = units[i]._id;
          unitEntity.$topUnit = topUnit;
          response.push(unitEntity);
          unitEntity = undefined;

        }
      }
      else {
        response.push(units[i]);
      }
    }
    res.status(200).json(response);
  }
  async findAll(req: Request, res: Response) {
      res.status(200).json( await this.unitService.findAll());
  }
  async delete(req: Request, res: Response) {
      const successRelation: boolean = await this.relationController.deleteByConexion(req.params.id);
      const successUnit: boolean = await this.unitService.delete(req.params.id);
      successRelation && successUnit ? res.status(HttpStatusCode.NO_CONTENT) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
}
