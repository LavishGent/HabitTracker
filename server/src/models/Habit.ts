import mongoose, { Document, Schema } from "mongoose";

enum Frequency {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
}

interface IHabit extends Document {
  name: string;
  description: string;
  frequency: Frequency;
  completedDates: Date[];
  userId: mongoose.Types.ObjectId;
}

const habitSchema = new Schema<IHabit>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    frequency: {
      type: String,
      required: true,
      enum: Object.values(Frequency),
    },
    completedDates: {
      type: [Date],
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model<IHabit>("Habit", habitSchema);

export { Habit, Frequency };
