import express from "express";
import { DbController } from "../../controllers/db.controller";

const dbRoutes = express.Router();
const dbController: DbController = new DbController();

dbRoutes.post("/seed", (req, res) => {
    dbController.seed(req, res);
});
dbRoutes.get("/saveInBackup", (req, res) => {
    dbController.saveInBackup(req, res);
});
dbRoutes.delete("/delete", (req, res) => {
    dbController.delete(req, res);
});

export default dbRoutes;