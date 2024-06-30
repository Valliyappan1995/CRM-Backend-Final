import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import dotenv from "dotenv";
import path from "path";

// Correctly specify the path to the .env file
dotenv.config({ path: path.resolve() + "/config/.env" });

console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY); // Log the secret key

export const VerifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("Received token:", token); // Log the token

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
      if (err) {
        console.error("JWT verification error:", err);
        return res.status(401).json({ error: "Unauthorized." });
      }
      try {
        const user = await UserModel.findOne({ _id: payload._id }).select(
          "-password"
        );
        if (!user) {
          return res.status(401).json({ error: "User not found." });
        }
        req.user = user;
        next();
      } catch (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ error: err.message });
      }
    });
  } else {
    return res.status(403).json({ error: "Forbidden" });
  }
};
