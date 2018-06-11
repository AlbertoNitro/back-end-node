import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/http-status-codes.enum";
import logger from "../utils/logger";
import { Solution } from "../models/solution.model";
import { SolutionResource } from "../resources/solution.resource";
import { SolutionInputDto } from "../dtos/input/solutionInput.dto";
import { SolutionOutputDto } from "../dtos/output/solutionOutput.dto";
import { DtoService } from "../services/dto.service";

export class SolutionController {
    private solutionResource: SolutionResource = new SolutionResource();

    constructor() {
    }
    async findById(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const solution: Solution = await this.solutionResource.findById(id);
        const solutionOutputDto: SolutionOutputDto = DtoService.toSolutionOutputDto(solution);
        solutionOutputDto ? res.status(HttpStatusCode.OK).json(solutionOutputDto) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async delete(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const solution: Solution = await this.solutionResource.findById(id);
        if (solution) {
            const success: boolean = await this.solutionResource.delete(solution);
            success ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }
    async findAll(req: Request, res: Response): Promise<any> {
        const solutions: Solution[] = await this.solutionResource.findAll();
        const solutionOutputDtos: SolutionOutputDto[] = DtoService.toArraySolutionOutputDto(solutions);
        solutionOutputDtos ? res.status(HttpStatusCode.OK).json(solutionOutputDtos) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async create(req: Request, res: Response) {
        const solutionInputDto: SolutionInputDto = req.body;
        const solution: Solution = await this.solutionResource.create(solutionInputDto);
        const solutionOutputDto: SolutionOutputDto = DtoService.toSolutionOutputDto(solution);
        solutionOutputDto ? res.status(HttpStatusCode.CREATED).json(solutionOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
}
