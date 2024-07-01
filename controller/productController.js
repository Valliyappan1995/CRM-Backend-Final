import { ProductModel } from "../models/Product.js";

const createProduct = async (req, res) => {
  const { name, category, price, stock } = req.body;

  try {
    const newProduct = new ProductModel({
      name,
      category,
      price,
      stock,
      postedBy: req.user._id,
    });

    const result = await newProduct.save();
    return res.status(201).json({ success: true, ...result._doc });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Product already exists" });
    }
    return res.status(500).json({ error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, products });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "Invalid" });
  }
  try {
    const product = await ProductModel.findOne({ _id: id });
    return res.status(200).json({ success: true, ...product._doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "Invalid" });
  }
  try {
    const result = await ProductModel.updateOne(
      { _id: id },
      {
        $set: {
          name: req.body.name,
          category: req.body.category,
          price: req.body.price,
          stock: req.body.stock,
        },
      }
    );
    const products = await ProductModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, ...result._doc, products });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "Invalid" });
  }
  try {
    const result = await ProductModel.deleteOne({ _id: id });
    const products = await ProductModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, ...result, products });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
