import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/http-status-codes.enum";
import logger from "../utils/logger";
import { ExerciseResource } from "../resources/exercise.resource";
import { Exercise } from "../models/exercise.model";
import { ExerciseOutputDto } from "../dtos/output/exerciseOutput.dto";
import { ExerciseInputDto } from "../dtos/input/exerciseInput.dto";
import { ConverterModelsToDtosService } from "../services/converterModelsToDtos.service";

export class ExerciseController {
    private exerciseResource: ExerciseResource;
    private converterModelsToDtosService: ConverterModelsToDtosService;

    constructor() {
        this.exerciseResource = new ExerciseResource();
        this.converterModelsToDtosService = new ConverterModelsToDtosService();
    }

    async create(req: Request, res: Response): Promise<any> {
        const exerciseInputDto: ExerciseInputDto = req.body;
        const exercise: Exercise = await this.exerciseResource.create(exerciseInputDto.lessonId, exerciseInputDto.formulation, exerciseInputDto.solutions);
        const exerciseOutputDto: ExerciseOutputDto = this.converterModelsToDtosService.toExerciseOutputDto(exercise);
        exercise ? res.status(HttpStatusCode.CREATED).json(exerciseOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async findById(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const exercise: Exercise = await this.exerciseResource.findById(id);
        const exerciseOutputDto: ExerciseOutputDto = this.converterModelsToDtosService.toExerciseOutputDto(exercise);
        exercise ? res.status(HttpStatusCode.OK).json(exerciseOutputDto) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async delete(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const exercise: Exercise = await this.exerciseResource.findById(id);
        if (exercise) {
            const success: boolean = await this.exerciseResource.delete(exercise);
            success ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }
    async update(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const exerciseInputDto: ExerciseInputDto = req.body;
        const exercise: Exercise = await this.exerciseResource.update(id, exerciseInputDto.formulation, exerciseInputDto.solutions);
        const exerciseOutputDto: ExerciseOutputDto = this.converterModelsToDtosService.toExerciseOutputDto(exercise);
        exerciseOutputDto ? res.status(HttpStatusCode.OK).json(exerciseOutputDto) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
}
