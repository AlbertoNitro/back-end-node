import express from "express";
import { VideoController } from "../../controllers/video.controller";

const videoRoutes = express.Router();
const videoController: VideoController = new VideoController();

const ID = "/:id";

videoRoutes.post("", (req, res) => {
    videoController.create(req, res);
});
videoRoutes.get(ID, (req, res) => {
    videoController.findById(req, res);
});
videoRoutes.delete(ID, (req, res) => {
    videoController.delete(req, res);
});
videoRoutes.put(ID, (req, res) => {
    videoController.update(req, res);
});
export default videoRoutes;