import { InteractionResource } from "../resources/interaction.resource";
import { Request, Response } from "express";
import { VideoInteractionInput } from "../dtos/videoInteractionInput.dto";
import { ExerciseInteractionInput } from "../dtos/exerciseInteractionInput.dto";
import { Interaction } from "../models/interaction.model";
import { HttpStatusCode } from "../util/http-status-codes.enum";
import { VideoResource } from "../resources/video.resource";
import { ExerciseResource } from "../resources/exercise.resource";

export class InteractionController {

    interactionResource: InteractionResource = new InteractionResource();
    videoResource: VideoResource = new VideoResource();
    exerciseResource: ExerciseResource = new ExerciseResource();

    constructor() {
    }

    async create(req: Request, res: Response) {
        if ( req.body.kind == "Video") {
            const videoII: VideoInteractionInput = req.body;
            const video = await this.videoResource.create(videoII.url);
            video ? res.status(HttpStatusCode.CREATED).json(video) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        }
        else if ( req.body.kind == "Exercise") {


        }

    }

    async findAll(req: Request, res: Response) {
        const interaction: Interaction[] = await this.interactionResource.findAll();
        interaction ? res.status(HttpStatusCode.OK).json(interaction) : res.status(HttpStatusCode.NOT_FOUND).end();
    }

}
