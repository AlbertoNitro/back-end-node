import express from "express";
import { ExerciseController } from "../../controllers/exercise.controller";

const exerciseRoutes = express.Router();
const exerciseController: ExerciseController = new ExerciseController();

const ID = "/:id";

exerciseRoutes.post("", (req, res) => {
    exerciseController.create(req, res);
});
exerciseRoutes.get(ID, (req, res) => {
    exerciseController.findById(req, res);
});
exerciseRoutes.delete(ID, (req, res) => {
    exerciseController.delete(req, res);
});
exerciseRoutes.put(ID, (req, res) => {
    exerciseController.update(req, res);
});

export default exerciseRoutes;