import { Unit } from "./unit.model";
import { RelationBuilder } from "./builders/relation.builder";
import { TypeRelation } from "../schemas/typeRelation.enum";

export class Relation {
    private _id: number;
    private type: TypeRelation;
    private topUnit: Unit;
    private lowerUnit: Unit;
    private semantics: string;

    constructor(builder: RelationBuilder) {
        this.type = builder.getType();
        this.topUnit = builder.getTopUnit();
        this.lowerUnit = builder.getLowerUnit();
        this.semantics = builder.getSemantics();
    }

    public getId() {
        return this._id;
    }
    public getType() {
        return this.type;
    }
    public getTopUnit() {
        return this.topUnit;
    }
    public getLowerUnit() {
        return this.lowerUnit;
    }
    public getSemantics() {
        return this.semantics;
    }
}
