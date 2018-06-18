import express from "express";
import { SessionController } from "../../controllers/session.controller";

const sessionRoutes = express.Router();
const sessionController: SessionController = new SessionController();

sessionRoutes.post("", (req, res) => {
    sessionController.create(req, res);
});
sessionRoutes.get("/:id", (req, res) => {
    sessionController.findById(req, res);
});
sessionRoutes.delete("/:id", (req, res) => {
    sessionController.delete(req, res);
});
sessionRoutes.put("/:id", (req, res) => {
    sessionController.update(req, res);
});

export default sessionRoutes;