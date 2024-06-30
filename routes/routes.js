import express from "express";
import { Register, Login, Auth } from "../controller/userController.js";
import { body } from "express-validator";
import { VerifyUser } from "../middleware/VerifyUser.js";
import {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} from "../controller/contactController.js";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const router = express.Router();

// user routes
router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name should not be empty"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email should not be empty")
      .isEmail()
      .withMessage("Invalid Email"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password should not be empty")
      .isLength({ min: 5, max: 30 })
      .withMessage("Password length should be 5-30 characters"),
  ],
  Register
);

router.post(
  "/login",
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email should not be empty")
      .isEmail()
      .withMessage("Invalid Email"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password should not be empty")
      .isLength({ min: 5, max: 30 })
      .withMessage("Password length should be 5-30 characters"),
  ],
  Login
);

router.get("/verify", VerifyUser, Auth);

// contact routes
router.post("/contacts", VerifyUser, createContact);
router.get("/displaycontacts", VerifyUser, getContacts);
router.get("/displaycontacts/:id", VerifyUser, getContact);
router.put("/update-contact/:id", VerifyUser, updateContact);
router.delete("/displaycontacts/:id", VerifyUser, deleteContact);

// product routes
// Create a new product
router.post(
  "/bestcrm/products",
  VerifyUser,
  [
    body("name").notEmpty().withMessage("Product name is required"),
    body("description")
      .notEmpty()
      .withMessage("Product description is required"),
    body("price").notEmpty().withMessage("Product price is required"),
    body("quantity").notEmpty().withMessage("Product quantity is required"),
  ],
  createProduct
);

// Get all products
router.get("/bestcrm/products", VerifyUser, getProducts);

// Get a product by ID
router.get("/bestcrm/products/:id", VerifyUser, getProduct);

// Update a product
router.put(
  "/bestcrm/update-product/:id",
  VerifyUser,
  [
    body("name").notEmpty().withMessage("Product name is required"),
    body("description")
      .notEmpty()
      .withMessage("Product description is required"),
    body("price").notEmpty().withMessage("Product price is required"),
    body("quantity").notEmpty().withMessage("Product quantity is required"),
  ],
  updateProduct
);

// Delete a product
router.delete("/bestcrm/delete-product/:id", VerifyUser, deleteProduct);

export { router as Router };
