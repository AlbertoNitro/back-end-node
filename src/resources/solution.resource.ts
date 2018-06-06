import { SolutionInputDto } from "../dtos/input/solutionInput.dto";
import { SolutionDao } from "../services/daos/solution.dao";
import { Solution } from "../models/solution.model";

export class SolutionResource {
    private solutionDao: SolutionDao = new SolutionDao();

    constructor() {
    }

    async create(solutionInputDto: SolutionInputDto): Promise<Solution> {
        return await this.solutionDao.create(solutionInputDto);
    }
    async findById(id: number): Promise<Solution> {
        return await this.solutionDao.findById(id);
    }
    async findAll(): Promise<Solution[]> {
        return await this.solutionDao.findAll();
    }
    async delete(solution: Solution): Promise<boolean> {
        return await this.solutionDao.delete(solution.getId());
    }
}