import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  roles?: "user" | "admin" | "superadmin";
}

//döp till isAdmin istället?

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  roles: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user",
  },
});

export default mongoose.model<IUser>("User", UserSchema);
