import { UnitOutputDto } from "../dtos/output/unitOutput.dto";
import { Unit } from "../models/unit.model";
import { RelationOutputDto } from "../dtos/output/relationOutput.dto";
import { Relation } from "../models/relation.model";
import { NeighborsOutputDto } from "../dtos/output/neighborsOutput.dto";
import { Video } from "../models/video.model";
import { VideoOutputDto } from "../dtos/output/videoOutput.dto";
import { LessonOutputDto } from "../dtos/output/lessonOutput.dto";
import { Lesson } from "../models/lesson.model";
import { Session } from "../models/session.model";
import { SessionOutputDto } from "../dtos/output/sessionOutput.dto";
import { ItineraryOutputDto } from "../dtos/output/itineraryOutput.dto";
import { Itinerary } from "../models/itinerary.model";
import { Exercise } from "../models/exercise.model";
import { ExerciseOutputDto } from "../dtos/output/exerciseOutput.dto";
import { Interaction } from "../models/interaction.model";
import { InteractionOutputDto } from "../dtos/output/interactionOutput.dto";
import logger from "../utils/logger";
import { FormationOutputDto } from "../dtos/output/formationOutput.dto";
import { Formation } from "../models/formation.model";
import { InteractionVisitor } from "../models/interaction.visitor";
import { FormationVisitor } from "../models/formation.visitor";

export class DtoService implements InteractionVisitor, FormationVisitor {
    interactionOutputDto: InteractionOutputDto;
    formationOutputDto: FormationOutputDto;

    constructor() {
    }

    toUnitOutputDto(unit: Unit): UnitOutputDto {
        let unitOutputDto: UnitOutputDto = undefined;
        if (unit) {
            unitOutputDto = {
                name: unit.getName(),
                code: unit.getCode(),
                content: unit.getContent(),
                itineraries: this.toArrayFormationOutputDto(unit.getItineraries())};
        }
        return unitOutputDto;
    }
    toArrayUnitOutputDto(units: Unit[]): UnitOutputDto[] {
        const unitOutputDtos: UnitOutputDto[] = [];
        if (units.length > 0) {
            for (let i = 0 ; i < units.length ; i++ ) {
                unitOutputDtos.push(this.toUnitOutputDto(units[i]));
            }
        }
        return unitOutputDtos;
    }
    toRelationOutputDto(relation: Relation): RelationOutputDto {
        let relationOutputDto: RelationOutputDto = undefined;
        if (relation) {
            relationOutputDto = {
                type: relation.getType(),
                topUnit: {name: relation.getTopUnit().getName(), code: relation.getTopUnit().getCode(), content: relation.getTopUnit().getContent()},
                lowerUnit: {name: relation.getLowerUnit().getName(), code: relation.getLowerUnit().getCode(), content: relation.getTopUnit().getContent()},
                semantics: relation.getSemantics(),
                cardinalTopUnit: relation.getCardinalTopUnit(),
                cardinalLowerUnit: relation.getCardinalLowerUnit()
            };
        }
        return relationOutputDto;
    }
    toArrayRelationOutputDto(relations: Relation[]): RelationOutputDto[] {
        const relationOutputDtos: RelationOutputDto[] = [];
        if (relations.length > 0) {
            for (let i = 0; i < relations.length; i++) {
                relationOutputDtos.push(this.toRelationOutputDto(relations[i]));
            }
        }
        return relationOutputDtos;
    }
    toNeighborsOutputDto(unit: Unit, topUnits: Unit[], lowerUnits: Unit[], relations: Relation[]): NeighborsOutputDto {
        let neighborsOutputDto: NeighborsOutputDto = undefined;
        if (unit) {
            neighborsOutputDto = {
                unit: this.toUnitOutputDto(unit),
                topUnits: this.toArrayUnitOutputDto(topUnits),
                lowerUnits: this.toArrayUnitOutputDto(lowerUnits),
                relations: this.toArrayRelationOutputDto(relations)};
        }
        return neighborsOutputDto;
    }
    toVideoOutputDto(video: Video): VideoOutputDto {
        let videoOutputDto: VideoOutputDto = undefined;
        if (video) {
            videoOutputDto = {
                id: video.getId(),
                url: video.getUrl(),
            };
        }
        return videoOutputDto;
    }
    toArrayVideoOutputDto(videos: Video[]): VideoOutputDto[] {
        const videoOutputDtos: VideoOutputDto[] = [];
        if (videos.length > 0) {
            for (let i = 0 ; i < videos.length ; i++ ) {
                videoOutputDtos.push(this.toVideoOutputDto(videos[i]));
            }
        }
        return videoOutputDtos;
    }
    toLessonOutputDto(lesson: Lesson): LessonOutputDto {
        let lessonOutputDto: LessonOutputDto = undefined;
        if (lesson) {
            lessonOutputDto = {
                id: lesson.getId(),
                name: lesson.getName(),
                interactions: this.toArrayInteractionOutputDto(lesson.getInteractions())};
        }
        return lessonOutputDto;
    }
    toArrayLessonOutputDto(lessons: Lesson[]): LessonOutputDto[] {
        const lessonOutputDtos: LessonOutputDto[] = [];
        if (lessons.length > 0) {
            for (let i = 0 ; i < lessons.length ; i++ ) {
                lessonOutputDtos.push(this.toLessonOutputDto(lessons[i]));
            }
        }
        return lessonOutputDtos;
    }
    toSessionOutputDto(session: Session): SessionOutputDto {
        let sessionOutputDto: SessionOutputDto = undefined;
        if (session) {
            sessionOutputDto = {
                id: session.getId(),
                name: session.getName(),
                lessons: this.toArrayLessonOutputDto(session.getLessons())};
        }
        return sessionOutputDto;
    }
    toArraySessionOutputDto(sessions: Session[]): SessionOutputDto[] {
        const sessionsOutputDtos: SessionOutputDto[] = [];
        if (sessions.length > 0) {
            for (let i = 0 ; i < sessions.length ; i++ ) {
                sessionsOutputDtos.push(this.toSessionOutputDto(sessions[i]));
            }
        }
        return sessionsOutputDtos;
    }
    toItineraryOutputDto(itinerary: Itinerary): ItineraryOutputDto {
        let itineraryOutputDto: ItineraryOutputDto = undefined;
        if (itinerary) {
            itineraryOutputDto = {
                id: itinerary.getId(),
                name: itinerary.getName(),
                formations: this.toArrayFormationOutputDto(itinerary.getFormations())};
        }
        return itineraryOutputDto;
    }
    toArrayItineraryOutputDto(itineraries: Itinerary[]): ItineraryOutputDto[] {
        const itinerariesOutputDtos: ItineraryOutputDto[] = [];
        if (itineraries.length > 0) {
            for (let i = 0 ; i < itineraries.length ; i++ ) {
                itinerariesOutputDtos.push(this.toItineraryOutputDto(itineraries[i]));
            }
        }
        return itinerariesOutputDtos;
    }
    toExerciseOutputDto(exercise: Exercise): ExerciseOutputDto {
        let exercisesOutputDto: ExerciseOutputDto = undefined;
        if (exercise) {
            exercisesOutputDto = {
                id: exercise.getId(),
                formulation: exercise.getFormulation(),
                solutions: exercise.getSolutions()};
        }
        return exercisesOutputDto;
    }
    toArrayExerciseOutputDto(exercises: Exercise[]): ExerciseOutputDto[] {
        const exercisesOutputDtos: ExerciseOutputDto[] = [];
        if (exercises.length > 0) {
            for (let i = 0 ; i < exercises.length ; i++ ) {
                exercisesOutputDtos.push(this.toExerciseOutputDto(exercises[i]));
            }
        }
        return exercisesOutputDtos;
    }
    toInteractionOutputDto(interaction: Interaction): InteractionOutputDto {
        interaction.accept(this);
        return this.interactionOutputDto;
    }
    toArrayInteractionOutputDto(interactions: Interaction[]): InteractionOutputDto[] {
        const interactionsOutputDtos: InteractionOutputDto[] = [];
        if (interactions.length > 0) {
            for (let i = 0 ; i < interactions.length ; i++ ) {
                interactionsOutputDtos.push(this.toInteractionOutputDto(interactions[i]));
            }
        }
        return interactionsOutputDtos;
    }
    toFormationOutputDto(formation: Formation): FormationOutputDto {
       formation.accept(this);
       return this.formationOutputDto;
    }
    toArrayFormationOutputDto(formations: Formation[]): FormationOutputDto[] {
        const formationsOutputDtos: FormationOutputDto[] = [];
        if (formations.length > 0) {
            for (let i = 0 ; i < formations.length ; i++ ) {
                formationsOutputDtos.push(this.toFormationOutputDto(formations[i]));
            }
        }
        return formationsOutputDtos;
    }
    visitVideo(video: Video): void {
        this.interactionOutputDto = {video: this.toVideoOutputDto(video)};
    }
    visitExercise(exercise: Exercise): void {
        this.interactionOutputDto = {exercise: this.toExerciseOutputDto(exercise)};
    }
    visitSession(session: Session): void {
        this.formationOutputDto = {session: this.toSessionOutputDto(session)};
    }
    visitItinerary(itinerary: Itinerary): void {
        this.formationOutputDto = {itinerary: this.toItineraryOutputDto(itinerary)};
    }
}
