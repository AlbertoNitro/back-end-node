import { Formation } from "./formation.model";
import { FormationVisitor } from "./formation.visitor";

export class Itinerary extends Formation {
    private _id: string;
    private name: string;
    private formations: Formation[];

    constructor(name: string) {
        super();
        this.name = name;
        this.formations = [];
    }

    setId(id: string): Itinerary {
        this._id = id;
        return this;
    }
    setName(name: string): Itinerary {
        this.name = name;
        return this;
    }
    setFormations(formations: Formation[]): Itinerary {
        this.formations = formations;
        return this;
    }
    getId(): string {
        return this._id;
    }
    getName(): string {
        return this.name;
    }
    getFormations(): Formation[] {
        return this.formations;
    }
    accept(formationVisitor: FormationVisitor): void {
        formationVisitor.visitItinerary(this);
    }
}
