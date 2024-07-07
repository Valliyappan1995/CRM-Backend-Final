import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  priority: {
    type: String,
    require: true,
  },
  dueDate: {
    type: Date,
    require: true,
  },
  assignedTo: {
    type: String,
    require: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const TaskModel = mongoose.model("tasks", TaskSchema);
export { TaskModel };
