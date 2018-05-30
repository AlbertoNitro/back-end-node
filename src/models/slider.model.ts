export class Slider {
    private _id: number;

    constructor() {
    }

    setId(id: number) {
        this._id = id;
    }
    getId(): number {
        return this._id;
    }
}
