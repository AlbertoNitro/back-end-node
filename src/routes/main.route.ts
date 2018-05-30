import dbRoutes from "./db/db.route";
import exerciseRoutes from "./exercise/exercise.route";
import express from "express";
import justificationRoutes from "./justification/justification.route";
import lessonRoutes from "./lesson/lesson.route";
import lessonsItineraryRoutes from "./lessonsItinerary/lessonsItinerary.route";
import relationRoutes from "./relation/relation.route";
import sessionRoutes from "./session/session.route";
import sessionsItineraryRoutes from "./sessionsItinerary/sessionsItinerary.route";
import solutionRoutes from "./solution/solution.route";
import unitRoutes from "./unit/unit.route";

const api = express.Router();

api.use("/db", dbRoutes);
api.use("/exercise", exerciseRoutes);
api.use("/justification", justificationRoutes);
api.use("/lesson", lessonRoutes);
api.use("/lessonsItinerary", lessonsItineraryRoutes);
api.use("/relation", relationRoutes);
api.use("/session", sessionRoutes);
api.use("/sessionsItinerary", sessionsItineraryRoutes);
api.use("/solution", solutionRoutes);
api.use("/unit", unitRoutes);

export default api;