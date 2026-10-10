import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "VshoppingMart backend is running."
  });
});

app.listen(PORT, () => {
  console.log(`VshoppingMart backend running at http://localhost:${PORT}`);
});