import { Exercise } from "../models/exercise.model";
import { ExerciseDao } from "../daos/exercise.dao";
import { Solution } from "../models/solution.model";
import { ExerciseInputDto } from "../dtos/input/exerciseInput.dto";
import { SolutionInputDto } from "../dtos/input/solutionInput.dto";
import { SolutionResource } from "./solution.resource";

export class ExerciseResource {
    private exerciseDao: ExerciseDao;
    private solutionResource: SolutionResource;

    constructor() {
        this.exerciseDao = new ExerciseDao();
        this.solutionResource = new SolutionResource();
    }

    async create(formulation: string): Promise<Exercise> {
        return await this.exerciseDao.create(formulation);
    }
    async findById(id: string): Promise<Exercise> {
        return await this.exerciseDao.findById(id);
    }
    async delete(exercise: Exercise): Promise<boolean> {
        return await this.exerciseDao.delete(exercise.getId());
    }
    async update(id: string, exerciseInputDto: ExerciseInputDto): Promise<Exercise> {
        let exerciseToUpdate: Exercise = await this.findById(id);
        if (exerciseToUpdate) {
            const solutionInputDtos: SolutionInputDto[] = exerciseInputDto.solutions;
            for (let i = 0 ; i < solutionInputDtos.length ; i++) {
                await this.solutionResource.update(solutionInputDtos[i].id, solutionInputDtos[i]);
            }
            exerciseToUpdate = await this.exerciseDao.update(id, exerciseInputDto);
        } else {
            exerciseToUpdate = undefined;
        }
        return exerciseToUpdate;
    }
}