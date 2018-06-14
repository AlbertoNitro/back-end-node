import mongoose from "mongoose";
import FormationSchema from "./formation.schema";

const Itinerary = new mongoose.Schema({
    name: { type: String, required: true },
    formations: { type: [mongoose.Schema.Types.ObjectId], ref: "Formation", default: [], autopopulate: { maxDepth: 10 } },
});

Itinerary.plugin(require(`mongoose-autopopulate`));

const ItinerarySchema = FormationSchema.discriminator("Itinerary", Itinerary);
export default ItinerarySchema;