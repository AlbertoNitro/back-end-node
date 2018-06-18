import express from "express";
import { LessonController } from "../../controllers/lesson.controller";

const lessonRoutes = express.Router();
const lessonController: LessonController = new LessonController();

lessonRoutes.post("", (req, res) => {
    lessonController.create(req, res);
});
lessonRoutes.get("/:id", (req, res) => {
    lessonController.findById(req, res);
});
lessonRoutes.delete("/:id", (req, res) => {
    lessonController.delete(req, res);
});
lessonRoutes.put("/:id", (req, res) => {
    lessonController.update(req, res);
});

export default lessonRoutes;