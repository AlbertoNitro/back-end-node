import { Exercise } from "../models/exercise.model";
import { ExerciseDao } from "../services/daos/exercise.dao";
import { Solution } from "../models/solution.model";
import { SolutionInputDto } from "../dtos/input/solutionInput.dto";

export class ExerciseResource {
    private exerciseDao: ExerciseDao;

    constructor() {
        this.exerciseDao = new ExerciseDao();
    }

    async create(formulation: string): Promise<Exercise> {
        return await this.exerciseDao.create(formulation);
    }
    async findById(id: number): Promise<Exercise> {
        return await this.exerciseDao.findById(id);
    }
    async delete(exercise: Exercise): Promise<boolean> {
        return await this.exerciseDao.delete(exercise.getId());
    }
    async update(id: number, solutions: Solution[]): Promise<Exercise> {
        let exercise: Exercise = await this.findById(id);
        exercise = exercise ? await this.exerciseDao.update(id, solutions) : undefined;
        return exercise;
    }
}