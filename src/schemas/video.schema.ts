import { Schema } from "mongoose";
import InteractionSchema from "./interaction.schema";

const Video = new Schema({
    url: { type: String, default: undefined },
});

const VideoSchema = InteractionSchema.discriminator("Video", Video);
export default VideoSchema;