import { JustificationDao } from "../daos/justification.dao";
import { Justification } from "../models/justification.model";
import { JustificationInputDto } from "../dtos/input/justificationInput.dto";

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
    async update(id: string, justificationInputDto: JustificationInputDto): Promise<Justification> {
        return await this.justificationDao.update(id, justificationInputDto);
    }
}
