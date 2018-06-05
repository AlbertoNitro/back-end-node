import { Exercise } from "../exercise.model";
import { Solution } from "../solution.model";

export class ExerciseBuilder {
    private exercise: Exercise;

    constructor(formulation: string) {
        this.exercise = new Exercise(formulation);
    }

    setFormulation(formulation: string): ExerciseBuilder {
        this.exercise.setFormulation(formulation);
        return this;
    }
    setSolution(solutions: Solution[]) {
        this.exercise.setSolutions(solutions);
        return this;
    }
    setId(id: number) {
        this.exercise.setId(id);
        return this;
    }
    setKind(kind: string): ExerciseBuilder {
        this.exercise.setKind(kind);
        return this;
    }
    build(): Exercise {
        return this.exercise;
    }
}