import { LessonDao } from "../services/daos/lesson.dao";
import { Lesson } from "../models/lesson.model";

export class LessonResource {
    private lessonDao: LessonDao;

    constructor() {
        this.lessonDao = new LessonDao();
    }

    async create(name: string): Promise<Lesson> {
        return await this.lessonDao.create(name);
    }
    async findById(id: number): Promise<Lesson> {
        return await this.lessonDao.findById(id);
    }
    async delete(lesson: Lesson): Promise<boolean> {
        return await this.lessonDao.delete(lesson.getId());
    }
}
