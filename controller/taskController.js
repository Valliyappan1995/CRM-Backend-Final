import { TaskModel } from "../models/Tasks.js";

const createTask = async (req, res) => {
  const { taskName, description, priority, dueDate, assignedTo } = req.body;

  console.log("Received request body:", req.body);

  try {
    const newTask = new TaskModel({
      taskName,
      description,
      priority,
      dueDate: new Date(dueDate),
      assignedTo,
      postedBy: req.user._id,
    });

    const result = await newTask.save();
    console.log("Task created successfully:", result);
    return res.status(201).json({ success: true, ...result._doc });
  } catch (err) {
    console.error("Error creating task:", err);
    return res.status(500).json({ error: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const displayTasks = await TaskModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, displayTasks });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "Invalid" });
  }
  try {
    const displayTask = await TaskModel.findOne({ _id: id });
    return res.status(200).json({ success: true, ...displayTask._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "Invalid" });
  }
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
  if (!id) {
    return res.status(401).json({ error: "Invalid" });
  }
  try {
    const displayTask = await TaskModel.findOne({ _id: id });
    if (!displayTask) {
      return res.status(401).json({ error: "No Record Existed" });
    }
    const deleteRecord = await TaskModel.findByIdAndDelete({ _id: id });
    const displayTasks = await TaskModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, displayTasks });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { createTask, getTasks, getTask, updateTask, deleteTask };
