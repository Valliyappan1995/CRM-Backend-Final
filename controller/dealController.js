import { DealModel } from "../models/Deals.js";
import mongoose from "mongoose";

const createDeal = async (req, res) => {
  const { dealName, value, stage, contact } = req.body;

  if (!mongoose.Types.ObjectId.isValid(contact)) {
    return res.status(400).json({ error: "Invalid contact ID" });
  }

  try {
    const newDeal = new DealModel({
      dealName,
      value,
      stage,
      contact,
      postedBy: req.user._id,
    });

    const result = await newDeal.save();
    return res.status(201).json({ success: true, ...result._doc });
  } catch (err) {
    console.error("Error creating deal:", err);
    return res.status(500).json({ error: err.message });
  }
};

const getDeals = async (req, res) => {
  try {
    const deals = await DealModel.find({ postedBy: req.user._id }).populate("contact");
    return res.status(200).json({ success: true, deals });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getDeal = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid deal ID" });
  }
  try {
    const deal = await DealModel.findById(id).populate("contact");
    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }
    return res.status(200).json({ success: true, ...deal._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateDeal = async (req, res) => {
  const { id } = req.params;
  const { contact } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid deal ID" });
  }

  if (contact && !mongoose.Types.ObjectId.isValid(contact)) {
    return res.status(400).json({ error: "Invalid contact ID" });
  }

  try {
    const result = await DealModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ error: "Deal not found" });
    }
    return res.status(200).json({ success: true, ...result._doc });
  } catch (err) {
    console.error("Error updating deal:", err);
    return res.status(500).json({ error: err.message });
  }
};

const deleteDeal = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid deal ID" });
  }
  try {
    const deal = await DealModel.findByIdAndDelete(id);
    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }
    const deals = await DealModel.find({ postedBy: req.user._id }).populate("contact");
    return res.status(200).json({ success: true, deals });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { createDeal, getDeals, getDeal, updateDeal, deleteDeal };
