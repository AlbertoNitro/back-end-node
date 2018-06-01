export class Justification {
    private _id: number;
    private isCorrect: boolean;
    private text: string;

    constructor(text: string, isCorrect: boolean) {
        this.text = text;
        this.isCorrect = isCorrect;
    }

    public setId(id: number): Justification {
        this._id = id;
        return this;
    }
    public setIsCorrect(id: number): Justification {
        this._id = id;
        return this;
    }
    public setText(id: number): Justification {
        this._id = id;
        return this;
    }
    public getId(): number {
        return this._id;
    }
    public getIsCorrect(): number {
        return this._id;
    }
    public getText(): number {
        return this._id;
    }
}
