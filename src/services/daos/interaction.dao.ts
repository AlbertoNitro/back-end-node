import { Document } from "mongoose";
import { Video } from "../../models/video.model";
import VideoSchema from "../../schemas/video.schema";
import logger from "../../util/logger";

export class InteractionDao {
    constructor() {
    }
    // public static toInteraction(document: Document): Video {
    //     return new Video(document.get("url")).setId(document.get("_id"));
    // }
    // public static toArrayInteractions(documents: Document[]): Video[] {
    //     const videos: Video[] = [];
    //     for (let i = 0; i < documents.length; i++) {
    //         videos.push(VideoDao.toVideo(documents[i]));
    //     }
    //     return videos;
    // }
}
