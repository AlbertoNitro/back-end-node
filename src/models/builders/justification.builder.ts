import { Justification } from "../justification.model";

export class JustificationBuilder {
    private justification: Justification;

    constructor(text: string, isCorrect: boolean) {
        this.justification = new Justification(text, isCorrect);
    }

    setId(id: string): JustificationBuilder {
        this.justification.setId(id);
        return this;
    }
    setIsCorrect(isCorrect: boolean): JustificationBuilder {
        this.justification.setIsCorrect(isCorrect);
        return this;
    }
    setText(text: string): JustificationBuilder {
        this.justification.setText(text);
        return this;
    }
    build(): Justification {
        return this.justification;
    }
}