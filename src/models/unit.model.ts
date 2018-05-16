export class Unit  {
    private _id: number;
    private name: string;

    private code: number;

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
    public setCode(code: number) {
        this.code = code;
    }

    public getCode(code: number) {
        return this.code;
    }

}
