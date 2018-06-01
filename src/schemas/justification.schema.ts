import mongoose from "mongoose";

const Justification = new mongoose.Schema({
    _id: Number,
    isCorrect: { type: Boolean, required: true },
    text: { type: String, required: true },
});


const JustificationSchema = mongoose.model("Justification", Justification);
export default JustificationSchema;