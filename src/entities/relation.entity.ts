import { TypeRelation } from "../models/typeralation.enum";
import { UnitEntity } from "./unit.entity";

export class RelationEntity {
    private id: Number;
    private type: TypeRelation;
    private topUnit: UnitEntity;
    private lowerUnit: UnitEntity;
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
     * Getter $id
     * @return {Number}
     */
    public get $id(): Number {
        return this.id;
    }

    /**
     * Setter $id
     * @param {Number} value
     */
    public set $id(value: Number) {
        this.id = value;
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