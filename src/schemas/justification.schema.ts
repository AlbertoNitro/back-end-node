import mongoose from "mongoose";

const AutoIncrement = require("mongoose-sequence")(mongoose);
const Justification = new mongoose.Schema({
    _id: Number,
    isCorrect: { type: Boolean, required: true },
    text: { type: String, required: true },
});
Justification.plugin(AutoIncrement);


const JustificationSchema = mongoose.model("Justification", Justification);
export default JustificationSchema;