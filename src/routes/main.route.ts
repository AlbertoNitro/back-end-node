import express from "express";
import unitRoutes from "./unit/unit.route";
import relationRoutes from "./relation/relation.route";
import dbRoutes from "./db/db.route";
import exerciseRoute from "./exercise/exercise.route";

const api = express.Router();

api.use("/unit", unitRoutes);
api.use("/relation", relationRoutes);
api.use("/exercise", exerciseRoute);
api.use("/db", dbRoutes);

export default api;