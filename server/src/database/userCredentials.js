import mongoose from "mongoose";

const credentialsSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },  
  token: {type: String, required: false },
  role: {type: String, default: "Admin", required: false, },
  userProfile: [{ type: mongoose.Schema.Types.ObjectId, ref: "profile" }],
});

export const userCredentials = mongoose.model("credentials", credentialsSchema);