import mongoose from "mongoose";

const Formation = new mongoose.Schema({
    name: { type: String, required: true },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
});

const FormationSchema = mongoose.model("Formation", Formation);
export default FormationSchema;