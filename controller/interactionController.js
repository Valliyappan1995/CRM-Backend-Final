import { InteractionModel } from "../models/interaction.js";

const createInteraction = async (req, res) => {
  const { type, date, notes, contact } = req.body;

  try {
    const newInteraction = new InteractionModel({
      type,
      date,
      notes,
      contact,
      postedBy: req.user._id,
    });

    const result = await newInteraction.save();
    return res.status(201).json({ success: true, ...result._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getInteractions = async (req, res) => {
  try {
    const interactions = await InteractionModel.find({
      postedBy: req.user._id,
    });
    return res.status(200).json({ success: true, interactions });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getInteraction = async (req, res) => {
  const { id } = req.params;
  try {
    const interaction = await InteractionModel.findOne({ _id: id });
    return res.status(200).json({ success: true, ...interaction._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateInteraction = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await InteractionModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({ success: true, ...result._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteInteraction = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteRecord = await InteractionModel.findByIdAndDelete({ _id: id });
    const interactions = await InteractionModel.find({
      postedBy: req.user._id,
    });
    return res.status(200).json({ success: true, interactions });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export {
  createInteraction,
  getInteractions,
  getInteraction,
  updateInteraction,
  deleteInteraction,
};
