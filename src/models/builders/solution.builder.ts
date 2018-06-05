import { Solution } from "../solution.model";
import { Justification } from "../justification.model";

export class SolutionBuilder {
    private solution: Solution;

    constructor(text: string, isCorrect: boolean) {
        this. solution = new Solution(text, isCorrect);
    }

    setId(id: number): SolutionBuilder {
        this.solution.setId(id);
        return this;
    }
    setText(text: string): SolutionBuilder {
        this.solution.setText(text);
        return this;
    }
    setICorrect(isCorrect: boolean): SolutionBuilder {
        this.solution.setIsCorrect(isCorrect);
        return this;
    }
    setJustification(justifications: Justification[]): SolutionBuilder {
        this.solution.setJustifications(justifications);
        return this;
    }
    build(): Solution {
        return this.solution;
    }
}