import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/http-status-codes.enum";
import logger from "../utils/logger";
import { Solution } from "../models/solution.model";
import { SolutionResource } from "../resources/solution.resource";
import { SolutionInputDto } from "../dtos/input/solutionInput.dto";
import { SolutionOutputDto } from "../dtos/output/solutionOutput.dto";
import { DtoService } from "../services/dto.service";
import { JustificationOutputDto } from "../dtos/output/justificationOutput.dto";
import { Justification } from "../models/justification.model";
import { JustificationBuilder } from "../models/builders/justification.builder";

export class SolutionController {
    private solutionResource: SolutionResource;
    private dtoService: DtoService;

    constructor() {
        this.solutionResource = new SolutionResource();
        this.dtoService = new DtoService();
    }
    async findById(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const solution: Solution = await this.solutionResource.findById(id);
        const solutionOutputDto: SolutionOutputDto = this.dtoService.toSolutionOutputDto(solution);
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
        const solutionOutputDtos: SolutionOutputDto[] = this.dtoService.toArraySolutionOutputDto(solutions);
        solutionOutputDtos ? res.status(HttpStatusCode.OK).json(solutionOutputDtos) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async create(req: Request, res: Response) {
        const solutionInputDto: SolutionInputDto = req.body;
        const solution: Solution = await this.solutionResource.create(solutionInputDto);
        const solutionOutputDto: SolutionOutputDto = this.dtoService.toSolutionOutputDto(solution);
        solutionOutputDto ? res.status(HttpStatusCode.CREATED).json(solutionOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async update(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const justificationOutputDtos: JustificationOutputDto[] = req.body;
        const justifications: Justification[] = [];
        for (let i = 0; i < justificationOutputDtos.length; i++) {
            justifications.push(new JustificationBuilder(justificationOutputDtos[i].text, justificationOutputDtos[i].isCorrect).setId(justificationOutputDtos[i].id).build());
        }
        const solution: Solution = await this.solutionResource.update(id, justifications);
        const solutionOutputDto: SolutionOutputDto = this.dtoService.toSolutionOutputDto(solution);
        solutionOutputDto ? res.status(HttpStatusCode.OK).json(solutionOutputDto) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
}
