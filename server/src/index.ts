import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import userRoutes from "./routes/userRoutes";
import habitsRoutes from "./routes/habitsRoutes";

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

const PORT = process.env.PORT || 8080;

const uri = process.env.DB_URI;

if (!uri) {
  throw new Error("DB_URI is not defined in the environment variables");
}

connectDB(uri);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("nothing to see here");
});

app.use("/api/users", userRoutes);
app.use("/api/habits", habitsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
});
