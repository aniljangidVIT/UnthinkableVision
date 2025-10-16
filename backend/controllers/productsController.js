import Product from "../models/Product.js";
import { getImageEmbedding } from "../utils/embeddings.js";
// import { getImageEmbedding } from "../utils/embeddingsPy.js";
import cloudinary from "cloudinary";
import fs from "fs";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cosineSimilarity = (vecA, vecB) => {
  if (!Array.isArray(vecA) || !Array.isArray(vecB)) return 0;
  const dot = vecA.reduce((acc, v, i) => acc + v * (vecB[i] ?? 0), 0);
  const magA = Math.sqrt(vecA.reduce((acc, v) => acc + v * v, 0));
  const magB = Math.sqrt(vecB.reduce((acc, v) => acc + v * v, 0));
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
};

const sanitizeFilters = (filtersObj = {}) => {
  const out = {};
  for (const [k, v] of Object.entries(filtersObj)) {
    if (v === undefined || v === null) continue;
    if (typeof v === "string" && v.trim() === "") continue;
    out[k] = v;
  }
  return out;
};

export const searchSimilarProducts = async (req, res) => {
  try {
    let incomingFilters = {};
    if (req.body.filters) {
      if (typeof req.body.filters === "string") {
        try {
          incomingFilters = JSON.parse(req.body.filters);
        } catch {
          incomingFilters = {};
        }
      } else if (typeof req.body.filters === "object") {
        incomingFilters = req.body.filters;
      }
    }

    const minSimilarity = Number(incomingFilters.similarity || 0) / 100;
    const dbFilters = sanitizeFilters({ ...incomingFilters });

    // Map frontend category to masterCategory in DB
    if (dbFilters.category) {
      dbFilters.masterCategory = dbFilters.category;
      delete dbFilters.category;
    }
    delete dbFilters.similarity;

    let imageUrl = req.body.imageUrl;
    if (req.file) {
      const uploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lookalike_temp",
      });
      imageUrl = uploadResult.secure_url;
      try {
        fs.unlinkSync(req.file.path);
      } catch {}
    }

    if (!imageUrl) return res.status(400).json({ error: "Image required" });

    const inputEmbedding = await getImageEmbedding(imageUrl);
    if (!Array.isArray(inputEmbedding) || inputEmbedding.length === 0) {
      return res.status(500).json({ error: "Failed to generate embedding" });
    }

    let products = await Product.find(
      Object.keys(dbFilters).length ? dbFilters : {}
    );
    const labelled = products
      .map((p) => ({
        ...p.toObject(),
        similarity: cosineSimilarity(inputEmbedding, p.embedding),
      }))
      .filter((p) => p.similarity >= minSimilarity)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 16);

    return res.status(200).json(labelled);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Internal error" });
  }
};
