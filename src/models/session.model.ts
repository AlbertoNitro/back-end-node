import { Lesson } from "./lesson.model";

export class Session {
    private _id: number;
    private name: string;
    private lessons: Lesson[];

    constructor(name: string) {
        this.name = name;
        this.lessons = [];
    }

    setId(id: number) {
        this._id = id;
    }
    setName(name: string) {
        this.name = name;
    }
    setLessons(lessons: Lesson[]) {
        this.lessons = lessons;
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
