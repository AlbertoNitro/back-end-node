import mongoose from "mongoose";

const AutoIncrement = require("mongoose-sequence")(mongoose);
const Unit = new mongoose.Schema({
    name: { type: String, required: true },
}, { _id: false });
Unit.plugin(AutoIncrement, {
    startAt: 100,
    incrementBy: 1
});

const UnitSchema = mongoose.model("Unit", Unit);
export default UnitSchema;