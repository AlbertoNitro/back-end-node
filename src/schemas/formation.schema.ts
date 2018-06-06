import mongoose from "mongoose";

const Formation = new mongoose.Schema({
}, { discriminatorKey: "kind" , collection: "formations"});

const FormationSchema = mongoose.model("Interaction", Formation);
export default FormationSchema;