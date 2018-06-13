import { Video } from "../models/video.model";
import { VideoDao } from "../daos/video.dao";

export class VideoResource {
    private videoDao: VideoDao;

    constructor() {
        this.videoDao = new VideoDao();
    }

    async create(url: string): Promise<Video> {
        return await this.videoDao.create(url);
    }
    async findById(id: string): Promise<Video> {
        return await this.videoDao.findById(id);
    }
    async delete(video: Video): Promise<boolean> {
        return await this.videoDao.delete(video.getId());
    }
}