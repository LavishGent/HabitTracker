import express, { Request, Response } from "express";
import connectDB from "./db/connectDB";

const app = express();
const PORT = process.env.PORT || 8080;

const uri =
  "mongodb+srv://lavishgent:foMc6OiCzBhPVbvQ@cluster0.zatrz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
connectDB(uri);

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Node.js!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
