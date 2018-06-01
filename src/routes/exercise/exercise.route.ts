import express from "express";
import { ExerciseController } from "../../controllers/exercise.controller";

const exerciseRoutes = express.Router();
const exerciseController: ExerciseController = new ExerciseController();

exerciseRoutes.get("", (req, res) => {
    // exerciseController.findWithSolution(req, res);
});


export default exerciseRoutes;