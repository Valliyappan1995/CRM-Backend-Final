import { ContactModel } from "../models/Contact.js";

const createContact = async (req, res) => {
  const { name, email, department, phoneNumber, address } = req.body;

  console.log("Received request body:", req.body);

  try {
    const newContact = new ContactModel({
      name,
      email,
      department,
      phoneNumber,
      address,
      postedBy: req.user._id,
    });

    const result = await newContact.save();
    console.log("Contact created successfully:", result);
    return res.status(201).json({ success: true, ...result._doc });
  } catch (err) {
    if (err.code === 11000) {
      console.error("Duplicate key error:", err);
      return res.status(400).json({ error: "Email already exists" });
    }
    console.error("Error creating contact:", err);
    return res.status(500).json({ error: err.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const displaycontacts = await ContactModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, displaycontacts });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getContact = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "Invalid" });
  }
  try {
    const displaycontacts = await ContactModel.findOne({ _id: id });
    return res.status(200).json({ success: true, ...displaycontacts._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "Invalid" });
  }
  try {
    const result = await ContactModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({ success: true, ...result._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "Invalid" });
  }
  try {
    const displayContact = await ContactModel.findOne({ _id: id });
    if (!displayContact) {
      return res.status(401).json({ error: "No Record Existed" });
    }
    const deleteRecord = await ContactModel.findByIdAndDelete({ _id: id });
    const displayContacts = await ContactModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, displayContacts });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { createContact, getContacts, getContact, updateContact, deleteContact };
