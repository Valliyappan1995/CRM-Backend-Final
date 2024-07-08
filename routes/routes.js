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
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
} from "../controller/leadController.js";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controller/taskController.js";
import {
  createDeal,
  deleteDeal,
  getDeal,
  getDeals,
  updateDeal,
} from "../controller/dealController.js";

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

// lead routes
router.post("/leads", VerifyUser, createLead);
router.get("/displayleads", VerifyUser, getLeads);
router.get("/displayleads/:id", VerifyUser, getLead);
router.put("/update-lead/:id", VerifyUser, updateLead);
router.delete("/displayleads/:id", VerifyUser, deleteLead);

// task routes
router.post("/tasks", VerifyUser, createTask);
router.get("/displaytasks", VerifyUser, getTasks);
router.get("/displaytasks/:id", VerifyUser, getTask);
router.put("/update-task/:id", VerifyUser, updateTask);
router.delete("/displaytasks/:id", VerifyUser, deleteTask);

// Deal routes
router.post("/deals", VerifyUser, createDeal);
router.get("/displaydeals", VerifyUser, getDeals);
router.get("/displaydeals/:id", VerifyUser, getDeal);
router.put("/update-deal/:id", VerifyUser, updateDeal);
router.delete("/displaydeals/:id", VerifyUser, deleteDeal);

export { router as Router };
