import express from "express";
import { InteractionController } from "../../controllers/interaction.controller";

const interactionRoutes = express.Router();
const interactionController: InteractionController = new InteractionController();

interactionRoutes.post("", (req, res) => {
    interactionController.create(req, res);
});

interactionRoutes.get("", (req, res) => {
    console.log("Holahola");
    interactionController.findAll(req, res);
});
export default interactionRoutes;
