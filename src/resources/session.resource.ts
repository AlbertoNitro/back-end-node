import { Session } from "../models/session.model";
import { SessionDao } from "../daos/session.dao";
import { Lesson } from "../models/lesson.model";
import { ItineraryResource } from "./itinerary.resource";

export class SessionResource {
    private sessionDao: SessionDao;
    private itineraryResource: ItineraryResource;

    constructor() {
        this.sessionDao = new SessionDao();
        this.itineraryResource = new ItineraryResource();
    }

    async create(name: string, itineraryId: string): Promise<Session> {
        const session: Session = await this.sessionDao.create(name);
        await this.itineraryResource.updateFormations(itineraryId, session.getId());
        return session;
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
    async updateLessons(id: string, lessonId: string): Promise<Session> {
        let session: Session = await this.findById(id);
        let lessonsIds: string[];
        if (session) {
            lessonsIds = this.getLessonsIds(session);
            const idToSearch: string = lessonsIds.find(element => {
                return lessonId === element;
            });
            if (idToSearch) {
                const index = lessonsIds.indexOf(lessonId);
                lessonsIds.splice(index, 1);
            } else {
                lessonsIds.push(lessonId);
            }
        }
        session = session ? await this.sessionDao.updateLessons(id, lessonsIds) : undefined;
        return session;
    }
    private getLessonsIds(session: Session) {
        const ids: string[] = [];
        const lessons: Lesson[] = session.getLessons();
        for (let i = 0; i < lessons.length; i++) {
            ids.push(lessons[i].getId());
        }
        return ids;
    }
}