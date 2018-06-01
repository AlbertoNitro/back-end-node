import mongoose, { Schema } from "mongoose";
import InteractionSchema from "./interaction.schema";

const Video = new Schema({
    url: { type: String },
});

const VideoSchema = InteractionSchema.discriminator("Video", Video);
export default VideoSchema;