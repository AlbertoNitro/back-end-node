import { Document } from "mongoose";
import logger from "../../util/logger";
import { Lesson } from "../../models/lesson.model";
import LessonSchema from "../../schemas/lesson.schema";
import { Interaction } from "../../models/interaction.model";
import { InteractionDao } from "./interaction.dao";

export class LessonDao {
    constructor() {
    }

    public static toLesson(document: Document): Lesson {
        return new Lesson(document.get("name")).setId(document.get("_id").setInteractions(InteractionDao.toArrayInteraction(document.get("interactions"))));
    }
    public  static toArrayLessons(documents: Document[]): Lesson[] {
        const lessons: Lesson[] = [];
        for (let i = 0; i < documents.length; i++) {
            lessons.push(LessonDao.toLesson(documents[i]));
        }
        return lessons;
    }
    async delete(id: number): Promise<boolean> {
        return await LessonSchema.deleteOne({_id: id })
            .then( () => {
                return true;
            })
            .catch ( err => {
                logger.error(err);
                return false;
            });
    }
    async findById(id: number): Promise<Lesson> {
        return await LessonSchema.findById(id)
            .then( (lessonDocument: Document) => {
                const lesson: Lesson = lessonDocument ? LessonDao.toLesson(lessonDocument) : undefined;
                return lesson;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(name: string, interactions: Interaction[]): Promise<Lesson> {
        const lesson: Lesson = new Lesson(name).setInteractions(interactions);
        const lessonSchema = new LessonSchema(lesson);
        return lessonSchema.save()
            .then( (lessonDocument: Document) => {
                const lesson: Lesson = lessonDocument ? LessonDao.toLesson(lessonDocument) : undefined;
                return lesson;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
}
