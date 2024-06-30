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
  createInteraction,
  getInteractions,
  getInteraction,
  updateInteraction,
  deleteInteraction,
} from "../controller/interactionController.js";
import {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
} from "../controller/leadController.js";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controller/taskController.js";
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

//interaction routes
router.post("/interactions", VerifyUser, createInteraction);
router.get("/interactions", VerifyUser, getInteractions);
router.get("/interactions/:id", VerifyUser, getInteraction);
router.put("/interactions/:id", VerifyUser, updateInteraction);
router.delete("/interactions/:id", VerifyUser, deleteInteraction);

// Lead routes
router.post("/leads", VerifyUser, createLead);
router.get("/leads", VerifyUser, getLeads);
router.get("/leads/:id", VerifyUser, getLead);
router.put("/leads/:id", VerifyUser, updateLead);
router.delete("/leads/:id", VerifyUser, deleteLead);

// Task routes
router.post("/tasks", VerifyUser, createTask);
router.get("/tasks", VerifyUser, getTasks);
router.get("/tasks/:id", VerifyUser, getTask);
router.put("/tasks/:id", VerifyUser, updateTask);
router.delete("/tasks/:id", VerifyUser, deleteTask);

export { router as Router };
