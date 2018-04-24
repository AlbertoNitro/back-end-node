import { HomeController } from "../../controllers/unit.controller";
import express from "express";
import { UnitService } from "../../services/unit.service";

const homeRoutes = express.Router();
const homeController: HomeController = new HomeController();

homeRoutes.get("/forceCreate", (req, res) => {
    homeController.forceCreateUnit(req, res);
});

export default homeRoutes;
