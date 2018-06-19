import { Exercise } from "../models/exercise.model";
import { ExerciseDao } from "../daos/exercise.dao";
import { SolutionInputDto } from "../dtos/input/solutionInput.dto";
import { LessonResource } from "./lesson.resource";

export class ExerciseResource {
    private exerciseDao: ExerciseDao;
    private lessonResource: LessonResource;

    constructor() {
        this.exerciseDao = new ExerciseDao();
        this.lessonResource = new LessonResource();
    }

    async create(lessonId: string, formulation: string, solutions: SolutionInputDto[]): Promise<Exercise> {
        const exercise: Exercise = await this.exerciseDao.create(formulation, solutions);
        await this.lessonResource.updateInteractions(lessonId, exercise.getId());
        return exercise;
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