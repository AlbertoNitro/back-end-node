import { Session } from "./session.model";

export class Itinerary {
    private _id: number;
    private name: string;
    private sessions: Session[];

    constructor(name: string) {
        this.name = name;
        this.sessions = [];
    }

    setId(id: number): Itinerary {
        this._id = id;
        return this;
    }
    setName(name: string): Itinerary {
        this.name = name;
        return this;
    }
    setSessions(sessions: Session[]): Itinerary {
        this.sessions = sessions;
        return this;
    }
    getId(): number {
        return this._id;
    }
    getName(): string {
        return this.name;
    }
    getSessions(): Session[] {
        return this.sessions;
    }
}
