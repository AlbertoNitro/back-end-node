import { Request, Response } from "express";
import Unit from "../models/unit.model";
import Relation from "../models/relation.model";
import { TypeRelation } from "../models/typeralation.enum";
import { UnitService } from "../services/unit.service";
export class HomeController {

  readonly unitService: UnitService;
  constructor(service: UnitService) {
    this.unitService  = service;
  }

  forceCreateUnit(req: Request, res: Response): void {
    const unit = "{ type: " + TypeRelation.USE + ", topUnit: new ObjectId(\"5adf231d85dded040f3f6d03\"), lowerUnit: new ObjectId(\"5adf231d85dded040f3f6d03\")}";
    // const unitService: UnitService = new UnitService();
    // this.unitService.forceGenerate(unit);
    this.unitService.prueba();
    res.send("OK");
  }
}