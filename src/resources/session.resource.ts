import { Session } from "../models/session.model";
import { SessionDao } from "../daos/session.dao";
import { Lesson } from "../models/lesson.model";

export class SessionResource {
    private sessionDao: SessionDao;

    constructor() {
        this.sessionDao = new SessionDao();
    }

    async create(name: string, itineraryId: string): Promise<Session> {
        return await this.sessionDao.create(name);
    }
    async findById(id: string): Promise<Session> {
        return await this.sessionDao.findById(id);
    }
    async delete(session: Session): Promise<boolean> {
        return await this.sessionDao.delete(session.getId());
    }
    async update(id: string, name: string): Promise<Session> {
        let session: Session = await this.findById(id);
        session = session ? await this.sessionDao.update(id, name) : undefined;
        return session;
    }
}