import express from "express";
import { InteractionController } from "../../controllers/interaction.controller";

const interactionRoutes = express.Router();
const interactionController: InteractionController = new InteractionController();

interactionRoutes.post("", (req, res) => {
    interactionController.create2(req, res);
});

<<<<<<< HEAD
interactionRoutes.get("", (req, res) => {
    interactionController.findAll(req, res);
});
=======
>>>>>>> origin/develop
export default interactionRoutes;
