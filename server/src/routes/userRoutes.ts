import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { MongooseError } from "mongoose";

const router = Router();

// Register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
  res.json({ token, user });
});

export default router;
