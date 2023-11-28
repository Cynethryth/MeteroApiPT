import mongoose from "mongoose";
const { Schema } = mongoose;

const Reviews = new Schema({
  petSitterId: String,
  rating: Number,
  comment: String,
});

export default mongoose.model("Reviews", Reviews);
