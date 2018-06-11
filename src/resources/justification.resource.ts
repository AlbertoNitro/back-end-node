import { JustificationDao } from "../services/daos/justification.dao";
import { Justification } from "../models/justification.model";

export class JustificationResource {
    private justificationDao: JustificationDao;

    constructor() {
        this.justificationDao = new JustificationDao();
    }

    async create(text: string, isCorrect: boolean): Promise<Justification> {
        return await this.justificationDao.create(text, isCorrect);
    }
    async findById(id: string): Promise<Justification> {
        return await this.justificationDao.findById(id);
    }
    async findAll(): Promise<Justification[]> {
        return await this.justificationDao.findAll();
    }
    async delete(justification: Justification): Promise<boolean> {
        return await this.justificationDao.delete(justification.getId());
    }
}
