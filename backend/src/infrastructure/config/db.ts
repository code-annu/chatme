import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI!;
let DATABASE_NAME = process.env.DATABASE_NAME!;
const ENVIRONMENT = process.env.NODE_ENV!;
if (ENVIRONMENT !== "development") {
  DATABASE_NAME = "chatme";
}
export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: DATABASE_NAME });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (err) {
    console.error("MongoDB disconnection error:", err);
    process.exit(1);
  }
}