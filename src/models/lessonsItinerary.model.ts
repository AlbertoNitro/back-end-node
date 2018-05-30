export class LessonsItinerary  {
    private _id: number;

    constructor() {
    }
    public setId(id: number) {
        this._id = id;
    }
    public getId(): number {
        return this._id;
    }
}
