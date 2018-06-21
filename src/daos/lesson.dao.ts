import { Document } from "mongoose";
import logger from "../utils/logger";
import { Lesson } from "../models/lesson.model";
import LessonSchema from "../schemas/lesson.schema";
import { LessonBuilder } from "../models/builders/lesson.builder";
import { ConverterDocumentsToModelsService } from "../services/converterDocumentsToModels.service";

export class LessonDao {
    constructor() {
    }

    async delete(id: string): Promise<boolean> {
        return await LessonSchema.deleteOne({_id: id })
            .then( () => {
                return true;
            })
            .catch ( err => {
                logger.error(err);
                return false;
            });
    }
    async findById(id: string): Promise<Lesson> {
        return await LessonSchema.findById(id)
            .then(async(lessonDocument: Document) => {
                const lesson: Lesson = lessonDocument ? ConverterDocumentsToModelsService.toLesson(lessonDocument) : undefined;
                return lesson;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(name: string): Promise<Lesson> {
        const lesson: Lesson = new LessonBuilder(name).build();
        const lessonSchema = new LessonSchema(lesson);
        return lessonSchema.save()
            .then(async(lessonDocument: Document) => {
                const lesson: Lesson = lessonDocument ? ConverterDocumentsToModelsService.toLesson(lessonDocument) : undefined;
                return lesson;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async update(id: string, name: string): Promise<Lesson> {
        return await LessonSchema.findOneAndUpdate({ _id: id }, { $set: {name: name }}, { new: true })
            .then(async () => {
                const lesson: Lesson = await this.findById(id);
                return lesson;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async updateInteractions(id: string, interactionsIds: string[]): Promise<Lesson> {
        return await LessonSchema.findOneAndUpdate({ _id: id }, { $set: {interactions: interactionsIds }}, { new: true })
            .then(async () => {
                const lesson: Lesson = await this.findById(id);
                return lesson;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
}
