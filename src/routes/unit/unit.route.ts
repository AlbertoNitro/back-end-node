import { UnitController } from "../../controllers/unit.controller";
import express from "express";
import { UnitService } from "../../services/unit.service";

const homeRoutes = express.Router();
const unitController: UnitController = new UnitController();

homeRoutes.post("", (req, res) => {
    unitController.create(req, res);
});
homeRoutes.get("/search/:name", (req, res) => {
    unitController.findByName(req, res);
});
homeRoutes.get("", (req, res) => {
    unitController.findAll(req, res);
});

export default homeRoutes;
