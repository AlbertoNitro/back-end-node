import express from "express";
import homeRoutes from "./home/home.route";

const api = express.Router();

api.use("/pruebas", homeRoutes);

export default api;