import { Interaction } from "./interaction.model";
import { InteractionVisitor } from "./interaction.visitor";

export class Exercise extends Interaction {
    private _id: string;
    private formulation: string;
    private solutions: string;

    constructor(formulation: string) {
        super();
        this.formulation = formulation;
        this.solutions = "[]";
    }

    setId(id: string): Exercise {
        this._id = id;
        return this;
    }
    setFormulation(formulation: string): Exercise {
        this.formulation = formulation;
        return this;
    }
    setSolutions(solutions: string): Exercise {
        this.solutions = solutions;
        return this;
    }
    getId(): string {
        return this._id;
    }
    getFormulation(): string {
        return this.formulation;
    }
    getSolutions(): string {
        return this.solutions;
    }
    accept(interactionVisitor: InteractionVisitor): void {
        interactionVisitor.visitExercise(this);
    }
}
