import express from "express";
import { SessionController } from "../../controllers/session.controller";

const sessionRoutes = express.Router();
const sessionController: SessionController = new SessionController();

const END_POINT = "/session";
const ID = "/:id";

sessionRoutes.post("", (req, res) => {
    sessionController.create(req, res);
});
sessionRoutes.get(ID, (req, res) => {
    sessionController.findById(req, res);
});
sessionRoutes.delete(ID, (req, res) => {
    sessionController.delete(req, res);
});
sessionRoutes.put(ID, (req, res) => {
    sessionController.update(req, res);
});

export default sessionRoutes;