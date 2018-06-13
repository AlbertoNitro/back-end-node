import { Document } from "mongoose";
import logger from "../utils/logger";
import { Exercise } from "../models/exercise.model";
import ExerciseSchema from "../schemas/exercise.schema";
import { SolutionDao } from "./solution.dao";
import { Solution } from "../models/solution.model";
import { ExerciseBuilder } from "../models/builders/exercise.builder";
import SolutionSchema from "../schemas/solution.schema";

export class ExerciseDao {
    constructor() {
    }

    static toExercise(document: Document): Exercise {
        const solutionsDocuments: Solution[] = SolutionDao.toArraySolutions(document.get("solutions"));
        return new ExerciseBuilder(document.get("formulation")).setId(document.get("_id")).setSolutions(solutionsDocuments).build();

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
                // const exercisePopulate: any = await SolutionSchema.populate(exerciseDocument, {path: "solutions", model: "Solution", populate: {path: "justifications", model: "Justification"}});
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
            .then(async(exerciseDocument: Document) => {
                const exercisePopulate: any = await SolutionSchema.populate(exerciseDocument, {path: "solutions", model: "Solution", populate: {path: "justifications", model: "Justification"}});
                const exercise: Exercise = exercisePopulate ? ExerciseDao.toExercise(exerciseDocument) : undefined;
                return exercise;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async update(id: string, solutions: Solution[]): Promise<Exercise> {
        return await ExerciseSchema.updateOne({_id: id}, {$set: {solutions: solutions}}, {new: true})
            .then(async(exerciseDocument: Document) => {
                const exercisePopulate: any = await SolutionSchema.populate(exerciseDocument, {path: "solutions", populate: {path: "justifications", model: "Justification"}});
                const exercise: Exercise = exercisePopulate ? ExerciseDao.toExercise(exerciseDocument) : undefined;
                return exercise;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
}
