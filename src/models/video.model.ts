export class Video  {
    private _id: number;
    private url: string;

    constructor(url: string) {
        this.url = url;
    }
    public setId(id: number) {
        this._id = id;
    }
    public setUrl(url: string) {
        this.url = url;
    }
    public getId(): number {
        return this._id;
    }
    public getUrl(): string {
        return this.url;
    }
}
