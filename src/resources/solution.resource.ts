import { SolutionInputDto } from "../dtos/solutionInput.dto";
import { SolutionDao } from "../services/daos/solution.dao";
import { Solution } from "../models/solution.model";

export class SolutionResource {

    private solutionDao: SolutionDao = new SolutionDao();

    constructor() {
    }

    async create(solutionInputDto: SolutionInputDto): Promise<Solution> {
        return await this.solutionDao.create(solutionInputDto);
    }

}