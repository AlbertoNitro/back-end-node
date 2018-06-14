import { SolutionInputDto } from "../dtos/input/solutionInput.dto";
import { SolutionDao } from "../daos/solution.dao";
import { Solution } from "../models/solution.model";
import logger from "../utils/logger";
import { JustificationResource } from "./justification.resource";
import { JustificationInputDto } from "../dtos/input/justificationInput.dto";

export class SolutionResource {
    private solutionDao: SolutionDao = new SolutionDao();
    private justificationResource: JustificationResource = new JustificationResource();

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
    async update(id: string, solutionInputDto: SolutionInputDto): Promise<Solution> {
        let solutionToUpdate: Solution = await this.findById(id);
        if (solutionToUpdate) {
            const justificationInputDtos: JustificationInputDto[] = solutionInputDto.justifications;
            for (let i = 0 ; i < justificationInputDtos.length ; i++) {
                await this.justificationResource.update(justificationInputDtos[i].id, justificationInputDtos[i]);
            }
            solutionToUpdate = await this.solutionDao.update(id, solutionInputDto);
        } else {
            solutionToUpdate = undefined;
        }
        return solutionToUpdate;
    }
}