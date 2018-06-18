import { LessonDao } from "../daos/lesson.dao";
import { Lesson } from "../models/lesson.model";
import { Interaction } from "../models/interaction.model";

export class LessonResource {
    private lessonDao: LessonDao;

    constructor() {
        this.lessonDao = new LessonDao();
    }

    async create(sessionId: string, name: string): Promise<Lesson> {
        return await this.lessonDao.create(name);
    }
    async findById(id: string): Promise<Lesson> {
        return await this.lessonDao.findById(id);
    }
    async delete(lesson: Lesson): Promise<boolean> {
        return await this.lessonDao.delete(lesson.getId());
    }
    async update(id: string, name: string): Promise<Lesson> {
        let lesson: Lesson = await this.findById(id);
        lesson = lesson ? await this.lessonDao.update(id, name) : undefined;
        return lesson;
    }
}
