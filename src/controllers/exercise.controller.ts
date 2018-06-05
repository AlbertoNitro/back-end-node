import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { DtoService } from "../services/dto.service";
import logger from "../util/logger";
import { ExerciseResource } from "../resources/exercise.resource";
import { Exercise } from "../models/exercise.model";

export class ExerciseController {
    private exerciseResource: ExerciseResource;

    constructor() {
        this.exerciseResource = new ExerciseResource();
    }

    async create(req: Request, res: Response): Promise<any> {
        const formulation: string = req.body.formulation;
        const exercise: Exercise = await this.exerciseResource.create(formulation);
        // const exerciseOutputDto: ExerciseOutputDto = DtoService.toExerciseOutputDto(exercise);
        exercise ? res.status(HttpStatusCode.CREATED).json(exercise) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async findById(req: Request, res: Response): Promise<any> {
        const id: number = req.params.id;
        const exercise: Exercise = await this.exerciseResource.findById(id);
        // const exerciseOutputDto: ExerciseOutputDto = DtoService.toExerciseOutputDto(exercise);
        exercise ? res.status(HttpStatusCode.OK).json(exercise) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async delete(req: Request, res: Response): Promise<any> {
        const id: number = req.params.id;
        const exercise: Exercise = await this.exerciseResource.findById(id);
        if (exercise) {
            const success: boolean = await this.exerciseResource.delete(exercise);
            success ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }
}
