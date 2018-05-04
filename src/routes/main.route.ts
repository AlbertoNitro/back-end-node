import express from "express";
import unitRoutes from "./unit/unit.route";
import relationRoutes from "./relation/relation.route";

const api = express.Router();

api.use("/unit", unitRoutes);
api.use("/relation", relationRoutes);

export default api;