import { Unit } from "./unit.model";

export class Relation {
    private _id: string;
    private type: string;
    private topUnit: Unit;
    private lowerUnit: Unit;
    private semantics: string;
    private cardinalTopUnit: string;
    private cardinalLowerUnit: string;

    constructor() {
    }

    getId(): string {
        return this._id;
    }
    getType(): string {
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
    getCardinalTopUnit(): string {
        return this.cardinalTopUnit;
    }
    getCardinalLowerUnit(): string {
        return this.cardinalLowerUnit;
    }
    setId(id: string) {
        this._id = id;
    }
    setType(type: string) {
        this.type = type;
    }
    setTopUnit(topUnit: Unit) {
        this.topUnit = topUnit;
    }
    setLowerUnit(lowerUnit: Unit) {
        this.lowerUnit = lowerUnit;
    }
    setSemantics(semantics: string) {
        this.semantics = semantics;
    }
    setCardinalTopUnit(cardinalTopUnit: string) {
        this.cardinalTopUnit = cardinalTopUnit;
    }
    setCardinalLowerUnit(cardinalLowerUnit: string) {
        this.cardinalLowerUnit = cardinalLowerUnit;
    }
}