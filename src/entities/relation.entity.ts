
import { UnitEntity } from "./unit.entity";
import { TypeRelation } from "../models/typeRelation.enum";

export class RelationBuilder {
    private _id: number;
    private type: TypeRelation;
    private topUnit: UnitEntity;
    private lowerUnit: UnitEntity;
    constructor() {}
    get Id() {
        return this._id;
    }
    setId(id: number) {
        this._id = id;
        return this;
    }
    get Type() {
        return this.type;
    }
    setType(type: TypeRelation) {
        this.type = type;
        return this;
    }
    get TopUnit() {
        return this.topUnit;
    }
    setTopUnit(topUnit: UnitEntity) {
        this.topUnit = topUnit;
        return this;
    }

    get LowerUnit() {
        return this.lowerUnit;
    }
    setLowerUnit(lowerUnit: UnitEntity) {
        this.lowerUnit = lowerUnit;
        return this;
    }
    build() {
        return new RelationEntity(this);
    }
}
export class RelationEntity {
    private _id: number;
    private type: TypeRelation;
    private topUnit: UnitEntity;
    private lowerUnit: UnitEntity;

    constructor(builder: RelationBuilder) {
        this.type = builder.Type;
        this.topUnit = builder.TopUnit;
        this.lowerUnit = builder.LowerUnit;
    }

    get Id() {
        return this._id;
    }
    get Type() {
        return this.type;
    }
    get TopUnit() {
        return this.topUnit;
    }
    get LowerUnit() {
        return this.lowerUnit;
    }
}
