import { Unit } from "../unit.model";

export class UnitBuilder {
    private unit: Unit;
    constructor(name: string) {
        this.unit = new Unit(name);
    }
    setId(id: number) {
        this.unit.setId(id);
        return this;
    }
    setName(name: string) {
        this.unit.setName(name);
        return this;
    }
    build(): Unit {
        return this.unit;
    }

}