export class UnitBuilder {
    private _id: number;
    private name: string;
    private topUnit: UnitEntity;
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
    setTopUnit(unit: UnitEntity) {
        this.topUnit = unit;
        return this;
    }
    build(): UnitEntity {
        return new UnitEntity(this);
    }

}
export class UnitEntity  {
    private _id: number;
    private name: string;
    private topUnit: UnitEntity;

    constructor(builder: UnitBuilder) {
        this.name = builder.Name;
        this._id = builder.Id;
        this.topUnit = builder.TopUnit;
    }
    get Name() {
        return this.name;
    }
    get Id() {
        return this._id;
    }
    get TopUnit() {
        return this.topUnit;
    }
}
