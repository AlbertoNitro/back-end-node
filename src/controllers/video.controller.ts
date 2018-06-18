import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/http-status-codes.enum";
import { Video } from "../models/video.model";
import { VideoResource } from "../resources/video.resource";
import { DtoService } from "../services/dto.service";
import { VideoOutputDto } from "../dtos/output/videoOutput.dto";
import logger from "../utils/logger";
import { VideoInputDto } from "../dtos/input/videoInput.dto";

export class VideoController {
    private videoResource: VideoResource;
    private dtoService: DtoService;

    constructor() {
        this.videoResource = new VideoResource();
        this.dtoService = new DtoService();
    }

    async create(req: Request, res: Response): Promise<any> {
        const videoInputDto: VideoInputDto = req.body;
        const video: Video = await this.videoResource.create(videoInputDto.lessonId, videoInputDto.url);
        const videoOutputDto: VideoOutputDto = this.dtoService.toVideoOutputDto(video);
        video ? res.status(HttpStatusCode.CREATED).json(videoOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async findById(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const video: Video = await this.videoResource.findById(id);
        const videoOutputDto: VideoOutputDto = this.dtoService.toVideoOutputDto(video);
        video ? res.status(HttpStatusCode.OK).json(videoOutputDto) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async delete(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const video: Video = await this.videoResource.findById(id);
        if (video) {
            const success: boolean = await this.videoResource.delete(video);
            success ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }
    async update(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const videoInputDto: VideoInputDto = req.body;
        const video: Video = await this.videoResource.findById(id);
        if (video) {
            const video: Video = await this.videoResource.update(id, videoInputDto.lessonId, videoInputDto.url);
            const videoOutputDto: VideoOutputDto = this.dtoService.toVideoOutputDto(video);
            video ? res.status(HttpStatusCode.OK).json(videoOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }
}
