export class Justification  {
    private _id: number;
    private isCorrect: boolean;
    private text: string;

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
    getId(): number {
        return this._id;
    }
    getIsCorrect(): boolean {
        return this.isCorrect;
    }
    getText(): string {
        return this.text;
    }
}
