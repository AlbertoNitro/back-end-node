import { Unit } from "../models/unit.model";
import { Relation } from "../models/relation.model";
import { Video } from "../models/video.model";
import { Lesson } from "../models/lesson.model";
import { Session } from "../models/session.model";
import { Itinerary } from "../models/itinerary.model";
import { Exercise } from "../models/exercise.model";
import { Interaction } from "../models/interaction.model";
import logger from "../utils/logger";
import { Formation } from "../models/formation.model";
import { Document } from "mongoose";
import { ExerciseBuilder } from "../models/builders/exercise.builder";
import { LessonBuilder } from "../models/builders/lesson.builder";
import { SessionBuilder } from "../models/builders/session.builder";
import { ItineraryBuilder } from "../models/builders/itinerary.builder";
import { UnitBuilder } from "../models/builders/unit.builder";
import { RelationBuilder } from "../models/builders/relation.builder";

export class ConverterDocumentsToModelsService {
    constructor() {
    }

    static toExercise(document: Document): Exercise {
        return new ExerciseBuilder(document.get("formulation")).setId(document.get("_id")).setSolutions(document.get("solutions")).build();

    }
    static toArrayExercises(documents: Document[]): Exercise[] {
        const exercises: Exercise[] = [];
        for (let i = 0; i < documents.length; i++) {
            exercises.push(ConverterDocumentsToModelsService.toExercise(documents[i]));
        }
        return exercises;
    }
    static toVideo(document: Document): Video {
        return new Video(document.get("url")).setId(document.get("_id"));
    }
    static toArrayVideos(documents: Document[]): Video[] {
        const videos: Video[] = [];
        for (let i = 0; i < documents.length; i++) {
            videos.push(ConverterDocumentsToModelsService.toVideo(documents[i]));
        }
        return videos;
    }
    static toLesson(document: Document): Lesson {
        const interactions: Interaction[] = [];
        const interactionsDocuments: Document[] = document.get("interactions");
        for (let i = 0 ; i < interactionsDocuments.length ; i++) {
            const interactionDocument: Document = interactionsDocuments[i];
            interactionDocument.get("kind") === "Video" ? interactions.push(ConverterDocumentsToModelsService.toVideo(interactionDocument)) : interactions.push(ConverterDocumentsToModelsService.toExercise(interactionDocument));
        }
        const lesson: Lesson = new LessonBuilder(document.get("name")).setId(document.get("_id")).setInteractions(interactions).build();
        return lesson;
    }
    static toArrayLessons(documents: Document[]): Lesson[] {
        const lessons: Lesson[] = [];
        for (let i = 0; i < documents.length; i++) {
            lessons.push(ConverterDocumentsToModelsService.toLesson(documents[i]));
        }
        return lessons;
    }
    static toSession(document: Document): Session {
        return new SessionBuilder(document.get("name")).setId(document.get("_id")).setLessons(ConverterDocumentsToModelsService.toArrayLessons(document.get("lessons"))).build();
    }
    static toArraySessions(documents: Document[]): Session[] {
        const sessions: Session[] = [];
        for (let i = 0; i < documents.length; i++) {
            sessions.push(ConverterDocumentsToModelsService.toSession(documents[i]));
        }
        return sessions;
    }
    static toItinerary(document: Document): Itinerary {
        const formations: Formation[] = [];
        const formationsDocuments: Document[] = document.get("formations");
        for (let i = 0 ; i < formationsDocuments.length ; i++) {
            const formationDocument: Document = formationsDocuments[i];
            formationDocument.get("kind") === "Session" ? formations.push(ConverterDocumentsToModelsService.toSession(formationDocument)) : formations.push(ConverterDocumentsToModelsService.toItinerary(formationDocument));
        }
        const itinerary: Itinerary = new ItineraryBuilder(document.get("name")).setId(document.get("_id")).setFormations(formations).build();
        return itinerary;
    }
    static toArrayItineraries(documents: Document[]): Itinerary[] {
        const itineraries: Itinerary[] = [];
        for (let i = 0; i < documents.length; i++) {
            itineraries.push(ConverterDocumentsToModelsService.toItinerary(documents[i]));
        }
        return itineraries;
    }
    static toUnit(document: Document): Unit {
        return new UnitBuilder(document.get("name")).setId(document.get("_id")).setCode(document.get("code")).setContent(document.get("content")).setItineraries(ConverterDocumentsToModelsService.toArrayItineraries(document.get("itineraries"))).build();
    }
    static toArrayUnits(documents: Document[]): Unit[] {
        const units: Unit[] = [];
        for (let i = 0; i < documents.length; i++) {
            units.push(ConverterDocumentsToModelsService.toUnit(documents[i]));
        }
        return units;
    }
    static toRelation(document: any): Relation {
        return new RelationBuilder().setCardinalTopUnit(document.get("cardinalTopUnit")).setCardinalLowerUnit(document.get("cardinalLowerUnit")).setSemantics(document.get("semantics")).setId(document.get("_id")).setType(document.get("type")).setTopUnit(new UnitBuilder(document.get("topUnit").get("name")).setId(document.get("topUnit").get("_id")).setCode(document.get("topUnit").get("code")).build()).setLowerUnit(new UnitBuilder(document.get("lowerUnit").get("name")).setId(document.get("lowerUnit").get("_id")).setCode(document.get("lowerUnit").get("code")).build()).build();
    }
    static toArrayRelations(documents: Document[]): Relation[] {
        const relations: Relation[] = [];
        for ( let i = 0; i < documents.length; i++) {
            relations.push(ConverterDocumentsToModelsService.toRelation(documents[i]));
        }
        return relations;
    }
}
