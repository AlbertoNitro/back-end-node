import { Justification } from "./justification.model";

export class Solution  {
    private _id: number;
    private isCorrect: boolean;
    private text: string;
    private justification: Justification;

    constructor() {
    }
    setId(id: number) {
        this._id = id;
    }
    setIsCorrect(isCorrect: boolean) {
        this.isCorrect = isCorrect;
    }
    setText(text: string) {
        this.text = text;
    }
    setJustification(justification: Justification) {
        this.justification = justification;
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
    getJustification(): Justification {
        return this.justification;
    }
}
