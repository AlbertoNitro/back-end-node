import express from "express";
import { DbController } from "../../controllers/db.controller";

const dbRoutes = express.Router();
const dbController: DbController = new DbController();

const PASSWORD = "/:password";

dbRoutes.post("/seed" + PASSWORD, (req, res) => {
    dbController.seed(req, res);
});
dbRoutes.get("/doBackup" + PASSWORD, (req, res) => {
    dbController.doBackup(req, res);
});
dbRoutes.delete("/delete" + PASSWORD, (req, res) => {
    dbController.delete(req, res);
});

export default dbRoutes;