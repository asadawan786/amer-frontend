import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = Router();

const ADMIN_USERNAME = process.env.BLOG_ADMIN_USERNAME || "DAFZA";
const ADMIN_PASSWORD = process.env.BLOG_ADMIN_PASSWORD || "8888";
const JWT_SECRET = process.env.JWT_SECRET || "amer-center-secret-change-in-production";

// POST /api/blog-portal/login
router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { username, role: "admin" },
      JWT_SECRET,
      { expiresIn: "8h" }
    );
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

export default router;
