import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/http-status-codes.enum";
import logger from "../utils/logger";
import { Session } from "../models/session.model";
import { SessionResource } from "../resources/session.resource";

export class SessionController {
    private sessionResource: SessionResource;

    constructor() {
        this.sessionResource = new SessionResource();
    }

    async create(req: Request, res: Response): Promise<any> {
        const name: string = req.body.name;
        const session: Session = await this.sessionResource.create(name);
        // const sessionOutputDto: SessionOutputDto = DtoService.toSessionOutputDto(session);
        session ? res.status(HttpStatusCode.CREATED).json(session) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async findById(req: Request, res: Response): Promise<any> {
        const id: number = req.params.id;
        const session: Session = await this.sessionResource.findById(id);
        // const sessionOutputDto: SessionOutputDto = DtoService.toSessionOutputDto(session);
        session ? res.status(HttpStatusCode.OK).json(session) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async delete(req: Request, res: Response): Promise<any> {
        const id: number = req.params.id;
        const session: Session = await this.sessionResource.findById(id);
        if (session) {
            const success: boolean = await this.sessionResource.delete(session);
            success ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }
}
