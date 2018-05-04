import { UnitController } from "../../controllers/unit.controller";
import express from "express";
import { UnitService } from "../../services/unit.service";

const unitRoutes = express.Router();
const unitController: UnitController = new UnitController();

unitRoutes.post("", (req, res) => {
    unitController.create(req, res);
});
unitRoutes.get("/search/:name", (req, res) => {
    unitController.findByName(req, res);
});
unitRoutes.get("", (req, res) => {
    unitController.findAll(req, res);
});
unitRoutes.delete("/:id", (req, res) => {
    unitController.delete(req, res);
});

export default unitRoutes;
