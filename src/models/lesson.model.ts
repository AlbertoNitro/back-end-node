import { Exercise } from "./exercise.model";
import { Video } from "./video.model";

export class Lesson {
    private _id: number;
    private name: string;
    private interactions: any[]; // Solo almacenar objetos Video o Exercise.

    constructor(name: string) {
        this.name = name;
        this.interactions = [];
    }

    setId(id: number) {
        this._id = id;
    }
    setName(name: string) {
        this.name = name;
    }
    setInteractions(interactions: any[]) {
        this.interactions = interactions;
    }
    getId(): number {
        return this._id;
    }
    getName(): string {
        return this.name;
    }
    getInteractions(): any[] {
        return this.interactions;
    }
}
