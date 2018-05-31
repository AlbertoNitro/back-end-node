import { Interaction } from "./interaction.model";

export class Lesson {
    private _id: number;
    private name: string;
    private interactions: Interaction[];

    constructor(name: string) {
        this.name = name;
        this.interactions = [];
    }

    setId(id: number): Lesson {
        this._id = id;
        return this;
    }
    setName(name: string): Lesson {
        this.name = name;
        return this;
    }
    setInteractions(interactions: Interaction[]): Lesson {
        this.interactions = interactions;
        return this;
    }
    getId(): number {
        return this._id;
    }
    getName(): string {
        return this.name;
    }
    getInteractions(): Interaction[] {
        return this.interactions;
    }
}
