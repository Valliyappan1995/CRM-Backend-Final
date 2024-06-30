import mongoose from "mongoose";

const InteractionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "contacts",
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const InteractionModel = mongoose.model("interactions", InteractionSchema);
export { InteractionModel };
