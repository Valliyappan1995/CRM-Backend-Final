import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  department: {
    type: String,
    require: true,
  },
  employees: {
    type: Number,
    require: true,
  },
  vendor: {
    type: String,
    require: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const ContactModel = mongoose.model("contacts", ContactSchema);
export { ContactModel };
