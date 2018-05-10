import { Unit } from "../unit.model";

export class UnitBuilder {
    private _id: number;
    private name: string;
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
    build(): Unit {
        return new Unit(this);
    }

}