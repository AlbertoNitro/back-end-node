import express from "express";
import { LessonController } from "../../controllers/lesson.controller";

const lessonRoutes = express.Router();
const lessonController: LessonController = new LessonController();

const END_POINT = "/lesson";
const ID = "/:id";

lessonRoutes.post("", (req, res) => {
    lessonController.create(req, res);
});
lessonRoutes.get(ID, (req, res) => {
    lessonController.findById(req, res);
});
lessonRoutes.delete(ID, (req, res) => {
    lessonController.delete(req, res);
});
lessonRoutes.put(ID, (req, res) => {
    lessonController.update(req, res);
});

export default lessonRoutes;