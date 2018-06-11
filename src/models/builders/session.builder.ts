
import { Session } from "../session.model";
import { Lesson } from "../lesson.model";

export class SessionBuilder {
    private session: Session;

    constructor(name: string) {
        this.session = new Session(name);
    }

    setId(id: string): SessionBuilder {
        this.session.setId(id);
        return this;
    }
    setName(name: string): SessionBuilder {
        this.session.setName(name);
        return this;
    }
    setLessons(lessons: Lesson[]) {
        this.session.setLessons(lessons);
        return this;
    }
    build(): Session {
        return this.session;
    }
}