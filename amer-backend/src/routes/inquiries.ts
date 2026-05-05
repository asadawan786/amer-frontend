import { Router, Request, Response } from "express";
import { z } from "zod";
import { Inquiry } from "../models/Inquiry";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

const createInquirySchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
});

// POST /api/inquiries - create inquiry
router.post("/", async (req: Request, res: Response) => {
  try {
    const data = createInquirySchema.parse(req.body);
    const inquiry = await Inquiry.create(data);
    res.status(201).json(inquiry);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.errors[0]?.message ?? "Invalid request" });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/inquiries - list all (protected)
router.get("/", requireAuth, async (_req: Request, res: Response) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/inquiries/:id/status - update status (protected)
router.patch("/:id/status", requireAuth, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    if (!status || !["new", "in_progress", "resolved"].includes(status)) {
      return res.status(400).json({ message: "Valid status is required" });
    }
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.json(inquiry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
