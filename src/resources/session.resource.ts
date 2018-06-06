import { Session } from "../models/session.model";
import { SessionDao } from "../services/daos/session.dao";

export class SessionResource {
    private sessionDao: SessionDao;

    constructor() {
        this.sessionDao = new SessionDao();
    }

    async create(name: string): Promise<Session> {
        return await this.sessionDao.create(name);
    }
    async findById(id: number): Promise<Session> {
        return await this.sessionDao.findById(id);
    }
    async delete(session: Session): Promise<boolean> {
        return await this.sessionDao.delete(session.getId());
    }
}