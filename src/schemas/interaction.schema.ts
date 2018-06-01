import mongoose from "mongoose";

const Interaction = new mongoose.Schema({
    name: String
}, { discriminatorKey: "kind" });

const InteractionSchema = mongoose.model("Interaction", Interaction);
export default InteractionSchema;