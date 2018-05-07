import express from "express";
import { DbController } from "../../controllers/db.controller";

const dbRoutes = express.Router();
const dbController: DbController = new DbController();

dbRoutes.get("seedDb", (req, res) => {
    dbController.seedDb(req, res);
});

dbRoutes.get("saveDbInBackup", (req, res) => {
    dbController.saveDbInBackup(req, res);
});

export default dbRoutes;