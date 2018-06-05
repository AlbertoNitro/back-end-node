import express from "express";
import { JustificationController } from "../../controllers/justification.controller";

const justificationRoutes = express.Router();
const justificationController: JustificationController = new JustificationController();

justificationRoutes.post("", (req, res) => {
    justificationController.create(req, res);
});
justificationRoutes.get("/", (req, res) => {
    justificationController.findAll(req, res);
});
justificationRoutes.get("/:id", (req, res) => {
    justificationController.findById(req, res);
});
justificationRoutes.get("/:id/search", (req, res) => {
    justificationController.findByIdAndIsCorrect(req, res);
});
justificationRoutes.delete("/:id", (req, res) => {
    justificationController.delete(req, res);
});

export default justificationRoutes;