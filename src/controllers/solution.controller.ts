import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import logger from "../util/logger";
import { Solution } from "../models/solution.model";
import { SolutionResource } from "../resources/solution.resource";
import { SolutionInputDto } from "../dtos/solutionInput.dto";
import { SolutionOutputDto } from "../dtos/solutionOutput.dto";
import { DtoService } from "../services/dto.service";

export class SolutionController {
    private solutionResource: SolutionResource = new SolutionResource();

    constructor() {
    }

    async create(req: Request, res: Response) {
        const solutionInputDto: SolutionInputDto = req.body;
        const solution: Solution = await this.solutionResource.create(solutionInputDto);
        const solutionOutputDto: SolutionOutputDto = DtoService.toSolutionOutputDto(solution);
        solutionOutputDto ? res.status(HttpStatusCode.CREATED).json(solutionOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
}
