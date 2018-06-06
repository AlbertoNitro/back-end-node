import { Document } from "mongoose";
import { Session } from "../../models/session.model";
import SessionSchema from "../../schemas/session.schema";
import { LessonDao } from "./lesson.dao";
import { Lesson } from "../../models/lesson.model";
import logger from "../../util/logger";

export class SessionDao {
    constructor() {
    }

    public static toSession(document: Document): Session {
        return new Session(document.get("name")).setId(document.get("_id").setLessons(LessonDao.toArrayLessons(document.get("lessons"))));
    }
    public static toArraySessions(documents: Document[]): Session[] {
        const sessions: Session[] = [];
        for (let i = 0; i < documents.length; i++) {
            sessions.push(SessionDao.toSession(documents[i]));
        }
        return sessions;
    }
    async delete(id: number): Promise<boolean> {
        return await SessionSchema.deleteOne({_id: id })
            .then( () => {
                return true;
            })
            .catch ( err => {
                logger.error(err);
                return false;
            });
    }
    async findById(id: number): Promise<Session> {
        return await SessionSchema.findById(id)
            .then( (sessionDocument: Document) => {
                const session: Session = sessionDocument ? SessionDao.toSession(sessionDocument) : undefined;
                return session;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(name: string): Promise<Session> {
        const session: Session = new Session(name);
        const sessionSchema = new SessionSchema(session);
        return sessionSchema.save()
            .then( (sessionDocument: Document) => {
                const session: Session = sessionDocument ? SessionDao.toSession(sessionDocument) : undefined;
                return session;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }

}
