import { Unit } from "../unit.model";
import { Video } from "../video.model";

export class VideoBuilder {
    private video: Video;

    constructor(url: string) {
        this.video = new Video(url);
    }

    setUrl(url: string): VideoBuilder {
        this.video.setUrl(url);
        return this;
    }
    setId(id: number): VideoBuilder {
        this.video.setId(id);
        return this;
    }
    build(): Video {
        return this.video;
    }
}