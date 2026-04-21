import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: {
    type: String,
    enum: ["new", "contacted", "closed"],
    default: "new"
  }
}, { timestamps: true });

const Lead = mongoose.model("Lead", leadSchema);
export default Lead; 