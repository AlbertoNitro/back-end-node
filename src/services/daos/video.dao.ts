import { Document } from "mongoose";
import { Video } from "../../models/video.model";
import VideoSchema from "../../schemas/video.schema";
import logger from "../../util/logger";

export class VideoDao {
    constructor() {
    }
    public static toVideo(document: Document): Video {
        return new Video(document.get("url")).setId(document.get("_id"));
    }
    public static toArrayVideos(documents: Document[]): Video[] {
        const videos: Video[] = [];
        for (let i = 0; i < documents.length; i++) {
            videos.push(VideoDao.toVideo(documents[i]));
        }
        return videos;
    }
    async delete(id: number): Promise<boolean> {
        return await VideoSchema.deleteOne({_id: id })
            .then( () => {
                return true;
            })
            .catch ( err => {
                logger.error(err);
                return false;
            });
    }
    async findById(id: number): Promise<Video> {
        return await VideoSchema.findById(id)
            .then( (videoDocument: Document) => {
                const video: Video = videoDocument ? VideoDao.toVideo(videoDocument) : undefined;
                return video;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(url: string): Promise<Video> {
        const video: Video = new Video(url);
        const videoSchema = new VideoSchema(video);
        return videoSchema.save()
            .then( (videoDocument: Document) => {
                const video: Video = videoDocument ? VideoDao.toVideo(videoDocument) : undefined;
                return video;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
}
