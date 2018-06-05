import { Request, Response } from "express";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import logger from "../util/logger";
import { LessonResource } from "../resources/lesson.resource";
import { Lesson } from "../models/lesson.model";
import { DtoService } from "../services/dto.service";
import { LessonOutputDto } from "../dtos/lessonOutput.dto";

export class LessonController {
    private lessonResource: LessonResource;

    constructor() {
        this.lessonResource = new LessonResource();
    }

    async create(req: Request, res: Response): Promise<any> {
        const name: string = req.body.name;
        const lesson: Lesson = await this.lessonResource.create(name);
        const lessonOutputDto: LessonOutputDto = DtoService.toLessonOutputDto(lesson);
        lesson ? res.status(HttpStatusCode.CREATED).json(lessonOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async findById(req: Request, res: Response): Promise<any> {
        const id: number = req.params.id;
        const lesson: Lesson = await this.lessonResource.findById(id);
        const lessonOutputDto: LessonOutputDto = DtoService.toLessonOutputDto(lesson);
        lesson ? res.status(HttpStatusCode.OK).json(lessonOutputDto) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async delete(req: Request, res: Response): Promise<any> {
        const id: number = req.params.id;
        const lesson: Lesson = await this.lessonResource.findById(id);
        if (lesson) {
            const success: boolean = await this.lessonResource.delete(lesson);
            success ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }

}
