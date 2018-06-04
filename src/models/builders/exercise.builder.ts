import { Exercise } from "../exercise.model";
import { Solution } from "../solution.model";

export class ExerciseBuilder {
    private video: Exercise;

    constructor(formulation: string) {
        this.video = new Exercise(formulation);
    }

    setFormulation(formulation: string): ExerciseBuilder {
        this.video.setFormulation(formulation);
        return this;
    }
    setSolution(solutions: Solution[]) {
        this.video.setSolutions(solutions);
    }
    build(): Exercise {
        return this.video;
    }
}