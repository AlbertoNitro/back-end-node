import { Unit } from "../unit.model";

export class UnitBuilder {
    private unit: Unit;

    constructor(name: string) {
        this.unit = new Unit(name);
    }

    setId(id: number): UnitBuilder {
        this.unit.setId(id);
        return this;
    }
    setName(name: string): UnitBuilder {
        this.unit.setName(name);
        return this;
    }
    setCode(code: number): UnitBuilder {
        this.unit.setCode(code);
        return this;
    }
    build(): Unit {
        return this.unit;
    }

}