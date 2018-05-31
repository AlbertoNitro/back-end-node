import { Justification } from "./justification.model";

export class Solution {
    private _id: number;
    private isCorrect: boolean;
    private text: string;
    private justifications: Justification[];

    constructor(text: string, isCorrect: boolean) {
        this.text = text;
        this.isCorrect = isCorrect;
        this.justifications = [];
    }

    setId(id: number): Solution {
        this._id = id;
        return this;
    }
    setIsCorrect(isCorrect: boolean): Solution {
        this.isCorrect = isCorrect;
        return this;
    }
    setText(text: string): Solution {
        this.text = text;
        return this;
    }
    setJustifications(justifications: Justification[]): Solution {
        this.justifications = justifications;
        return this;
    }
    getId(): number {
        return this._id;
    }
    getIsCorrect(): boolean {
        return this.isCorrect;
    }
    getText(): string {
        return this.text;
    }
    getJustifications(): Justification[] {
        return this.justifications;
    }
}
