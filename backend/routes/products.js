import express from "express";
import multer from "multer";
import { searchSimilarProducts } from "../controllers/productsController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// POST /api/products/search → file or URL + optional filters
router.post("/search", upload.single("file"), searchSimilarProducts);

export default router;
