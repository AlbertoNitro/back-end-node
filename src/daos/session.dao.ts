import { Document } from "mongoose";
import { Session } from "../models/session.model";
import SessionSchema from "../schemas/session.schema";
import logger from "../utils/logger";
import { SessionBuilder } from "../models/builders/session.builder";
import { ConverterDocumentsToModelsService } from "../services/converterDocumentsToModels.service";

export class SessionDao {
    constructor() {
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
                const session: Session = sessionDocument ? ConverterDocumentsToModelsService.toSession(sessionDocument) : undefined;
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
                const session: Session = sessionDocument ? ConverterDocumentsToModelsService.toSession(sessionDocument) : undefined;
                return session;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async update(id: string, name: string): Promise<Session> {
        return await SessionSchema.findOneAndUpdate({ _id: id }, { $set: {name: name }}, { new: true })
            .then(async () => {
                const session: Session = await this.findById(id);
                return session;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async updateLessons(id: string, lessonsIds: string[]): Promise<Session> {
        return await SessionSchema.findOneAndUpdate({ _id: id }, { $set: {lessons: lessonsIds }}, { new: true })
            .then(async () => {
                const session: Session = await this.findById(id);
                return session;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
}
