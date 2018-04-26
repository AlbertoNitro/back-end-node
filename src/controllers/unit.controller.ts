import { Request, Response } from "express";
import Relation from "../models/relation.model";
import { TypeRelation } from "../models/typeralation.enum";
import { UnitService } from "../services/unit.service";
import { UnitEntity } from "../entities/unit";
import {HttpStatusCode} from "../util/http-status-codes.enum";
import {WrapperResponse} from "../models/wrapper-response.model";

export class HomeController {
  unitService: UnitService = new UnitService();
  constructor() {
  }

  forceCreateUnit(req: Request, res: Response): void {
    const unit = "{ type: " + TypeRelation.USE + ", topUnit: new ObjectId(\"5adf231d85dded040f3f6d03\"), lowerUnit: new ObjectId(\"5adf231d85dded040f3f6d03\")}";
    this.unitService.forceGenerate(unit);
    res.send("OK");
  }

  async create(req: Request, res: Response) {
    console.log(req.body);
    const unit: UnitEntity = new UnitEntity(req.body.name);
    await res.status(400).json( await this.unitService.create(unit));
    // await res.send( await this.unitService.create(unit) );
  }

  async findAll(req: Request, res: Response): Promise<any> {
      const wraperResponse: WrapperResponse = await this.unitService.findAll();
      if (wraperResponse.statusCode === HttpStatusCode.OK) {
          res.status(wraperResponse.statusCode).json(wraperResponse);
      } else {
          res.status(wraperResponse.statusCode);
      }
  }
}
