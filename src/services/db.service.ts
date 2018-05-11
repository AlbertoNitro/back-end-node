import fs from "fs";
import { MONGODB_URI } from "../util/secrets";
import logger from "../util/logger";
import mongoose from "mongoose";

export class DbService {
    private yaml: any;
    private dookie: any;

    constructor() {
        this.yaml = require("js-yaml");
        this.dookie = require("dookie");
    }

    seed(): Promise<boolean> {
        const contents = fs.readFileSync("./src/config/test.yml", "utf8");
        const parsed = this.yaml.safeLoad(contents);
        // const backupDb = JSON.parse(fs.readFileSync("./src/config/backupDb.json", "utf8"));
        // return dookie.push(MONGODB_URI, backupDb)
         return this.dookie.push(MONGODB_URI, parsed)
             .then(() => {
                 logger.info("Base de datos poblada");
                return true;
             })
             .catch ( (err: any)  => {
                 logger.error("Error al poblar la base de datos");
                 return false;
             });
    }

    saveInBackup(): Promise<boolean> {
         return this.dookie.pull(MONGODB_URI)
             .then((res: any) => {
                fs.writeFileSync("./src/config/backupDb.json", res);
                logger.info("Backup de base de datos realizada en: /config/backupDb.json");
                return true;
            })
            .catch ( (err: any) => {
                logger.error("Error al realizar el backup de la base de datos");
                return false;
            });
    }

    delete() {
        logger.info("Base de datos borrada.");
        logger.error("Error al intentar borrar la base de datos.");
        mongoose.connect(MONGODB_URI, {useMongoClient: true})
            .then(() => { logger.info("  >Connected to MongoDB Database! \n"); })
            .catch(err => { logger.error("  >MongoDB connection error. Please make sure MongoDB is running. " + err); });
        mongoose.connection.db.dropDatabase();
        return true;
    }



}
