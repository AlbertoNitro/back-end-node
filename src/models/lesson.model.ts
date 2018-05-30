import { Exercise } from "./exercise.model";
import { Slider } from "./slider.model";
import { Video } from "./video.model";

export class Lesson  {
    private _id: number;
    private name: string;
    private sliders: Slider[];
    private videos: Video[];
    private exercises: Exercise[];

    constructor(name: string) {
        this.name = name;
    }

    setId(id: number) {
        this._id = id;
    }
    setName(name: string) {
        this.name = name;
    }
    setSliders(sliders: Slider[]) {
        this.sliders = sliders;
    }
    setVideos(videos: Video[]) {
        this.videos = videos;
    }
    setExercises(exercises: Exercise[]) {
        this.exercises = exercises;
    }
    getId(): number {
        return this._id;
    }
    getName(): string {
        return this.name;
    }
    getSliders(): Slider[] {
        return this.sliders;
    }
    getVideos(): Video[] {
        return this.videos;
    }
    getExercises(): Exercise[] {
        return this.exercises;
    }
}
