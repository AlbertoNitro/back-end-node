import mongoose from "mongoose";

const AutoIncrement = require("mongoose-sequence")(mongoose);
const Solution = new mongoose.Schema({
    _id: Number,
    isCorrect: { type: Boolean, required: true },
    justifications: { type: [mongoose.Schema.Types.Number], ref: "Justification", required: true },
    text: { type: String, required: true },
}, { _id: false });
Solution.plugin(AutoIncrement);

const SolutionSchema = mongoose.model("Solution", Solution);
export default SolutionSchema;