import mongoose from "mongoose";
import InteractionSchema from "./interaction.schema";

const Video = new mongoose.Schema({
    url: { type: String, required: true },
});

const VideoSchema = InteractionSchema.discriminator("Video", Video);
export default VideoSchema;