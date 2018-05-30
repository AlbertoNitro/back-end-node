import { SessionItinerary } from "./sessionsItinerary.model";

export class Formation  {
    private _id: number;
    private name: string;
    private sessionsItineraries: SessionItinerary[];

    constructor(name: string) {
        this.name = name;
    }

    setId(id: number) {
        this._id = id;
    }
    setName(name: string) {
        this.name = name;
    }
    setSessionItineraries(sessionItineraries: SessionItinerary[]) {
        this.sessionsItineraries = sessionItineraries;
    }
    getId(): number {
        return this._id;
    }
    getName(): string {
        return this.name;
    }
    getSessionItineraries(): SessionItinerary[] {
        return this.sessionsItineraries;
    }
}
