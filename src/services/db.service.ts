import fs from "fs";
import { MONGODB_URI } from "../util/secrets";
import dookie from "dookie";
import logger from "../util/logger";

export class DbService {
    private yaml: any;

    constructor() {
        this.yaml = require("js-yaml");
    }

    seedDb(): Promise<boolean> {
        const contents = fs.readFileSync("./src/config/test.yml", "utf8");
        const parsed = this.yaml.safeLoad(contents);
        // const backupDb = JSON.parse(fs.readFileSync("../config/backupDb.json", "utf8"));
         return dookie.push(MONGODB_URI, parsed)
             .then(() => {
                 logger.info("Base de datos poblada");
                return true;
             })
             .catch ( err => {
                 logger.error("Error al poblar la base de datos");
                 return false;
             });
    }
    saveDbInBackup(): Promise<boolean> {
         return dookie.pull(MONGODB_URI)
             .then((res) => {
                fs.writeFileSync("./src/config/backupDb.json", res);
                logger.info("Backup de base de datos realizada en: /config/backupDb.json");
                return true;
            })
            .catch ( err => {
                logger.error("Error al realizar el backup de la base de datos");
                return false;
            });
    }
}
