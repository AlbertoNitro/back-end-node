import { LessonsItinerary } from "./lessonsItinerary.model";

export class Session  {
    private _id: number;
    private name: string;
    private lessonsItineraries: LessonsItinerary[];

    constructor(name: string) {
        this.name = name;
    }

    setId(id: number) {
        this._id = id;
    }
    setName(name: string) {
        this.name = name;
    }
    setLessonsItineraries(lessonsItinerary: LessonsItinerary[]) {
        this.lessonsItineraries = lessonsItinerary;
    }
    getId(): number {
        return this._id;
    }
    getName(): string {
        return this.name;
    }
    getLessonsItinerary(): LessonsItinerary[] {
        return this.lessonsItineraries;
    }
}
