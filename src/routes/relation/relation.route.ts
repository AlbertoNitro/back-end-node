import express from "express";
import { RelationController } from "../../controllers/relation.controller";

const relationRoutes = express.Router();
const relationController: RelationController = new RelationController();

relationRoutes.post("", (req, res) => {
    relationController.create(req, res);
});

export default relationRoutes;