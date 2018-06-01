import { InteractionResource } from "../resources/interaction.resource";
import { Request, Response } from "express";
import { VideoInteractionInput } from "../dtos/videoInteractionInput.dto";
import { ExerciseInteractionInput } from "../dtos/exerciseInteractionInput.dto";

export class InteractionController {

    interactionResource: InteractionResource = new InteractionResource();
    constructor() {
    }

    async create(req: Request, res: Response) {
        if ( req.body.kind == "Video") {
            const videoII: VideoInteractionInput = req.body;
            this.interactionResource.createVideo(videoII);
        }
        else if ( req.body.kind == "Exercise") {
            const exerciseII: ExerciseInteractionInput = req.body;
            this.interactionResource.createExercise(exerciseII);
        }

    }

}
