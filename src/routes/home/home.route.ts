import * as homeController from "../../controllers/home.controller";
import express from "express";


const homeRoutes = express.Router();

homeRoutes.get("/prueba", homeController.index);

export default homeRoutes;
