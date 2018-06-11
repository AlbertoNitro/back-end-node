export class Justification {
    private _id: string;
    private isCorrect: boolean;
    private text: string;

    constructor(text: string, isCorrect: boolean) {
        this.text = text;
        this.isCorrect = isCorrect;
    }

    public setId(id: string): Justification {
        this._id = id;
        return this;
    }
    public setIsCorrect(isCorrect: boolean): Justification {
        this.isCorrect = isCorrect;
        return this;
    }
    public setText(text: string): Justification {
        this.text = text;
        return this;
    }
    public getId(): string {
        return this._id;
    }
    public getIsCorrect(): boolean {
        return this.isCorrect;
    }
    public getText(): string {
        return this.text;
    }
}
