import { Request, Response } from "express";
import Unit from "../models/unit.model";
import Relation from "../models/relation.model";
import { TypeRelation } from "../models/typeralation.enum";
import { UnitService } from "../services/unit.service";
export class HomeController {
  unitService: UnitService = new UnitService();
  constructor() {
  }

  forceCreateUnit(req: Request, res: Response): void {
    const unit = "{ type: " + TypeRelation.USE + ", topUnit: new ObjectId(\"5adf231d85dded040f3f6d03\"), lowerUnit: new ObjectId(\"5adf231d85dded040f3f6d03\")}";
    this.unitService.forceGenerate(unit);
    res.send("OK");
  }
}