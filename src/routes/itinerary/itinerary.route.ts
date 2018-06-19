import express from "express";
import { ItineraryController } from "../../controllers/itinerary.controller";

const itineraryRoutes = express.Router();
const itineraryController: ItineraryController = new ItineraryController();

itineraryRoutes.post("", (req, res) => {
    itineraryController.create(req, res);
});
itineraryRoutes.get("/:id", (req, res) => {
    itineraryController.findById(req, res);
});
itineraryRoutes.delete("/:id", (req, res) => {
    itineraryController.delete(req, res);
});
itineraryRoutes.put("/:id", (req, res) => {
    itineraryController.update(req, res);
});
itineraryRoutes.get("", (req, res) => {
    itineraryController.findAll(req, res);
});

export default itineraryRoutes;
