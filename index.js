import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Router } from "./routes/routes.js";
import "./config/db.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config({ path: "./config/.env" });

app.get("/", (req, res) => {
  res.send("Website works Perfectly");
});

app.use("/bestcrm", Router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
