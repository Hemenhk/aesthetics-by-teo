import { ObjectId } from "mongodb";
import mongoose, { Document, Model, mongo } from "mongoose";

export interface TreatmentDocument extends Document {
  productHandle: string;
  review: string;
  rating: number;
}

interface TreatmentModel extends Model<TreatmentDocument> {
  calculateReviewStats(title: string): Promise<any>; // Adjust the return type as needed
}

const treatmentsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A product must have a title"],
      trim: true,
      maxLength: [250, "A product must have less or equal to 250 chars"],
      minLength: [1, "A product must have more or equal to 10 chars"],
    },
    description: {
      type: String,
      required: [true, "A product must have a description"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Ratings must be above 1.0"],
      max: [5, "Ratings must be 5.0 or less"],
      set: (val) => Math.round(val * 10) / 10,
    },
    imageCover: {
      type: String,
      default: "https://res.cloudinary.com/hemen/image/upload/v1696246559/default_post_kh6p7i.webp"
    },
    images: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
treatmentsSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

const Treamtent: TreatmentModel = (mongoose.models.Treatment ||
  mongoose.model<TreatmentDocument>(
    "Treatment",
    treatmentsSchema
  )) as TreatmentModel;

export default Treamtent;
