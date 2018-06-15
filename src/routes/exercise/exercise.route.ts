import express from "express";
import { ExerciseController } from "../../controllers/exercise.controller";

const exerciseRoutes = express.Router();
const exerciseController: ExerciseController = new ExerciseController();

exerciseRoutes.post("", (req, res) => {
    exerciseController.create(req, res);
});
exerciseRoutes.get("/:id", (req, res) => {
    exerciseController.findById(req, res);
});
exerciseRoutes.delete("/:id", (req, res) => {
    exerciseController.delete(req, res);
});
exerciseRoutes.put("/:id", (req, res) => {
    exerciseController.update(req, res);
});

export default exerciseRoutes;