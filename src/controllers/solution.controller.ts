import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import logger from "../util/logger";
import { Solution } from "../models/solution.model";
import { SolutionResource } from "../resources/solution.resource";
import { SolutionInputDto } from "../dtos/solutionInput.dto";

export class SolutionController {
    private solutionResource: SolutionResource;

    constructor() {
    }

    async create(req: Request, res: Response) {
        const solutionInputDto: SolutionInputDto = req.body;
        const solution: Solution = await this.solutionResource.create(solutionInputDto);
        // const unitOutputDto: UnitOutputDto = DtoService.toUnitOutputDto(unit);
        solution ? res.status(HttpStatusCode.CREATED).json(solution) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
}
