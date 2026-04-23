import { Router, type Request, type Response } from "express";
import { z } from "zod";

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

router.post("/", (req: Request, res: Response) => {
  const result = contactSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      success: false,
      message: result.error.errors[0].message,
    });
    return;
  }

  const { name, email, message } = result.data;

  // Log to console (replace with email service like nodemailer/resend in production)
  console.log(`📩 New contact message from ${name} <${email}>:\n${message}`);

  res.json({ success: true, message: "Message received!" });
});

export default router;
