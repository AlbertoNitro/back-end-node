import mongoose from "mongoose";

const AutoIncrement = require("mongoose-sequence")(mongoose);

const Slider = new mongoose.Schema({
    _id: Number,
    url: { type: String, required: true },
});
Slider.plugin(AutoIncrement);

const SliderSchema = mongoose.model("Slider", Slider);
export default SliderSchema;