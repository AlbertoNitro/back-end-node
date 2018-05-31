import { Interaction } from "./interaction.model";

export class Video extends Interaction {
    private _id: number;
    private url: string;

    constructor(url: string) {
        super();
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
