import { Document } from "mongoose";
import logger from "../../util/logger";
import SolutionSchema from "../../schemas/solution.schema";
import JustificationSchema from "../../schemas/justification.schema";
import { Exercise } from "../../models/exercise.model";
import ExerciseSchema from "../../schemas/exercise.schema";
import { SolutionDao } from "./solution.dao";
import { Solution } from "../../models/solution.model";

export class ExerciseDao {
    constructor() {
    }

    public static toExercise(document: Document): Exercise {
        const solutions: Solution[] = [];
        const solutionsDocuments: Document[] = document.get("solutions");
        for (let i = 0 ; i < solutionsDocuments.length ; i++) {
            const solutionDocument: Document = solutionsDocuments[i];
            solutions.push(SolutionDao.toSolution(solutionDocument));
        }
        // HAY QUE METER LAS SOLUTIONS
        return new Exercise(document.get("formulation")).setId(document.get("_id").setSolutions(document.get("solutions")));
    }
    public static toArrayExercises(documents: Document[]): Exercise[] {
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
    async findWithSolution() {
        return await JustificationSchema.populate(await SolutionSchema.find({}), {path: "justifications"});
    }
}