import express from "express";
import homeRoutes from "./home/home.route";

const api = express.Router();

api.use("/home", homeRoutes);

export default api;