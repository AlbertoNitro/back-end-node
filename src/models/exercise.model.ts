import { Solution } from "./solution.model";

export class Exercise  {
    private _id: number;
    private formulation: string;
    private solutions: Solution[];

    constructor() {
    }

    setId(id: number) {
        this._id = id;
    }
    setFormulation(formulation: string) {
        this.formulation = formulation;
    }
    setSolutions(solutions: Solution[]) {
        this.solutions = solutions;
    }
    getId(): number {
        return this._id;
    }
    getFormulation(): string {
        return this.formulation;
    }
    getSolutions(): Solution[] {
        return this.solutions;
    }
}
