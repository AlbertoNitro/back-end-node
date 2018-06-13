import express from "express";
import { SolutionController } from "../../controllers/solution.controller";

const solutionRoutes = express.Router();
const solutionController: SolutionController = new SolutionController();

solutionRoutes.get("/", (req, res) => {
    solutionController.findAll(req, res);
});
solutionRoutes.get("/:id", (req, res) => {
    solutionController.findById(req, res);
});
solutionRoutes.delete("/:id", (req, res) => {
    solutionController.delete(req, res);
});
solutionRoutes.post("", (req, res) => {
    solutionController.create(req, res);
});
solutionRoutes.put("/:id", (req, res) => {
    solutionController.update(req, res);
});
export default solutionRoutes;