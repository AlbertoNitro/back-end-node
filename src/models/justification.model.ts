export class Justification  {
    private _id: number;
    private isCorrect: boolean;
    private text: boolean;
    constructor() {
    }
    public setId(id: number) {
        this._id = id;
    }
    public getId(): number {
        return this._id;
    }

    public setIsCorrect(id: number) {
        this._id = id;
    }
    public getIsCorrect(): number {
        return this._id;
    }

    public setText(id: number) {
        this._id = id;
    }
    public getText(): number {
        return this._id;
    }
}
