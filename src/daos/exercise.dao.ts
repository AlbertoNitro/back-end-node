import { Document } from "mongoose";
import logger from "../utils/logger";
import { Exercise } from "../models/exercise.model";
import ExerciseSchema from "../schemas/exercise.schema";
import { ExerciseBuilder } from "../models/builders/exercise.builder";
import { SolutionInputDto } from "../dtos/input/solutionInput.dto";

export class ExerciseDao {
    constructor() {
    }

    static toExercise(document: Document): Exercise {
        return new ExerciseBuilder(document.get("formulation")).setId(document.get("_id")).setSolutions(document.get("solutions")).build();

    }
    static toArrayExercises(documents: Document[]): Exercise[] {
        const exercises: Exercise[] = [];
        for (let i = 0; i < documents.length; i++) {
            exercises.push(ExerciseDao.toExercise(documents[i]));
        }
        return exercises;
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
                const exercise: Exercise = exerciseDocument ? ExerciseDao.toExercise(exerciseDocument) : undefined;
                return exercise;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(formulation: string, solutions: string): Promise<Exercise> {
        const exercise: Exercise =  new ExerciseBuilder(formulation).setSolutions(solutions).build();
        const exerciseSchema = new ExerciseSchema(exercise);
        return exerciseSchema.save()
            .then(async(exerciseDocument: Document) => {
                const exercise: Exercise = exerciseDocument ? ExerciseDao.toExercise(exerciseDocument) : undefined;
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
