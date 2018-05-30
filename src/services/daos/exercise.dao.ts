import { Relation } from "../../models/relation.model";
import { UnitDao } from "./unit.dao";
import { Unit } from "../../models/unit.model";
import { RelationInputDto } from "../../dtos/relationInput.dto";
import RelationSchema from "../../schemas/relation.schema";
import { RelationBuilder } from "../../models/builders/relation.builder";
import { Document } from "mongoose";
import UnitSchema from "../../schemas/unit.schema";
import { UnitBuilder } from "../../models/builders/unit.builder";
import logger from "../../util/logger";
import SolutionSchema from "../../schemas/solution.schema";
import { Justification } from "../../models/justification.model";
import JustificationSchema from "../../schemas/justification.schema";

export class ExerciseDao {

    constructor() {
    }

    async findWithSolution() {
        return await JustificationSchema.populate(await SolutionSchema.find({}), {path: "justifications"});

    }
}