import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/http-status-codes.enum";
import logger from "../utils/logger";
import { LessonResource } from "../resources/lesson.resource";
import { Lesson } from "../models/lesson.model";
import { LessonOutputDto } from "../dtos/output/lessonOutput.dto";
import { LessonInputDto } from "../dtos/input/lessonInput.dto";
import { ConverterModelsToDtosService } from "../services/converterModelsToDtos.service";

export class LessonController {
    private lessonResource: LessonResource;
    private converterModelsToDtosService: ConverterModelsToDtosService;

    constructor() {
        this.lessonResource = new LessonResource();
        this.converterModelsToDtosService = new ConverterModelsToDtosService();
    }

    async create(req: Request, res: Response): Promise<any> {
        const lessonInputDto: LessonInputDto = req.body;
        const lesson: Lesson = await this.lessonResource.create(lessonInputDto.sessionId, lessonInputDto.name);
        const lessonOutputDto: LessonOutputDto = this.converterModelsToDtosService.toLessonOutputDto(lesson);
        lesson ? res.status(HttpStatusCode.CREATED).json(lessonOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async findById(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const lesson: Lesson = await this.lessonResource.findById(id);
        const lessonOutputDto: LessonOutputDto = this.converterModelsToDtosService.toLessonOutputDto(lesson);
        lesson ? res.status(HttpStatusCode.OK).json(lessonOutputDto) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async delete(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const lesson: Lesson = await this.lessonResource.findById(id);
        if (lesson) {
            const success: boolean = await this.lessonResource.delete(lesson);
            success ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }
    async update(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        let lesson: Lesson = await this.lessonResource.findById(id);
        logger.info(JSON.stringify(lesson));
        if (lesson) {
            const lessonInputDto: LessonInputDto = req.body;
            lesson = await this.lessonResource.update(id, lessonInputDto.name);
            logger.info(JSON.stringify(lesson));
            const lessonOutputDto: LessonOutputDto = this.converterModelsToDtosService.toLessonOutputDto(lesson);
            lesson ? res.status(HttpStatusCode.OK).json(lessonOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }
}
