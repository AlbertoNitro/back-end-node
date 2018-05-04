import { TypeRelation } from "../models/typeralation.enum";
import { UnitEntity } from "./unit.entity";

export class RelationEntity {
    private _id: Number;
    private type: TypeRelation;
    private topUnit: UnitEntity;
    private lowerUnit: UnitEntity;

    constructor(type: TypeRelation, topUnit: UnitEntity, lowerUnit: UnitEntity) {
        this.type = type;
        this.topUnit = topUnit;
        this.lowerUnit = lowerUnit;
    }
    /**
     * Getter $type
     * @return {TypeRelation}
     */
    public get $type(): TypeRelation {
        return this.type;
    }

    /**
     * Setter $type
     * @param {TypeRelation} value
     */
    public set $type(value: TypeRelation) {
        this.type = value;
    }

    /**
     * Getter $_id
     * @return {Number}
     */
    public get $id(): Number {
        return this._id;
    }

    /**
     * Setter $_id
     * @param {Number} value
     */
    public set $id(value: Number) {
        this._id = value;
    }

    /**
     * Getter $topUnit
     * @return {UnitEntity}
     */
    public get $topUnit(): UnitEntity {
        return this.topUnit;
    }

    /**
     * Setter $topUnit
     * @param {UnitEntity} value
     */
    public set $topUnit(value: UnitEntity) {
        this.topUnit = value;
    }

    /**
     * Getter $lowerUnit
     * @return {UnitEntity}
     */
    public get $lowerUnit(): UnitEntity {
        return this.lowerUnit;
    }

    /**
     * Setter $lowerUnit
     * @param {UnitEntity} value
     */
    public set $lowerUnit(value: UnitEntity) {
        this.lowerUnit = value;
    }

}