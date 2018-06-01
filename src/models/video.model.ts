import { Interaction } from "./interaction.model";

export class Video extends Interaction  {
    private _id: number;
    private url: string;

    constructor(url: string) {
        super();
        this.url = url;
    }
    setId(id: number): Video {
        this._id = id;
        return this;
    }
    setUrl(url: string): Video {
        this.url = url;
        return this;
    }
    getId(): number {
        return this._id;
    }
    getUrl(): string {
        return this.url;
    }
}
