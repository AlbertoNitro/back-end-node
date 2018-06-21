import { Document } from "mongoose";
import logger from "../utils/logger";
import { Exercise } from "../models/exercise.model";
import ExerciseSchema from "../schemas/exercise.schema";
import { SolutionInputDto } from "../dtos/input/solutionInput.dto";
import { ConverterDocumentsToModelsService } from "../services/converterDocumentsToModels.service";

export class ExerciseDao {
    constructor() {
    }

    async delete(id: string): Promise<boolean> {
        return await ExerciseSchema.deleteOne({_id: id })
            .then( () => {
                return true;
            })
            .catch ( err => {
                logger.error(err);
                return false;
            });
    }
    async findById(id: string): Promise<Exercise> {
        return await ExerciseSchema.findById(id)
            .then(async(exerciseDocument: Document) => {
                const exercise: Exercise = exerciseDocument ? ConverterDocumentsToModelsService.toExercise(exerciseDocument) : undefined;
                return exercise;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(formulation: string, solutions: SolutionInputDto[]): Promise<Exercise> {
        const exerciseSchema = new ExerciseSchema({ formulation: formulation});
        return exerciseSchema.save()
            .then(async(exerciseDocument: Document) => {
                let exercise: Exercise = exerciseDocument ? ConverterDocumentsToModelsService.toExercise(exerciseDocument) : undefined;
                exercise = await this.update(exercise.getId(), exercise.getFormulation(), solutions);
                return exercise;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async update(id: string, formulation: string, solutions: SolutionInputDto[]): Promise<Exercise> {
        return await ExerciseSchema.findOneAndUpdate({ _id: id }, { $set: {formulation: formulation, solutions: solutions }}, { new: true })
            .then(async () => {
                const exercise: Exercise = await this.findById(id);
                return exercise;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
}
