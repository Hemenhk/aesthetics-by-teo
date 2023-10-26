import mongoose, { Document, Model } from "mongoose";

export interface AdminAuthDocument extends Document {
  email: string;
  password: string;
}

const byTeoAdminAuthSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "An admin must have an email"],
  },
  password: {
    type: String,
    required: [true, "An admin must have a password"],
    minLength: 8,
    select: false,
  },
});

const ByTeoAdminAuthSchema: Model<AdminAuthDocument> =
  mongoose.models.ByTeoAdminAuthSchema ||
  mongoose.model<AdminAuthDocument>(
    "ByTeoAdminAuthSchema",
    byTeoAdminAuthSchema
  );

export default ByTeoAdminAuthSchema;
