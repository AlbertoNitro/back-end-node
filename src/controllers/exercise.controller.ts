import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import logger from "../util/logger";
import { ExerciseResource } from "../resources/exercise.resource";


export class ExerciseController {

    private exerciseResource: ExerciseResource;

    constructor() {
        this.exerciseResource = new ExerciseResource();
    }
    /* async findWithSolution(req: Request, res: Response) {
        res.status(HttpStatusCode.OK).json(await this.exerciseResource.findWithSolution());
    } */

}
