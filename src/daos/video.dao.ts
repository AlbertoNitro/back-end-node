import { Document } from "mongoose";
import { Video } from "../models/video.model";
import VideoSchema from "../schemas/video.schema";
import logger from "../utils/logger";
import { ConverterDocumentsToModelsService } from "../services/converterDocumentsToModels.service";

export class VideoDao {
    constructor() {
    }

    async delete(id: string): Promise<boolean> {
        return await VideoSchema.deleteOne({_id: id })
            .then( () => {
                return true;
            })
            .catch ( err => {
                logger.error(err);
                return false;
            });
    }
    async findById(id: string): Promise<Video> {
        return await VideoSchema.findById(id)
            .then( (videoDocument: Document) => {
                const video: Video = videoDocument ? ConverterDocumentsToModelsService.toVideo(videoDocument) : undefined;
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
            .then((videoDocument: Document) => {
                const video: Video = videoDocument ? ConverterDocumentsToModelsService.toVideo(videoDocument) : undefined;
                return video;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async update(id: string, url: string): Promise<Video> {
        return await VideoSchema.findOneAndUpdate({ _id: id }, { $set: {url: url} }, { new: true })
            .then(async (videoDocument: Document) => {
                const updatedVideo: Video = videoDocument ? ConverterDocumentsToModelsService.toVideo(videoDocument) : undefined;
                return updatedVideo;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
}
