import { Lesson } from "./lesson.model";

export class Session {
    private _id: number;
    private name: string;
    private lessons: Lesson[];

    constructor(name: string) {
        this.name = name;
        this.lessons = [];
    }

    setId(id: number): Session {
        this._id = id;
        return this;
    }
    setName(name: string): Session {
        this.name = name;
        return this;
    }
    setLessons(lessons: Lesson[]): Session {
        this.lessons = lessons;
        return this;
    }
    getId(): number {
        return this._id;
    }
    getName(): string {
        return this.name;
    }
    getLessons(): Lesson[] {
        return this.lessons;
    }
}
