import { Lesson } from "./lesson.model";
import { Formation } from "./formation.model";
import { FormationVisitor } from "./formation.visitor";

export class Session extends Formation {
    private _id: string;
    private name: string;
    private lessons: Lesson[];

    constructor(name: string) {
        super();
        this.name = name;
        this.lessons = [];
    }

    setId(id: string): Session {
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
    getId(): string {
        return this._id;
    }
    getName(): string {
        return this.name;
    }
    getLessons(): Lesson[] {
        return this.lessons;
    }
    accept(formationVisitor: FormationVisitor): void {
        formationVisitor.visitSession(this);
    }
}
