import { Session } from "./session.model";

export class Itinerary {
    private _id: number;
    private name: string;
    private sessions: Session[];

    constructor(name: string) {
        this.name = name;
        this.sessions = [];
    }

    setId(id: number) {
        this._id = id;
    }
    setName(name: string) {
        this.name = name;
    }
    setSessions(sessions: Session[]) {
        this.sessions = sessions;
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
