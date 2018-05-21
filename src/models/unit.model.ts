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
    public setName(name: string) {
        this.name = name;
    }
    public setCode(code: number) {
        this.code = code;
    }
    public getId(): number {
        return this._id;
    }
    public getName(): string {
        return this.name;
    }
    public getCode(): number {
        return this.code;
    }
}
