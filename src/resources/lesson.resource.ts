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
    async updateInteractions(id: string, interactionId: string): Promise<Lesson> {
        let lesson: Lesson = await this.findById(id);
        // Haz esto ALBERTO para el borrar (que se puede quedar mal y comentar a luis) esta ya pensado bien
        // Obtener todos los id's de las interactions
        // Si el interactionId no existe, entonces lo añadimos al array
        // SINO lo eliminamos del array
        lesson = lesson ? await this.lessonDao.updateInteractions(id, interactionId) : undefined;
        return lesson;
    }
}
