import dbRoutes from "./db/db.route";
import exerciseRoutes from "./exercise/exercise.route";
import express from "express";
import itineraryRoutes from "./itinerary/itinerary.route";
import justificationRoutes from "./justification/justification.route";
import lessonRoutes from "./lesson/lesson.route";
import relationRoutes from "./relation/relation.route";
import sessionRoutes from "./session/session.route";
import solutionRoutes from "./solution/solution.route";
import unitRoutes from "./unit/unit.route";
import videoRoutes from "./video/video.route";

const api = express.Router();

api.use("/db", dbRoutes);
api.use("/itinerary", itineraryRoutes);
api.use("/justification", justificationRoutes);
api.use("/lesson", lessonRoutes);
api.use("/relation", relationRoutes);
api.use("/session", sessionRoutes);
api.use("/solution", solutionRoutes);
api.use("/unit", unitRoutes);

export default api;