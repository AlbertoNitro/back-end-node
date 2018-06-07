import fs from "fs";
import { MONGODB_URI } from "../util/secrets";
import logger from "../util/logger";
import ExerciseSchema from "../schemas/exercise.schema";
import SolutionSchema from "../schemas/solution.schema";
import RelationSchema from "../schemas/relation.schema";
import ItinerarySchema from "../schemas/itinerary.schema";
import SessionSchema from "../schemas/session.schema";
import {Justification} from "../models/justification.model";
import LessonSchema from "../schemas/lesson.schema";
import UnitSchema from "../schemas/unit.schema";
import VideoSchema from "../schemas/video.schema";

export class DbService {
    private mongoose: any;
    private yaml: any;
    private dookie: any;

    constructor() {
        this.yaml = require("js-yaml");
        this.dookie = require("dookie");
        this.mongoose = require("mongoose");
    }

     async seed(): Promise<boolean> {
        let success = false;
        const contents = fs.readFileSync("./src/config/test.yml", "utf8");
        const parsed = this.yaml.safeLoad(contents);
        // const backupDb = JSON.parse(fs.readFileSync("../config/backupDb.json", "utf8"));
        await this.dookie.push(MONGODB_URI, parsed)
            .then(() => {
                logger.info("DB poblada.");
                success = true;
            })
            .catch ( (err: any) => {
                logger.error("Error al poblar la DB (posiblemente ya este poblada). " + err);
            });
        return success;
     }
    async saveInBackup(): Promise<boolean> {
         let success: boolean = false;
         await this.dookie.pull(MONGODB_URI)
             .then((res: any) => {
                fs.writeFileSync("./src/config/backupDb.json", res);
                logger.info("Backup de la DB realizada en: /config/backupDb.json");
                 success = true;
            })
            .catch ( (err: any) => {
                logger.error("Error al realizar el backup de la DB. " + err);
            });
         return success;
    }
    async delete(): Promise<any> {
         const promise = await new Promise((resolve, reject) => {
            setTimeout(() => {
                this.mongoose.Promise = Promise;
                this.mongoose.connect(MONGODB_URI, {useMongoClient: true})
                    .then(() => { logger.info("  >Conexion establecida con mongoDB."); })
                    .catch(err => { logger.error("  >Error de conexion a la DB. (Posiblemente no tengas mongoDB lanzado en local)" + err); /* process.exit();*/ });
                this.mongoose.connection.db.dropDatabase()
                    .then(() => {
                        logger.info("DB borrada con exito.");
                        resolve(true);
                    })
                    .catch((err: any) => {
                        logger.error("Error al borrar DB. " + err);
                        resolve(false);
                    });
            }, 100);
        });
        return promise;
     }

    async delete2(): Promise<any> {
        const promise = await new Promise((resolve, reject) => {
            setTimeout(() => {
                ExerciseSchema.remove({}, function(err) {
                    console.log('collection removed')
                });
                ItinerarySchema.remove({}, function(err) {
                    console.log('collection removed')
                });
                SessionSchema.remove({}, function(err) {
                    console.log('collection removed')
                });
                Justification.remove({}, function(err) {
                    console.log('collection removed')
                });
                LessonSchema.remove({}, function(err) {
                    console.log('collection removed')
                });
                RelationSchema.remove({}, function(err) {
                    console.log('collection removed')
                });
                SessionSchema.remove({}, function(err) {
                    console.log('collection removed')
                });
                SolutionSchema.remove({}, function(err) {
                    console.log('collection removed')
                });
                UnitSchema.remove({}, function(err) {
                    console.log('collection removed')
                });
                VideoSchema.remove({}, function(err) {
                    console.log('collection removed')
                });
            }, 100);
        });
        return promise;
    }


}
