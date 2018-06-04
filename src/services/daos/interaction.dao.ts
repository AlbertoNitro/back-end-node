import { Document } from "mongoose";
import logger from "../../util/logger";
import InteractionSchema from "../../schemas/interaction.schema";
import { Interaction } from "../../models/interaction.model";
import { VideoDao } from "./video.dao";
import { ExerciseDao } from "./exercise.dao";
import { Video } from "../../models/video.model";
import { Exercise } from "../../models/exercise.model";
import { Solution } from "../../models/solution.model";
import { VideoInteractionInput } from "../../dtos/videoInteractionInput.dto";
import VideoSchema from "../../schemas/video.schema";
import { ExerciseInteractionInput } from "../../dtos/exerciseInteractionInput.dto";
import ExerciseSchema from "../../schemas/exercise.schema";
<<<<<<< HEAD
import { Interaction } from "../../models/interaction.model";
import { VideoBuilder } from "../../models/builders/video.builder";
import { ExerciseBuilder } from "../../models/builders/exercise.builder";

export class InteractionDao {

    constructor() {
    }
    private static toInteraction(document: Document): Interaction {
        if ( document.get("kind") == "Video") {
            return new VideoBuilder(document.get("url")).build();
        }
        else if ( document.get("kind") == "Exercise" ) {
            return new ExerciseBuilder(document.get("formulation")).build();
        }
    }
    private static toArrayInteraction(documents: Document[]): Interaction[] {
        const interaction: Interaction[] = [];
        for (let i = 0; i < documents.length; i++) {
            interaction.push(InteractionDao.toInteraction(documents[i]));
        }
        console.log("interaction " + interaction);
        return interaction;
    }
=======
import { InteractionInputDto } from "../../dtos/interactionInputDto";

export class InteractionDao {
    constructor() {
    }
>>>>>>> origin/develop
    async createVideo(videoII: VideoInteractionInput) {
        console.log("Creando " + JSON.stringify(videoII.kind));
        VideoSchema.create(videoII)
            .then((interaction: Document) => {
                console.log(interaction);
            });
    }
    async createExercise(exerciseII: ExerciseInteractionInput) {
        ExerciseSchema.create(exerciseII)
            .then((interaction: Document) => {
                console.log(interaction);
            });
    }

<<<<<<< HEAD
    async findAll(): Promise<Interaction[]> {
        return await InteractionSchema.find({})
            .then( (interactionDocument: Document[]) => {
                const interaction: Interaction[] = InteractionDao.toArrayInteraction(interactionDocument);
                return interaction;
            })
            .catch(err => {
                console.log(err);
                return undefined;
            });
    }
}
=======
    public static toInteraction(document: Document): Interaction {
        let interaction: Interaction;
        logger.info("document.get(\"url\") " + JSON.stringify(document.get("url")));
        if (document.get("url")) {
            logger.info("VIDEO");
            interaction = <Interaction> VideoDao.toVideo(document);
        } else {
            logger.info("EXERCISE");
            interaction = <Interaction> ExerciseDao.toExercise(document);
        }
        return interaction;
    }
    public static toArrayInteractions(documents: Document[]): Interaction[] {
        const interactions: Interaction[] = [];
        for (let i = 0; i < documents.length; i++) {
            interactions.push(InteractionDao.toInteraction(documents[i]));
        }
        return interactions;
    }
    private static isVideo(document: Document): boolean {
        logger.info(" document.get(\"url\") + " +  document.get("url"));
        return document.get("url");
    }
    async delete(id: number): Promise<boolean> {
        return await InteractionSchema.deleteOne({_id: id })
            .then( () => {
                return true;
            })
            .catch ( err => {
                logger.error(err);
                return false;
            });
    }
    async findById(id: number): Promise<Interaction> {
        return await InteractionSchema.findById(id)
            .then( (interactionDocument: Document) => {
                const interaction: Interaction = interactionDocument ? InteractionDao.toInteraction(interactionDocument) : undefined;
                return interaction;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(interactionDto: InteractionInputDto): Promise<Interaction> {
        // const interaction: Interaction;
        // logger.info("(1) interactionDto.url " + interactionDto.url.toString());
        // const interactionSchema = new InteractionSchema(interaction);
        // logger.info("(2) interactionSchema " + JSON.stringify(interactionSchema));
        // return interactionSchema.save()
        //     .then( (interactionDocument: Document) => {
        //         const interaction: Interaction = interactionDocument ? InteractionDao.toInteraction(interactionDocument) : undefined;
        //         logger.info("(3) interactionDocument " + JSON.stringify(interactionDocument));
        //         return interaction;
        //     })
        //     .catch ( err => {
        //         logger.error(err);
        //         return undefined;
        //     });
        return undefined;
    }
}

>>>>>>> origin/develop
