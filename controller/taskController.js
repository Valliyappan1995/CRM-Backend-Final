import { TaskModel } from "../models/task.js";

const createTask = async (req, res) => {
  const { taskName, dueDate, status } = req.body;

  try {
    const newTask = new TaskModel({
      taskName,
      dueDate,
      status,
      postedBy: req.user._id,
    });

    const result = await newTask.save();
    return res.status(201).json({ success: true, ...result._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, tasks });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findOne({ _id: id });
    return res.status(200).json({ success: true, ...task._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await TaskModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({ success: true, ...result._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findOne({ _id: id });
    if (!task) {
      return res.status(401).json({ error: "No Record Existed" });
    }
    await TaskModel.findByIdAndDelete({ _id: id });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { createTask, getTasks, getTask, updateTask, deleteTask };
