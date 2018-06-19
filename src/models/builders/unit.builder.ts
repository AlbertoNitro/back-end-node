import { Unit } from "../unit.model";
import { Itinerary } from "../itinerary.model";

export class UnitBuilder {
    private unit: Unit;

    constructor(name: string) {
        this.unit = new Unit(name);
    }

    setId(id: string): UnitBuilder {
        this.unit.setId(id);
        return this;
    }
    setName(name: string): UnitBuilder {
        this.unit.setName(name);
        return this;
    }
    setCode(code: number): UnitBuilder {
        this.unit.setCode(code);
        return this;
    }
    setContent(content: string): UnitBuilder {
        this.unit.setContent(content);
        return this;
    }
    setItineraries(itineraries: Itinerary[]): UnitBuilder {
        this.unit.setItineraries(itineraries);
        return this;
    }
    build(): Unit {
        return this.unit;
    }
}