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
                logger.info("Abriendo conexion a la DB para proceder a eliminarla.");
                mongoose.connection.db.dropDatabase()
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
}
