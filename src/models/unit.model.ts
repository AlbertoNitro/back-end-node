import { UnitBuilder } from "./builders/unit.builder";

export class Unit  {
    private _id: number;
    private name: string;
    // private topUnit: Unit;

    constructor(builder: UnitBuilder) {
        this.name = builder.Name;
        this._id = builder.Id;
    }
    get Name() {
        return this.name;
    }
    get Id() {
        return this._id;
    }

}
