import { Itinerary } from "./itinerary.model";

export class Unit {
    private _id: string;
    private name: string;
    private code: number;
    private content: string;
    private itineraries: Itinerary[];

    constructor(name: string) {
        this.name = name;
        this.itineraries = [];
    }

    setId(id: string) {
        this._id = id;
    }
    setName(name: string) {
        this.name = name;
    }
    setCode(code: number) {
        this.code = code;
    }
    setContent(content: string) {
        this.content = content;
    }
    setItineraries(itineraries: Itinerary[]) {
        this.itineraries = itineraries;
    }
    getId(): string {
        return this._id;
    }
    getName(): string {
        return this.name;
    }
    getCode(): number {
        return this.code;
    }
    getContent(): string {
        return this.content;
    }
    getItineraries(): Itinerary[] {
        return this.itineraries;
    }
}
