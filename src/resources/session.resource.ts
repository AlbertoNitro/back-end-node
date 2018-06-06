import { Session } from "../models/session.model";
import { SessionDao } from "../services/daos/session.dao";
import { Lesson } from "../models/lesson.model";

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
    async update(id: number, lessons: Lesson[]): Promise<Session> {
        let session: Session = await this.findById(id);
        session = session ? await this.sessionDao.update(id, lessons) : undefined;
        return session;
    }
}