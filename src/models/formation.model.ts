import { SessionsItinerary } from "./itinerary.model";

export class Formation {
    private _id: number;
    private name: string;
    private sessionsItineraries: SessionsItinerary[];

    constructor(name: string) {
        this.name = name;
    }

    setId(id: number) {
        this._id = id;
    }
    setName(name: string) {
        this.name = name;
    }
    setSessionItineraries(sessionItineraries: SessionsItinerary[]) {
        this.sessionsItineraries = sessionItineraries;
    }
    getId(): number {
        return this._id;
    }
    getName(): string {
        return this.name;
    }
    getSessionItineraries(): SessionsItinerary[] {
        return this.sessionsItineraries;
    }
}
