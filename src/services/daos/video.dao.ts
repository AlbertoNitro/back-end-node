import { Document } from "mongoose";
import logger from "../util/logger";
import { Video } from "../../models/video.model";
import VideoSchema from "../../schemas/video.schema";

export class VideoDao {
    constructor() {
    }
    private static toVideo(document: Document): Video {
        return new VideoBuilder().setId(document.get("_id")).setText(document.get("text")).setIsCorrect(document.get("isCorrect")).build();
    }
    private static toArrayVideos(documents: Document[]): Video[] {
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
    async create(isCorrect: boolean, text: string): Promise<Video> {
        const video: Video = new VideoBuilder().setIsCorrect(isCorrect).setText(text).build();
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
