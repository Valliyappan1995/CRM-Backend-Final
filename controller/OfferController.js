import { OfferModel } from "../models/offer.js";

const createOffer = async (req, res) => {
  const { name, email, department, employees, vendor } = req.body;

  console.log("Received request body:", req.body);

  try {
    const newOffer = new OfferModel({
      name,
      email,
      department,
      employees,
      vendor,
      postedBy: req.user._id,
    });

    const result = await newOffer.save();
    console.log("Offer created successfully:", result);
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

const getOffers = async (req, res) => {
  try {
    const displayoffers = await OfferModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, displayoffers });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getOffer = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "Invalid" });
  }
  try {
    const displayoffers = await OfferModel.findOne({ _id: id });
    return res.status(200).json({ success: true, ...displayoffers._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateOffer = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "Invalid" });
  }
  try {
    const result = await OfferModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({ success: true, ...result._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteOffer = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "Invalid" });
  }
  try {
    const displayOffer = await OfferModel.findOne({ _id: id });
    if (!displayOffer) {
      return res.status(401).json({ error: "No Record Existed" });
    }
    const deleteRecord = await OfferModel.findByIdAndDelete({ _id: id });
    // const displayOffers = await OfferModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, ...displayOffer._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { createOffer, getOffers, getOffer, updateOffer, deleteOffer };
