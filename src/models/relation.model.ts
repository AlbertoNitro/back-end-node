import { Unit } from "./unit.model";
import { TypeRelation } from "../schemas/typeRelation.enum";

export class Relation {
    private _id: string;
    private type: TypeRelation;
    private topUnit: Unit;
    private lowerUnit: Unit;
    private semantics: string;

    constructor() {
    }

    getId(): number {
        return this._id;
    }
    getType(): TypeRelation {
        return this.type;
    }
    getTopUnit(): Unit {
        return this.topUnit;
    }
    getLowerUnit(): Unit {
        return this.lowerUnit;
    }
    getSemantics(): string {
        return this.semantics;
    }
    setId(value: number) {
        this._id = value;
    }
    setType(value: TypeRelation) {
        this.type = value;
    }
    setTopUnit(value: Unit) {
        this.topUnit = value;
    }
    setLowerUnit(value: Unit) {
        this.lowerUnit = value;
    }
    setSemantics(value: string) {
        this.semantics = value;
    }
}
