import mongoose from "mongoose";

const Solution = new mongoose.Schema({
    isCorrect: { type: Boolean, required: true },
    justifications: { type: [mongoose.Schema.Types.ObjectId], ref: "Justification", default: [], autopopulate: true },
    text: { type: String, required: true },
});

Solution.plugin(require(`mongoose-autopopulate`));

const SolutionSchema = mongoose.model("Solution", Solution);
export default SolutionSchema;