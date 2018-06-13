import { SolutionInputDto } from "../dtos/input/solutionInput.dto";
import { SolutionDao } from "../daos/solution.dao";
import { Solution } from "../models/solution.model";
import { Justification } from "../models/justification.model";
import { JustificationInputDto } from "../dtos/input/justificationInput.dto";
import { JustificationOutputDto } from "../dtos/output/justificationOutput.dto";
import logger from "../utils/logger";

export class SolutionResource {
    private solutionDao: SolutionDao = new SolutionDao();

    constructor() {
    }

    async create(solutionInputDto: SolutionInputDto): Promise<Solution> {
        return await this.solutionDao.create(solutionInputDto);
    }
    async findById(id: string): Promise<Solution> {
        return await this.solutionDao.findById(id);
    }
    async findAll(): Promise<Solution[]> {
        return await this.solutionDao.findAll();
    }
    async delete(solution: Solution): Promise<boolean> {
        return await this.solutionDao.delete(solution.getId());
    }
    async update(id: string, justifications: Justification[]): Promise<Solution> {
        let solution: Solution = await this.findById(id);
        const justificationIds: string[] = [];
        for (let i = 0 ; i < justifications.length ; i++) {
            justificationIds[i] = justifications[i].getId();
        }
        solution = solution ? await this.solutionDao.update(id, justificationIds) : undefined;
        return solution;
    }
}