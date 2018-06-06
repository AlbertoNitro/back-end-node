import { UnitOutputDto } from "../dtos/unitOutput.dto";
import { Unit } from "../models/unit.model";
import { RelationOutputDto } from "../dtos/relationOutput.dto";
import { Relation } from "../models/relation.model";
import { NeighborsOutputDto } from "../dtos/neighborsOutput.dto";
import { Video } from "../models/video.model";
import { VideoOutputDto } from "../dtos/videoOutput.dto";
import { SolutionOutputDto } from "../dtos/solutionOutput.dto";
import { Solution } from "../models/solution.model";
import { LessonOutputDto } from "../dtos/lessonOutput.dto";
import { Lesson } from "../models/lesson.model";
import { Justification } from "../models/justification.model";
import { JustificationOutputDto } from "../dtos/justificationOutput.dto";
import {Session} from "../models/session.model";
import {SessionOutputDto} from "../dtos/sessionOutput.dto";
import {ItineraryOutputDto} from "../dtos/itineraryOutput.dto";
import {Itinerary} from "../models/itinerary.model";
import {Exercise} from "../models/exercise.model";

export class DtoService {
    constructor() {
    }

    static toUnitOutputDto(unit: Unit): UnitOutputDto {
        let unitOutputDto: UnitOutputDto = undefined;
        if (unit) {
            unitOutputDto = {name: unit.getName(), code: unit.getCode()};
        }
        return unitOutputDto;
    }
    static toArrayUnitOutputDto(units: Unit[]): UnitOutputDto[] {
        const unitOutputDtos: UnitOutputDto[] = [];
        if (units.length > 0) {
            for (let i = 0 ; i < units.length ; i++ ) {
                unitOutputDtos.push(DtoService.toUnitOutputDto(units[i]));
            }
        }
        return unitOutputDtos;
    }
    static toRelationOutputDto(relation: Relation): RelationOutputDto {
        let relationOutputDto: RelationOutputDto = undefined;
        if (relation) {
            relationOutputDto = {
                type: relation.getType(),
                topUnit: {name: relation.getTopUnit().getName(), code: relation.getTopUnit().getCode()},
                lowerUnit: {name: relation.getLowerUnit().getName(), code: relation.getLowerUnit().getCode()},
                semantics: relation.getSemantics(),
                cardinalTopUnit: relation.getCardinalTopUnit(),
                cardinalLowerUnit: relation.getCardinalLowerUnit()
            };
        }
        return relationOutputDto;
    }
    static toArrayRelationOutputDto(relations: Relation[]): RelationOutputDto[] {
        const relationOutputDtos: RelationOutputDto[] = [];
        if (relations.length > 0) {
            for (let i = 0; i < relations.length; i++) {
                relationOutputDtos.push(DtoService.toRelationOutputDto(relations[i]));
            }
        }
        return relationOutputDtos;
    }
    static toNeighborsOutputDto(unit: Unit, topUnits: Unit[], lowerUnits: Unit[], relations: Relation[]): NeighborsOutputDto {
        let neighborsOutputDto: NeighborsOutputDto = undefined;
        if (unit) {
            neighborsOutputDto = {unit: DtoService.toUnitOutputDto(unit), topUnits: DtoService.toArrayUnitOutputDto(topUnits), lowerUnits: DtoService.toArrayUnitOutputDto(lowerUnits), relations: DtoService.toArrayRelationOutputDto(relations)};
        }
        return neighborsOutputDto;
    }
    static toVideoOutputDto(video: Video): VideoOutputDto {
        let videoOutputDto: VideoOutputDto = undefined;
        if (video) {
            videoOutputDto = {id: video.getId(), url: video.getUrl()};
        }
        return videoOutputDto;
    }
    static toArrayVideoOutputDto(videos: Video[]): VideoOutputDto[] {
        const videoOutputDtos: VideoOutputDto[] = [];
        if (videos.length > 0) {
            for (let i = 0 ; i < videos.length ; i++ ) {
                videoOutputDtos.push(DtoService.toVideoOutputDto(videos[i]));
            }
        }
        return videoOutputDtos;
    }
    static toLessonOutputDto(lesson: Lesson): LessonOutputDto {
        let lessonOutputDto: LessonOutputDto = undefined;
        if (lesson) {
            lessonOutputDto = {id: lesson.getId(), name: lesson.getName(), interactions: lesson.getInteractions()};
        }
        return lessonOutputDto;
    }
    static toArrayLessonOutputDto(lessons: Lesson[]): LessonOutputDto[] {
        const lessonOutputDtos: LessonOutputDto[] = [];
        if (lessons.length > 0) {
            for (let i = 0 ; i < lessons.length ; i++ ) {
                lessonOutputDtos.push(DtoService.toLessonOutputDto(lessons[i]));
            }
        }
        return lessonOutputDtos;
    }
    static toJustificationOutputDto(justification: Justification): JustificationOutputDto {
        let justificationOutputDto: JustificationOutputDto = undefined;
        if (justification) {
            justificationOutputDto = {id: justification.getId(), text: justification.getText(), isCorrect: justification.getIsCorrect()};
        }
        return justificationOutputDto;
    }
    static toArrayJustificationOutputDto(justifications: Justification[]): JustificationOutputDto[] {
        const justificationOutputDtos: JustificationOutputDto[] = [];
        if (justifications.length > 0) {
            for (let i = 0 ; i < justifications.length ; i++ ) {
                justificationOutputDtos.push(DtoService.toJustificationOutputDto(justifications[i]));
            }
        }
        return justificationOutputDtos;
    }
    static toSolutionOutputDto(solution: Solution): SolutionOutputDto {
        let solutionOutputDto: SolutionOutputDto = undefined;
        if (solution) {
            solutionOutputDto = {id: solution.getId(), isCorrect: solution.getIsCorrect(), text: solution.getText()};
        }
        return solutionOutputDto;
    }
    static toArraySolutionOutputDto(solutions: Solution[]): SolutionOutputDto[] {
        const solutionOutputDtos: SolutionOutputDto[] = [];
        if (solutions.length > 0) {
            for (let i = 0 ; i < solutions.length ; i++ ) {
                solutionOutputDtos.push(DtoService.toSolutionOutputDto(solutions[i]));
            }
        }
        return solutionOutputDtos;
    }
    static toSessionOutputDto(session: Session): SessionOutputDto {
        let sessionOutputDto: SessionOutputDto = undefined;
        if (session) {
            sessionOutputDto = {id: session.getId(), name: session.getName(), lessons: session.getLessons()};
        }
        return sessionOutputDto;
    }
    static toArraySessionOutputDto(sessions: Session[]): SessionOutputDto[] {
        const sessionsOutputDtos: SessionOutputDto[] = [];
        if (sessions.length > 0) {
            for (let i = 0 ; i < sessions.length ; i++ ) {
                sessionsOutputDtos.push(DtoService.toSessionOutputDto(sessions[i]));
            }
        }
        return sessionsOutputDtos;
    }
    static toItineraryOutputDto(itinerary: Itinerary): ItineraryOutputDto {
        let itineraryOutputDto: ItineraryOutputDto = undefined;
        if (itinerary) {
            itineraryOutputDto = {id: itinerary.getId(), name: itinerary.getName(), formations: itinerary.getFormations()};
        }
        return itineraryOutputDto;
    }
    static toArrayItineraryOutputDto(itineraries: Itinerary[]): ItineraryOutputDto[] {
        const itinerariesOutputDtos: ItineraryOutputDto[] = [];
        if (itineraries.length > 0) {
            for (let i = 0 ; i < itineraries.length ; i++ ) {
                itinerariesOutputDtos.push(DtoService.toItineraryOutputDto(itineraries[i]));
            }
        }
        return itinerariesOutputDtos;
    }
    static toExerciseOutputDto(exercise: Exercise): ExerciseOutputDto {
        let itineraryOutputDto: ItineraryOutputDto = undefined;
        if (exercise) {
            itineraryOutputDto = {id: exercise.getId(), name: exercise.getName(), formations: exercise.getFormations()};
        }
        return itineraryOutputDto;
    }
    static toArrayExerciseOutputDto(exercises: Exercise[]): ExerciseOutputDto[] {
        const exercisesOutputDtos: ExerciseOutputDto[] = [];
        if (exercises.length > 0) {
            for (let i = 0 ; i < exercises.length ; i++ ) {
                exercisesOutputDtos.push(DtoService.toExerciseOutputDto(exercises[i]));
            }
        }
        return exercisesOutputDtos;
    }
}
