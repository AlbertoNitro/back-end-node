import { HomeController } from "../../controllers/home.controller";
import express from "express";
import { UnitService } from "../../services/unit.service";

const homeRoutes = express.Router();
const homeController: HomeController = new HomeController();

// homeRoutes.get("/prueba", homeController.forceCreateUnit);
homeRoutes.get("/prueba", (req, res) => {
    homeController.forceCreateUnit(req, res);
});

export default homeRoutes;
