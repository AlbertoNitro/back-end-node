import express from "express";
import { DbController } from "../../controllers/db.controller";

const dbRoutes = express.Router();
const dbController: DbController = new DbController();

dbRoutes.get("/seed", (req, res) => {
    dbController.seed(req, res);
});

dbRoutes.post("/saveInBackup", (req, res) => {
    dbController.saveInBackup(req, res);
});

dbRoutes.delete("/delete", (req, res) => {
    dbController.delete(req, res);
});

export default dbRoutes;