import { Request, Response } from "express";
import Unit from "../models/unit.model";
import Relation from "../models/relation.model";
import { TypeRelation } from "../models/typeralation.enum";
import { ObjectId } from "bson";


/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {

  const relation = new Relation(
    {
      type: TypeRelation.USE,
      topUnit: new ObjectId("5adf231d85dded040f3f6d03"),
      lowerUnit: new ObjectId("5adf231d85dded040f3f6d03")
    }
  );
  relation.save();
  res.send("OK");
};
