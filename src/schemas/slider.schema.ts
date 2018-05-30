import mongoose from "mongoose";

const Slider = new mongoose.Schema({
    url: { type: String, required: true },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
});

const SliderSchema = mongoose.model("Slider", Slider);
export default SliderSchema;