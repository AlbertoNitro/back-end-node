import { LessonDao } from "../daos/lesson.dao";
import { Lesson } from "../models/lesson.model";
import { Interaction } from "../models/interaction.model";
import { InteractionVisitor } from "../models/interaction.visitor";
import { Video } from "../models/video.model";
import { Exercise } from "../models/exercise.model";
import logger from "../utils/logger";

export class LessonResource implements InteractionVisitor {
    private lessonDao: LessonDao;
    private interactionId: string;

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
        logger.info(JSON.stringify(lesson));
        let interactionsIds: string[];
        if (lesson) {
            logger.info("Existe lesson");
            logger.info("soy video/exercise y mi id es: " + interactionId);
            interactionsIds = this.getInteractionsIds(lesson);
            logger.info("ids de la lesson " + JSON.stringify(interactionsIds));
            const idToSearch: string = interactionsIds.find(element => {
                return interactionId === element;
            });
            if (idToSearch) {
                logger.info("Ya tenia yo ese id");
                const index = interactionsIds.indexOf(interactionId);
                interactionsIds.splice(index, 1);
            } else {
                logger.info("Insertando id nuevo en el array polimorfico");
                interactionsIds.push(interactionId);
            }
        }
        logger.info("array con ids a actualizar " + JSON.stringify(interactionsIds));
        lesson = lesson ? await this.lessonDao.updateInteractions(id, interactionsIds) : undefined;
        return lesson;
    }
    private getInteractionsIds(lesson: Lesson) {
        const ids: string[] = [];
        const interactions: Interaction[] = lesson.getInteractions();
        for (let i = 0; i < interactions.length; i++) {
            interactions[i].accept(this);
            ids.push(this.interactionId);
        }
        return ids;
    }
    visitVideo(video: Video): void {
        logger.info(JSON.stringify(video));
        this.interactionId = video.getId();
    }
    visitExercise(exercise: Exercise): void {
        logger.info(JSON.stringify(exercise));
        this.interactionId = exercise.getId();
    }
}
