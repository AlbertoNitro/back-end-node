import { Document } from "mongoose";
import logger from "../util/logger";
import {Session} from "../../models/session.model";

export class SessionDao {
    constructor() {
    }

    private static toSession(document: Document): Session {
        return new SessionBuilder().setId(document.get("_id")).setText(document.get("text")).setIsCorrect(document.get("isCorrect")).build();
    }
    private static toArraySessions(documents: Document[]): Session[] {
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
    async create(isCorrect: boolean, text: string): Promise<Session> {
        const session: Session = new SessionBuilder().setIsCorrect(isCorrect).setText(text).build();
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
