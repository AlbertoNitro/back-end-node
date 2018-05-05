export class UnitEntity  {
    private _id: number;
    private name: string;
    private topUnit: UnitEntity;

    constructor(name: string) {
        this.$name = name;
    }

    public get $id(): number {
        return this._id;
    }
    public set $id(value: number) {
        this._id = value;
    }
    public get $name(): string {
        return this.name;
    }
    public set $name(value: string) {
        this.name = value;
    }
    public get $topUnit(): UnitEntity {
        return this.topUnit;
    }
    public set $topUnit(value: UnitEntity) {
        this.topUnit = value;
    }
}
