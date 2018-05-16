export class Unit  {
    private _id: number;
    private name: string;

    constructor(name: string) {
        this.name = name;
    }
    public setId(id: number) {
        this._id = id;
    }
    public getName(): string {
        return this.name;
    }
    public setName(name: string) {
        this.name = name;
    }
    public getId(): number {
        return this._id;
    }

}
