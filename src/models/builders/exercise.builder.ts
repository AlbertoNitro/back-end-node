import { Exercise } from "../exercise.model";

export class ExerciseBuilder {
    private exercise: Exercise;

    constructor(formulation: string) {
        this.exercise = new Exercise(formulation);
    }

    setFormulation(formulation: string): ExerciseBuilder {
        this.exercise.setFormulation(formulation);
        return this;
    }
    setSolutions(solutions: string): ExerciseBuilder {
        this.exercise.setSolutions(solutions);
        return this;
    }
    setId(id: string): ExerciseBuilder {
        this.exercise.setId(id);
        return this;
    }
    build(): Exercise {
        return this.exercise;
    }
}