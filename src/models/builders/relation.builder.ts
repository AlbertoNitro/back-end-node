import { TypeRelation } from "../../schemas/typeRelation.enum";
import { Unit } from "../unit.model";
import { Relation } from "../relation.model";

export class RelationBuilder {
    private _id: number;
    private type: TypeRelation;
    private topUnit: Unit;
    private lowerUnit: Unit;
    constructor() {}
    public getId() {
        return this._id;
    }
    public setId(id: number) {
        this._id = id;
        return this;
    }
    public getType() {
        return this.type;
    }
    public setType(type: TypeRelation) {
        this.type = type;
        return this;
    }
    public getTopUnit() {
        return this.topUnit;
    }
    public setTopUnit(topUnit: Unit) {
        this.topUnit = topUnit;
        return this;
    }

    public getLowerUnit() {
        return this.lowerUnit;
    }
    public setLowerUnit(lowerUnit: Unit) {
        this.lowerUnit = lowerUnit;
        return this;
    }
    public build() {
        return new Relation(this);
    }
}