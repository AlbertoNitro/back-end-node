import { Exercise } from "../models/exercise.model";
import { ExerciseDao } from "../daos/exercise.dao";
import { SolutionInputDto } from "../dtos/input/solutionInput.dto";

export class ExerciseResource {
    private exerciseDao: ExerciseDao;

    constructor() {
        this.exerciseDao = new ExerciseDao();
    }

    async create(lessonId: string, formulation: string, solutions: string): Promise<Exercise> {
        return await this.exerciseDao.create(formulation, solutions);
    }
    async findById(id: string): Promise<Exercise> {
        return await this.exerciseDao.findById(id);
    }
    async delete(exercise: Exercise): Promise<boolean> {
        return await this.exerciseDao.delete(exercise.getId());
    }
    async update(id: string,  formulation: string, solutions: SolutionInputDto[]): Promise<Exercise> {
        let exerciseToUpdate: Exercise = await this.findById(id);
        if (exerciseToUpdate) {
            exerciseToUpdate = await this.exerciseDao.update(id, formulation, solutions);
        } else {
            exerciseToUpdate = undefined;
        }
        return exerciseToUpdate;
    }
}