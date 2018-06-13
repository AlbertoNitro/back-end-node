import { Video } from "./video.model";
import { Exercise } from "./exercise.model";

export interface InteractionVisitor {
    visitVideo(video: Video): void;
    visitExercise(exercise: Exercise): void;
}