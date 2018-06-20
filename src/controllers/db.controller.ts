import { DbService } from "../services/db.service";
import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/http-status-codes.enum";
import logger from "../utils/logger";

export class DbController {
    private dbService: DbService;
    private static OPERATOR_DB_PASSWORD = process.env["OPERATOR_DB_PASSWORD"];

    constructor() {
        this.dbService = new DbService();
    }

    async seed(req: Request, res: Response): Promise<any> {
        const password: string = req.params.password;
        if (password === DbController.OPERATOR_DB_PASSWORD) {
            const success: boolean = await this.dbService.seed();
            success ? res.status(HttpStatusCode.CREATED).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.UNAUTHORIZED).end();
        }
    }
    async doBackup(req: Request, res: Response): Promise<any> {
        const password: string = req.params.password;
        if (password === DbController.OPERATOR_DB_PASSWORD) {
            const success: boolean = await this.dbService.doBackup();
            success ? res.status(HttpStatusCode.OK).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.UNAUTHORIZED).end();
        }
    }
    async delete(req: Request, res: Response): Promise<any> {
        const password: string = req.params.password;
        if (password === DbController.OPERATOR_DB_PASSWORD) {
            const success: boolean = await this.dbService.delete();
            success ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.UNAUTHORIZED).end();
        }
    }
}

