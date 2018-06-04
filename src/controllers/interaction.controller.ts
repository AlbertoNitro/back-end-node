import { InteractionResource } from "../resources/interaction.resource";
import { Request, Response } from "express";
import { VideoInteractionInput } from "../dtos/videoInteractionInput.dto";
import { ExerciseInteractionInput } from "../dtos/exerciseInteractionInput.dto";
<<<<<<< HEAD
=======
import { InteractionInputDto } from "../dtos/interactionInputDto";
>>>>>>> origin/develop
import { Interaction } from "../models/interaction.model";
import { HttpStatusCode } from "../util/http-status-codes.enum";

export class InteractionController {
    private interactionResource: InteractionResource;

    constructor() {
        this.interactionResource = new InteractionResource();
    }

    async create2(req: Request, res: Response) {
        const interactionInputDto: InteractionInputDto = req.body;
        const interaction: Interaction = this.interactionResource.create(interactionInputDto);
        // Convertir interaction a interactionDto
        interaction ? res.status(HttpStatusCode.CREATED).json(interaction) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }

<<<<<<< HEAD
    async findAll(req: Request, res: Response) {
        const interaction: Interaction[] = await this.interactionResource.findAll();
        interaction ? res.status(HttpStatusCode.OK).json(interaction) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
=======
    // async create(req: Request, res: Response) {
    //     if ( req.body.kind == "Video") {
    //         const videoII: VideoInteractionInput = req.body;
    //         this.interactionResource.createVideo(videoII);
    //     }
    //     else if ( req.body.kind == "Exercise") {
    //         const exerciseII: ExerciseInteractionInput = req.body;
    //         this.interactionResource.createExercise(exerciseII);
    //     }
    //
    // }
>>>>>>> origin/develop

}
