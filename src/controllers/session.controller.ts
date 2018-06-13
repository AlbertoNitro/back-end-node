import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/http-status-codes.enum";
import logger from "../utils/logger";
import { Session } from "../models/session.model";
import { SessionResource } from "../resources/session.resource";
import { DtoService } from "../services/dto.service";
import { SessionOutputDto } from "../dtos/output/sessionOutput.dto";

export class SessionController {
    private sessionResource: SessionResource;
    private dtoService: DtoService;

    constructor() {
        this.sessionResource = new SessionResource();
        this.dtoService = new DtoService();
    }

    async create(req: Request, res: Response): Promise<any> {
        const name: string = req.body.name;
        const session: Session = await this.sessionResource.create(name);
        const sessionOutputDto: SessionOutputDto = this.dtoService.toSessionOutputDto(session);
        session ? res.status(HttpStatusCode.CREATED).json(sessionOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async findById(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const session: Session = await this.sessionResource.findById(id);
        const sessionOutputDto: SessionOutputDto = this.dtoService.toSessionOutputDto(session);
        session ? res.status(HttpStatusCode.OK).json(sessionOutputDto) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async delete(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const session: Session = await this.sessionResource.findById(id);
        if (session) {
            const success: boolean = await this.sessionResource.delete(session);
            success ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }
}
