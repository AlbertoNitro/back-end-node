import express from "express";
import { SolutionController } from "../../controllers/solution.controller";

const solutionRoutes = express.Router();
const solutionController: SolutionController = new SolutionController();

solutionRoutes.get("", (req, res) => {
    // solutionController.findall();
});

solutionRoutes.post("", (req, res) => {
    solutionController.create(req, res);
});
export default solutionRoutes;