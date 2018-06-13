import { Document } from "mongoose";
import { Session } from "../models/session.model";
import SessionSchema from "../schemas/session.schema";
import { LessonDao } from "./lesson.dao";
import { Lesson } from "../models/lesson.model";
import logger from "../utils/logger";
import { SessionBuilder } from "../models/builders/session.builder";
import LessonSchema from "../schemas/lesson.schema";

export class SessionDao {
    constructor() {
    }

    static toSession(document: Document): Session {
        return new SessionBuilder(document.get("name")).setId(document.get("_id")).setLessons(LessonDao.toArrayLessons(document.get("lessons"))).build();
    }
    static toArraySessions(documents: Document[]): Session[] {
        const sessions: Session[] = [];
        for (let i = 0; i < documents.length; i++) {
            sessions.push(SessionDao.toSession(documents[i]));
        }
        return sessions;
    }
    async delete(id: string): Promise<boolean> {
        return await SessionSchema.deleteOne({_id: id })
            .then( () => {
                return true;
            })
            .catch ( err => {
                logger.error(err);
                return false;
            });
    }
    async findById(id: string): Promise<Session> {
        return await SessionSchema.findById(id)
            .then(async(sessionDocument: Document) => {
                const sessionPopulate: any = await LessonSchema.populate(sessionDocument, {path: "lessons", model: "Lesson", populate: {path: "interactions", model: "Interaction", populate: {path: "solutions", model: "Solution", populate: {path: "justifications", model: "Justification"}}}});
                const session: Session = sessionPopulate ? SessionDao.toSession(sessionPopulate) : undefined;
                return session;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(name: string): Promise<Session> {
        const session: Session = new SessionBuilder(name).build();
        const sessionSchema = new SessionSchema(session);
        return sessionSchema.save()
            .then(async(sessionDocument: Document) => {
                const sessionPopulate: any = await LessonSchema.populate(sessionDocument, {path: "lessons", model: "Lesson", populate: {path: "interactions", model: "Interaction", populate: {path: "solutions", model: "Solution", populate: {path: "justifications", model: "Justification"}}}});
                const session: Session = sessionPopulate ? SessionDao.toSession(sessionPopulate) : undefined;
                return session;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async update(id: string, lessons: Lesson[]): Promise<Session> {
        return await SessionSchema.updateOne({_id: id}, {$set: {lessons: lessons}}, {new: true})
            .then(async(sessionDocument: Document) => {
                const sessionPopulate: any = await LessonSchema.populate(sessionDocument, {path: "lessons", model: "Lesson", populate: {path: "interactions", populate: {path: "solutions", model: "Solution", populate: {path: "justifications", model: "Justification"}}}});
                const session: Session = sessionPopulate ? SessionDao.toSession(sessionPopulate) : undefined;
                return session;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
}
