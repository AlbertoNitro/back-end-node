import { Document } from "mongoose";
import logger from "../../utils/logger";
import { Exercise } from "../../models/exercise.model";
import ExerciseSchema from "../../schemas/exercise.schema";
import { SolutionDao } from "./solution.dao";
import { Solution } from "../../models/solution.model";
import { ExerciseBuilder } from "../../models/builders/exercise.builder";

export class ExerciseDao {
    constructor() {
    }

    static toExercise(document: Document): Exercise {
        const solutions: Solution[] = [];
        const solutionsDocuments: Document[] = document.get("solutions");
        for (let i = 0 ; i < solutionsDocuments.length ; i++) {
            const solutionDocument: Document = solutionsDocuments[i];
            solutions.push(SolutionDao.toSolution(solutionDocument));
        }
        return new ExerciseBuilder(document.get("formulation")).setId(document.get("_id")).setSolutions(SolutionDao.toArraySolutions(document.get("solutions"))).build();

    }
    static toArrayExercises(documents: Document[]): Exercise[] {
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
    async create(formulation: string): Promise<Exercise> {
        const exercise: Exercise =  new Exercise(formulation);
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
    async update(id: number, solutions: Solution[]): Promise<Exercise> {
        return await ExerciseSchema.updateOne({_id: id}, {$set: {solutions: solutions}}, {new: true})
            .then((exerciseDocument: Document) => {
                const exercise: Exercise = exerciseDocument ? ExerciseDao.toExercise(exerciseDocument) : undefined;
                return exercise;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
}
