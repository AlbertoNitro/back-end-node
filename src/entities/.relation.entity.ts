
import { UnitEntity } from "./unit.entity";
import { TypeRelation } from "../models/typeRelation.enum";

export class RelationEntity {
    private _id: number;
    private type: TypeRelation;
    private topUnit: UnitEntity;
    private lowerUnit: UnitEntity;

    constructor(type: TypeRelation, topUnit: UnitEntity, lowerUnit: UnitEntity) {
        this.type = type;
        this.topUnit = topUnit;
        this.lowerUnit = lowerUnit;
    }

    public get $type(): TypeRelation {
        return this.type;
    }
    public set $type(value: TypeRelation) {
        this.type = value;
    }
    public get $id(): number {
        return this._id;
    }
    public set $id(value: number) {
        this._id = value;
    }
    public get $topUnit(): UnitEntity {
        return this.topUnit;
    }
    public set $topUnit(value: UnitEntity) {
        this.topUnit = value;
    }
    public get $lowerUnit(): UnitEntity {
        return this.lowerUnit;
    }
    public set $lowerUnit(value: UnitEntity) {
        this.lowerUnit = value;
    }
}
