import { Document } from "mongoose";
import logger from "../../util/logger";
import SolutionSchema from "../../schemas/solution.schema";

import JustificationSchema from "../../schemas/justification.schema";

export class ExerciseDao {
    constructor() {
    }

    async findWithSolution() {
        return await JustificationSchema.populate(await SolutionSchema.find({}), {path: "justifications"});

    }
}