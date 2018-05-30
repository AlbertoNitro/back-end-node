export class Unit {
    private _id: number;
    private name: string;
    private code: number;
    private content: string;

    constructor(name: string) {
        this.name = name;
    }

    setId(id: number) {
        this._id = id;
    }
    setName(name: string) {
        this.name = name;
    }
    setCode(code: number) {
        this.code = code;
    }
    setContent(content: string) {
        this.content = content;
    }
    getId(): number {
        return this._id;
    }
    getName(): string {
        return this.name;
    }
    getCode(): number {
        return this.code;
    }
    getContent(): string {
        return this.content;
    }
}
