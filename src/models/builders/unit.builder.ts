import { Unit } from "../unit.entity";

export class UnitBuilder {
    private _id: number;
    private name: string;
    private topUnit: Unit;
    constructor(name: string) {
        this.name = name;
    }

    get Name() {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
        return this;
    }
    get Id() {
        return this._id;
    }
    setId(id: number) {
        this._id = id;
        return this;
    }
    get TopUnit() {
        return this.topUnit;
    }
    setTopUnit(unit: Unit) {
        this.topUnit = unit;
        return this;
    }
    build(): Unit {
        return new Unit(this);
    }

}