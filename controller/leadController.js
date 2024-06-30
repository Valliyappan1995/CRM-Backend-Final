import { LeadModel } from "../models/lead.js";

const createLead = async (req, res) => {
  const { name, email, phone, company } = req.body;

  try {
    const newLead = new LeadModel({
      name,
      email,
      phone,
      company,
      postedBy: req.user._id,
    });

    const result = await newLead.save();
    return res.status(201).json({ success: true, ...result._doc });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    return res.status(500).json({ error: err.message });
  }
};

const getLeads = async (req, res) => {
  try {
    const leads = await LeadModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, leads });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getLead = async (req, res) => {
  const { id } = req.params;
  try {
    const lead = await LeadModel.findOne({ _id: id });
    return res.status(200).json({ success: true, ...lead._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateLead = async (req, res) => {
  const { id } = req.params;
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
  try {
    const lead = await LeadModel.findOne({ _id: id });
    if (!lead) {
      return res.status(401).json({ error: "No Record Existed" });
    }
    await LeadModel.findByIdAndDelete({ _id: id });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { createLead, getLeads, getLead, updateLead, deleteLead };
