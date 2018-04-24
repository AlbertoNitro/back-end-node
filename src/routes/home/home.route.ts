import * as homeController from "../../controllers/home.controller";
import express from "express";


const homeRoutes = express.Router();

homeRoutes.get("/", homeController.index);

export default homeRoutes;
