import { Request, Response } from "express";
import { TypeRelation } from "../models/typeralation.enum";
import { UnitService } from "../services/unit.service";
import { UnitEntity } from "../entities/unit";
import { RelationController } from "../controllers/relation.controller";
export class UnitController {
  unitService: UnitService = new UnitService();
  relationController: RelationController = new RelationController();
  constructor() {
  }
  forceCreateUnit(req: Request, res: Response): void {
    const unit = "{ type: " + TypeRelation.USE + ", topUnit: new ObjectId(\"5adf231d85dded040f3f6d03\"), lowerUnit: new ObjectId(\"5adf231d85dded040f3f6d03\")}";
    this.unitService.forceGenerate(unit);
    res.send("OK");
  }
  async create(req: Request, res: Response) {
    const unit: UnitEntity = new UnitEntity(req.body.name);
    await res.status(200).json( await this.unitService.create(unit));
  }

  async findByName(req: Request, res: Response) {
    const _unit: UnitEntity[] = [];
    const name: String = req.param("name");
    const units = await this.unitService.findByName(new RegExp(name + "[a-zA-Z]+"));
    const response: UnitEntity[] = [];
    units.forEach(async (unit: any) => {
      console.log(unit._id);
      const relation: any = (await this.relationController.findByLowerUnit(unit._id))[0];
      console.log(unit);
      console.log("Relations " + relation);
      if (relation != undefined  ) {
        console.log(relation.topUnit);
        const topDocument: any = await this.unitService.findById(relation.topUnit);
        const topUnit: UnitEntity = new UnitEntity(topDocument.name);
        topUnit.$id = topDocument._id;

        const unitEntity: UnitEntity = new UnitEntity(unit.name);
        unitEntity.$id = unit._id;
        unitEntity.$topUnit = topUnit;
        response.push(unitEntity);
        // console.log(unitEntity);
      }
    });
    res.status(200).json(response);
  }

  async findAll(req: Request, res: Response) {
      await res.status(200).json( await this.unitService.findAll());
  }
}
