import { UnitOutputDto } from "../dtos/output/unitOutput.dto";
import { Unit } from "../models/unit.model";
import { RelationOutputDto } from "../dtos/output/relationOutput.dto";
import { Relation } from "../models/relation.model";
import { NeighborsOutputDto } from "../dtos/output/neighborsOutput.dto";
import { Video } from "../models/video.model";
import { VideoOutputDto } from "../dtos/output/videoOutput.dto";
import { SolutionOutputDto } from "../dtos/output/solutionOutput.dto";
import { Solution } from "../models/solution.model";
import { LessonOutputDto } from "../dtos/output/lessonOutput.dto";
import { Lesson } from "../models/lesson.model";
import { Justification } from "../models/justification.model";
import { JustificationOutputDto } from "../dtos/output/justificationOutput.dto";
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

export class DtoService implements InteractionVisitor {
    interactionOutputDto: InteractionOutputDto;

    constructor() {
    }

    toUnitOutputDto(unit: Unit): UnitOutputDto {
        let unitOutputDto: UnitOutputDto = undefined;
        if (unit) {
            unitOutputDto = {
                name: unit.getName(),
                code: unit.getCode(),
                content: unit.getContent()};
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
    toJustificationOutputDto(justification: Justification): JustificationOutputDto {
        let justificationOutputDto: JustificationOutputDto = undefined;
        if (justification) {
            justificationOutputDto = {
                id: justification.getId(),
                text: justification.getText(),
                isCorrect: justification.getIsCorrect()};
        }
        return justificationOutputDto;
    }
    toArrayJustificationOutputDto(justifications: Justification[]): JustificationOutputDto[] {
        const justificationOutputDtos: JustificationOutputDto[] = [];
        if (justifications.length > 0) {
            for (let i = 0 ; i < justifications.length ; i++ ) {
                justificationOutputDtos.push(this.toJustificationOutputDto(justifications[i]));
            }
        }
        return justificationOutputDtos;
    }
    toSolutionOutputDto(solution: Solution): SolutionOutputDto {
        let solutionOutputDto: SolutionOutputDto = undefined;
        if (solution) {
            solutionOutputDto = {
                id: solution.getId(),
                isCorrect: solution.getIsCorrect(),
                text: solution.getText(),
                justifications: this.toArrayJustificationOutputDto(solution.getJustifications())};
        }
        return solutionOutputDto;
    }
    toArraySolutionOutputDto(solutions: Solution[]): SolutionOutputDto[] {
        const solutionOutputDtos: SolutionOutputDto[] = [];
        if (solutions.length > 0) {
            for (let i = 0 ; i < solutions.length ; i++ ) {
                solutionOutputDtos.push(this.toSolutionOutputDto(solutions[i]));
            }
        }
        return solutionOutputDtos;
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
    toFormationOutputDto(formation: Formation): FormationOutputDto {
        let formationOutputDto: FormationOutputDto = undefined;
        const itinerary: Itinerary = <Itinerary> formation;
        const session: Session = <Session> formation;
        if (itinerary) {
            formationOutputDto = {itinerary: this.toItineraryOutputDto(itinerary)};
        } else if (session) {
            formationOutputDto = {session: this.toSessionOutputDto(session)};
        } else {
            logger.error("ERROR en toFormationOutputDto(). A la hora de castear una formacionDto a sesionDto o a itinerarioDto");
        }
        return formationOutputDto;
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
    toExerciseOutputDto(exercise: Exercise): ExerciseOutputDto {
        let exercisesOutputDto: ExerciseOutputDto = undefined;
        if (exercise) {
            exercisesOutputDto = {
                id: exercise.getId(),
                formulation: exercise.getFormulation(),
                solutions: this.toArraySolutionOutputDto(exercise.getSolutions())};
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
    visitVideo(video: Video): void {
        this.interactionOutputDto = {video: this.toVideoOutputDto(video)};
    }
    visitExercise(exercise: Exercise): void {
        this.interactionOutputDto = {exercise: this.toExerciseOutputDto(exercise)};
    }
}
