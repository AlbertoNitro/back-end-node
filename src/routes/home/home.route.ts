import * as homeController from "../../controllers/home";
import express from "express";


const homeRoutes = express.Router();

homeRoutes.get("/", homeController.index);

export default homeRoutes;
