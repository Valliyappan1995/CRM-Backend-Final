import { LeadModel } from "../models/Leads.js";

const createLead = async (req, res) => {
  const { name, email, company, status, assignedTo } = req.body;

  console.log("Received request body:", req.body);

  try {
    const newLead = new LeadModel({
      name,
      email,
      company,
      status,
      assignedTo,
      postedBy: req.user._id,
    });

    const result = await newLead.save();
    console.log("Lead created successfully:", result);
    return res.status(201).json({ success: true, ...result._doc });
  } catch (err) {
    if (err.code === 11000) {
      console.error("Duplicate key error:", err);
      return res.status(400).json({ error: "Email already exists" });
    }
    console.error("Error creating lead:", err);
    return res.status(500).json({ error: err.message });
  }
};

const getLeads = async (req, res) => {
  try {
    const displayLeads = await LeadModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, displayLeads });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getLead = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "Invalid" });
  }
  try {
    const displayLead = await LeadModel.findOne({ _id: id });
    return res.status(200).json({ success: true, ...displayLead._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateLead = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "Invalid" });
  }
  try {
    const result = await LeadModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({ success: true, ...result._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteLead = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "Invalid" });
  }
  try {
    const displayLead = await LeadModel.findOne({ _id: id });
    if (!displayLead) {
      return res.status(401).json({ error: "No Record Existed" });
    }
    const deleteRecord = await LeadModel.findByIdAndDelete({ _id: id });
    const displayLeads = await LeadModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, ...displayLeads._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { createLead, getLeads, getLead, updateLead, deleteLead };
