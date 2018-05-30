import { RelationDao } from "../services/daos/relation.dao";
import { Relation } from "../models/relation.model";
import { RelationInputDto } from "../dtos/relationInput.dto";
import { Unit } from "../models/unit.model";
import logger from "../util/logger";
import { ExerciseDao } from "../services/daos/exercise.dao";

export class   ExerciseResource {
    private exerciseDao: ExerciseDao;

    constructor() {
        this.exerciseDao = new ExerciseDao();
    }
    async findWithSolution() {
        return await this.exerciseDao.findWithSolution();
    }

}