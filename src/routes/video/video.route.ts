import express from "express";
import { VideoController } from "../../controllers/video.controller";

const videoRoutes = express.Router();
const videoController: VideoController = new VideoController();

videoRoutes.post("", (req, res) => {
    videoController.create(req, res);
});
videoRoutes.get("/:id", (req, res) => {
    videoController.findById(req, res);
});
videoRoutes.delete("/:id", (req, res) => {
    videoController.delete(req, res);
});
videoRoutes.put("/:id", (req, res) => {
    // videoController.update(req, res);
});
export default videoRoutes;