import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

console.log("Database URL:", process.env.DATABASE_URL);
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });
