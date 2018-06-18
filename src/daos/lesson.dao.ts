import { Document } from "mongoose";
import logger from "../utils/logger";
import { Lesson } from "../models/lesson.model";
import LessonSchema from "../schemas/lesson.schema";
import { Interaction } from "../models/interaction.model";
import { VideoDao } from "./video.dao";
import { ExerciseDao } from "./exercise.dao";
import { LessonBuilder } from "../models/builders/lesson.builder";
import InteractionSchema from "../schemas/interaction.schema";

export class LessonDao {
    constructor() {
    }

    static toLesson(document: Document): Lesson {
        const interactions: Interaction[] = [];
        const interactionsDocuments: Document[] = document.get("interactions");
        for (let i = 0 ; i < interactionsDocuments.length ; i++) {
            const interactionDocument: Document = interactionsDocuments[i];
            interactionDocument.get("kind") === "Video" ? interactions.push(VideoDao.toVideo(interactionDocument)) : interactions.push(ExerciseDao.toExercise(interactionDocument));
        }
        const lesson: Lesson = new LessonBuilder(document.get("name")).setId(document.get("_id")).setInteractions(interactions).build();
        return lesson;
    }
    static toArrayLessons(documents: Document[]): Lesson[] {
        const lessons: Lesson[] = [];
        for (let i = 0; i < documents.length; i++) {
            lessons.push(LessonDao.toLesson(documents[i]));
        }
        return lessons;
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
                const lesson: Lesson = lessonDocument ? LessonDao.toLesson(lessonDocument) : undefined;
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
                const lesson: Lesson = lessonDocument ? LessonDao.toLesson(lessonDocument) : undefined;
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
    async updateInteractions(id: string, interactionId: string): Promise<Lesson> {
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
}
