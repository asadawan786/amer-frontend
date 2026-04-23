import mongoose, { Document, Schema } from "mongoose";

export interface IInquiry extends Document {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  message?: string;
  status: "new" | "in_progress" | "resolved";
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    service: { type: String, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ["new", "in_progress", "resolved"],
      default: "new",
    },
  },
  { timestamps: true }
);

export const Inquiry = mongoose.model<IInquiry>("Inquiry", InquirySchema);
