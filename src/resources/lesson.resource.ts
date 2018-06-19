import { LessonDao } from "../daos/lesson.dao";
import { Lesson } from "../models/lesson.model";
import { Interaction } from "../models/interaction.model";
import { InteractionVisitor } from "../models/interaction.visitor";
import { Video } from "../models/video.model";
import { Exercise } from "../models/exercise.model";
import logger from "../utils/logger";
import { SessionResource } from "./session.resource";

export class LessonResource implements InteractionVisitor {
    private lessonDao: LessonDao;
    private interactionId: string;
    private sessionResource: SessionResource;

    constructor() {
        this.lessonDao = new LessonDao();
        this.sessionResource = new SessionResource();
    }

    async create(sessionId: string, name: string): Promise<Lesson> {
        const lesson: Lesson = await this.lessonDao.create(name);
        await this.sessionResource.updateLessons(sessionId, lesson.getId());
        return lesson;
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
        let interactionsIds: string[];
        if (lesson) {
            interactionsIds = this.getInteractionsIds(lesson);
            const idToSearch: string = interactionsIds.find(element => {
                return interactionId === element;
            });
            if (idToSearch) {
                const index = interactionsIds.indexOf(interactionId);
                interactionsIds.splice(index, 1);
            } else {
                interactionsIds.push(interactionId);
            }
        }
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
        this.interactionId = video.getId();
    }
    visitExercise(exercise: Exercise): void {
        this.interactionId = exercise.getId();
    }
}
