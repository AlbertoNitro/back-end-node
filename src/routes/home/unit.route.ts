import { HomeController } from "../../controllers/unit.controller";
import express from "express";
import { UnitService } from "../../services/unit.service";

const homeRoutes = express.Router();
const homeController: HomeController = new HomeController();

homeRoutes.post("", (req, res) => {
    homeController.create(req, res);
});

homeRoutes.get("/search/:name", (req, res) => {
    homeController.findByName(req, res);
});

export default homeRoutes;
