import mongoose from "mongoose";

const Session = new mongoose.Schema({
    name: { type: String, required: true },
    SessionItinerary: { type: mongoose.Schema.Types.ObjectId, ref: "SessionItinerary", required: true },
});

const SessionSchema = mongoose.model("Session", Session);
export default SessionSchema;