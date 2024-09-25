import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import ownerRoutes from "./routes/ownerRoutes";
import decoratorRoutes from "./routes/decoratorRoutes";
import publicRoutes from "./routes/publicRoutes";
import firmRoutes from "./routes/firmRoutes";
import dotenv from "dotenv";

dotenv.config();

const connectionString =
  "mongodb+srv://jasnamain:E8ujAmtKdEozsCpB@mongocluster0.ax72wxh.mongodb.net/gardens24?retryWrites=true&w=majority&appName=MongoCluster0";

// Connect to the database.
mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => console.error("Could not connect to MongoDB.", err));

const app = express();

// Use CORS middleware before any routes
app.use(
  cors({
    origin: "http://localhost:4200", // Allow requests only from this frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    credentials: true, // Allow credentials like cookies, headers, etc.
  })
);

app.use(express.json()); // to properly parse req.body
app.use("/", publicRoutes); // landing page (guest) routes
app.use("/user", userRoutes); // map all user routes to ./user/...
app.use("/admin", adminRoutes); // map all admin routes to ./admin/...
app.use("/owner", ownerRoutes); // map all owner routes to ./owner/...
app.use("/decorator", decoratorRoutes); // map all decorator routes to ./decorator/...
app.use("/firm", firmRoutes); // map all firm routes to ./firm/...

// Just for debugging.
app.listen(4000, () => console.log(`Express server running on port 4000`));
