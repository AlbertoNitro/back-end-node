import { Document } from "mongoose";
import { Video } from "../../models/video.model";
import VideoSchema from "../../schemas/video.schema";
<<<<<<< HEAD
import logger from "../../util/logger";
=======
import { ExerciseInteractionInput } from "../../dtos/exerciseInteractionInput.dto";
import ExerciseSchema from "../../schemas/exercise.schema";
import { VideoBuilder } from "../../models/builders/video.builder";
import { ExerciseBuilder } from "../../models/builders/exercise.builder";
>>>>>>> develop

export class InteractionDao {

    constructor() {
    }
<<<<<<< HEAD
    // public static toInteraction(document: Document): Video {
    //     return new Video(document.get("url")).setId(document.get("_id"));
    // }
    // public static toArrayInteractions(documents: Document[]): Video[] {
    //     const videos: Video[] = [];
    //     for (let i = 0; i < documents.length; i++) {
    //         videos.push(VideoDao.toVideo(documents[i]));
    //     }
    //     return videos;
    // }
=======
    private static toInteraction(document: Document): Interaction {
        if ( document.get("kind") == "Video") {
            return new VideoBuilder(document.get("url")).setId(document.get("_id")).build();
        }
        else if ( document.get("kind") == "Exercise" ) {
            return new ExerciseBuilder(document.get("formulation")).setId(document.get("_id")).build();
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
>>>>>>> develop
}
