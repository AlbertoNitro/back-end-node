import { Document } from "mongoose";
import logger from "../../util/logger";
import SolutionSchema from "../../schemas/solution.schema";

import JustificationSchema from "../../schemas/justification.schema";
import { Exercise } from "../../models/exercise.model";
import ExerciseSchema from "../../schemas/exercise.schema";

export class ExerciseDao {
    constructor() {
    }

    private static toExercise(document: Document): Exercise {
        return new ExerciseBuilder().setId(document.get("_id")).setText(document.get("text")).setIsCorrect(document.get("isCorrect")).build();
    }
    private static toArrayExercises(documents: Document[]): Exercise[] {
        const exercises: Exercise[] = [];
        for (let i = 0; i < documents.length; i++) {
            exercises.push(ExerciseDao.toExercise(documents[i]));
        }
        return exercises;
    }
    async delete(id: number): Promise<boolean> {
        return await ExerciseSchema.deleteOne({_id: id })
            .then( () => {
                return true;
            })
            .catch ( err => {
                logger.error(err);
                return false;
            });
    }
    async findById(id: number): Promise<Exercise> {
        return await ExerciseSchema.findById(id)
            .then( (exerciseDocument: Document) => {
                const exercise: Exercise = exerciseDocument ? ExerciseDao.toExercise(exerciseDocument) : undefined;
                return exercise;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(isCorrect: boolean, text: string): Promise<Exercise> {
        const exercise: Exercise = new ExerciseBuilder().setIsCorrect(isCorrect).setText(text).build();
        const exerciseSchema = new ExerciseSchema(exercise);
        return exerciseSchema.save()
            .then( (exerciseDocument: Document) => {
                const exercise: Exercise = exerciseDocument ? ExerciseDao.toExercise(exerciseDocument) : undefined;
                return exercise;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async findWithSolution() {
        return await JustificationSchema.populate(await SolutionSchema.find({}), {path: "justifications"});

    }

}