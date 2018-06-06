import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import logger from "../util/logger";
import { JustificationResource } from "../resources/justification.resource";
import { Justification } from "../models/justification.model";
import { JustificationOutputDto } from "../dtos/justificationOutput.dto";
import { DtoService } from "../services/dto.service";
import { JustificationInputDto } from "../dtos/justificationInput.dto";

export class JustificationController {
    private justificationResource: JustificationResource;

    constructor() {
        this.justificationResource = new JustificationResource();
    }

    async create(req: Request, res: Response): Promise<any> {
        const justificationInputDto: JustificationInputDto = req.body;
        const justification: Justification = await this.justificationResource.create(justificationInputDto.text, justificationInputDto.isCorrect);
        const justificationOutputDto: JustificationOutputDto = DtoService.toJustificationOutputDto(justification);
        justification ? res.status(HttpStatusCode.CREATED).json(justificationOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async findById(req: Request, res: Response): Promise<any> {
        const id: number = req.params.id;
        const justification: Justification = await this.justificationResource.findById(id);
        const justificationOutputDto: JustificationOutputDto = DtoService.toJustificationOutputDto(justification);
        justification ? res.status(HttpStatusCode.OK).json(justificationOutputDto) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async delete(req: Request, res: Response): Promise<any> {
        const id: number = req.params.id;
        const justification: Justification = await this.justificationResource.findById(id);
        if (justification) {
            const success: boolean = await this.justificationResource.delete(justification);
            success ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }
}

