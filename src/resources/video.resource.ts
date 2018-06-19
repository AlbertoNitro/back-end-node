import { Video } from "../models/video.model";
import { VideoDao } from "../daos/video.dao";
import { LessonResource } from "./lesson.resource";
import logger from "../utils/logger";

export class VideoResource {
    private videoDao: VideoDao;
    private lessonResource: LessonResource;

    constructor() {
        this.videoDao = new VideoDao();
        this.lessonResource = new LessonResource();
    }

    async create(lessonId: string, url: string): Promise<Video> {
        const video: Video = await this.videoDao.create(url);
        await this.lessonResource.updateInteractions(lessonId, video.getId());
        return video;
    }
    async findById(id: string): Promise<Video> {
        return await this.videoDao.findById(id);
    }
    async delete(video: Video): Promise<boolean> {
        return await this.videoDao.delete(video.getId());
    }
    async update(id: string, url: string): Promise<Video> {
        return await this.videoDao.update(id, url);
    }
}