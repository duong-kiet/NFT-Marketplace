import mongoose from "mongoose";

export const connectDB = async (DB_URI: string) => {
  try {
    await mongoose.connect(DB_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
