export class Video {
    private _id: number;
    private url: string;

    constructor(url: string) {
        this.url = url;
    }
    setId(id: number) {
        this._id = id;
    }
    setUrl(url: string) {
        this.url = url;
    }
    getId(): number {
        return this._id;
    }
    getUrl(): string {
        return this.url;
    }
}
