import mongoose from "mongoose";

const DealSchema = new mongoose.Schema({
  dealName: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  stage: {
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
  },
});

const DealModel = mongoose.model("deals", DealSchema);
export { DealModel };
