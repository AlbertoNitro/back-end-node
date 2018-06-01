import mongoose from "mongoose";

const AutoIncrement = require("mongoose-sequence")(mongoose);
const Solution = new mongoose.Schema({
    _id: Number,
    isCorrect: { type: Boolean, required: true },
    text: { type: String, required: true },
    justifications: { type: [mongoose.Schema.Types.Number], ref: "Justification", required: true },
});
Solution.plugin(AutoIncrement);

const SolutionSchema = mongoose.model("Solution", Solution);
export default SolutionSchema;