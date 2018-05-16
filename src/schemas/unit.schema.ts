import mongoose from "mongoose";

const AutoIncrement = require("mongoose-sequence")(mongoose);
const Unit = new mongoose.Schema({
    name: { type: String, required: true },
});
Unit.plugin(AutoIncrement, {inc_field: "code"});

const UnitSchema = mongoose.model("Unit", Unit);
export default UnitSchema;