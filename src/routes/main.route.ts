import express from "express";
import unitRoutes from "./unit/unit.route";
import relationRoutes from "./relation/relation.route";
import dbRoutes from "./db/db.route";

const api = express.Router();

api.use("/unit", unitRoutes);
api.use("/relation", relationRoutes);
api.use("/db", dbRoutes);

export default api;