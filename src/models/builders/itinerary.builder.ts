
import { Session } from "../session.model";
import { Lesson } from "../lesson.model";
import { Itinerary } from "../itinerary.model";
import { Formation } from "../formation.model";

export class ItineraryBuilder {
    private itinerary: Itinerary;

    constructor(name: string) {
        this.itinerary = new Itinerary(name);
    }

    setId(id: number): ItineraryBuilder {
        this.itinerary.setId(id);
        return this;
    }

    setName(name: string): ItineraryBuilder {
        this.itinerary.setName(name);
        return this;
    }
    setFormations(formations: Formation[]) {
        this.itinerary.setFormations(formations);
        return this;
    }
    build(): Itinerary {
        return this.itinerary;
    }
}