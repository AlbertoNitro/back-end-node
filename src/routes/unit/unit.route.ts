import { UnitController } from "../../controllers/unit.controller";
import express from "express";

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

unitRoutes.get("/friends/:id", (req, res) => {
    unitController.getFriendsByUnit(req, res);
});

export default unitRoutes;
