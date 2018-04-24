import { HomeController } from "../../controllers/home.controller";
import express from "express";
import { UnitService } from "../../services/unit.service";

const homeRoutes = express.Router();
const unitService: UnitService = new UnitService();
const homeController: HomeController = new HomeController(unitService);

homeRoutes.get("/prueba", homeController.forceCreateUnit);

export default homeRoutes;
