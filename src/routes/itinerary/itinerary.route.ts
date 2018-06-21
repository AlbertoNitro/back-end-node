import express from "express";
import { ItineraryController } from "../../controllers/itinerary.controller";

const itineraryRoutes = express.Router();
const itineraryController: ItineraryController = new ItineraryController();

const ID = "/:id";

itineraryRoutes.post("", (req, res) => {
    itineraryController.create(req, res);
});
itineraryRoutes.get(ID, (req, res) => {
    itineraryController.findById(req, res);
});
itineraryRoutes.delete(ID, (req, res) => {
    itineraryController.delete(req, res);
});
itineraryRoutes.put(ID, (req, res) => {
    itineraryController.update(req, res);
});
itineraryRoutes.get("", (req, res) => {
    itineraryController.findAll(req, res);
});

export default itineraryRoutes;
