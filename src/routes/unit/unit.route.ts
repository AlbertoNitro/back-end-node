import { UnitController } from "../../controllers/unit.controller";
import express from "express";

const unitRoutes = express.Router();
const unitController: UnitController = new UnitController();

const END_POINT = "/unit";
const CODE = "/:code";

unitRoutes.get("/notrelated", (req, res) => {
    unitController.findNotRelated(req, res);
});
unitRoutes.post("", (req, res) => {
    unitController.create(req, res);
});
unitRoutes.get("/search", (req, res) => {
    unitController.findByName(req, res);
});
unitRoutes.get("", (req, res) => {
    unitController.findAll(req, res);
});
unitRoutes.delete(CODE, (req, res) => {
    unitController.delete(req, res);
});
unitRoutes.get("/friends" + CODE, (req, res) => {
    unitController.getNeighbors(req, res);
});
unitRoutes.get(CODE, (req, res) => {
    unitController.findByCode(req, res);
});
unitRoutes.put(CODE, (req, res) => {
    unitController.update(req, res);
});

export default unitRoutes;
