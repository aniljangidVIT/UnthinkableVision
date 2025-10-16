import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/products.js";
import cors from "cors";

dotenv.config();

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(process.env.FRONTEND_URL, process.env.FRONTEND_PROD_URL);

// Use env variables for CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_PROD_URL,
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  })
);

const startServer = async () => {
  await connectDB();

  app.use("/api/products", productRoutes);

  app.get("/", (req, res) => res.send("API is running..."));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();
