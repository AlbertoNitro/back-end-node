import express from "express";
import { ExerciseController } from "../../controllers/exercise.controller";

const exerciseRoute = express.Router();
const exerciseController: ExerciseController = new ExerciseController();

exerciseRoute.get("", (req, res) => {
    exerciseController.findWithSolution(req, res);
});


export default exerciseRoute;