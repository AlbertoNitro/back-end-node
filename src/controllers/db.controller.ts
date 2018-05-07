import { DbService } from "../services/db.service";
import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";

export class DbController {
    private dbService: DbService;

    constructor() {
        this.dbService = new DbService();
    }

    async seedDb(req: Request, res: Response): Promise<any> {
        console.log("Poblando db...");
        const success: boolean = await this.dbService.seedDb();
        success ? res.status(HttpStatusCode.OK) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
    async saveDbInBackup(req: Request, res: Response): Promise<any> {
        const success: boolean = await this.dbService.saveDbInBackup();
        success ? res.status(HttpStatusCode.OK) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }

    /*
    async dropDb(req: Request, res: Response): Promise<any> {
        const success: boolean = await this.dbService.deleteDb();
        success ? res.status(HttpStatusCode.OK) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
    */
}

