import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Habit } from "../models/Habit";

const router = Router();

interface DecodedToken {
  id: string;
}

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  debugger;
  console.log(req);
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    debugger;
    (req as Request & { user?: DecodedToken }).user = decoded as DecodedToken;
    next();
  });
};

interface RequestWithUser extends Request {
  user?: DecodedToken;
}

// Get all habits for the user
router.get("/", authenticate, async (req: RequestWithUser, res: Response) => {
  debugger;
  const habits = await Habit.find({ userId: req.user?.id });
  res.json(habits);
});

// Create a new habit
router.post("/", authenticate, async (req: RequestWithUser, res: Response) => {
  const { name, description, frequency } = req.body;
  const habit = new Habit({
    name,
    description,
    frequency,
    userId: req.user?.id,
  });
  await habit.save();
  res.status(201).json(habit);
});

// Complete a habit
router.patch("/:id/complete", authenticate, async (req, res) => {
  const { date } = req.body;
  const habit = await Habit.findByIdAndUpdate(
    req.params.id,
    { $push: { completedDates: new Date(date) } },
    { new: true }
  );
  res.json(habit);
});

export default router;