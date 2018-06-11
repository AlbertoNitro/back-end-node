import { Lesson } from "../lesson.model";
import { Interaction } from "../interaction.model";

export class LessonBuilder {
    private lesson: Lesson;

    constructor(name: string) {
        this.lesson = new Lesson(name);
    }

    setId(id: string): LessonBuilder {
        this.lesson.setId(id);
        return this;
    }
    setName(name: string): LessonBuilder {
        this.lesson.setName(name);
        return this;
    }
    setInteractions(interactions: Interaction[]) {
        this.lesson.setInteractions(interactions);
        return this;
    }
    build(): Lesson {
        return this.lesson;
    }
}