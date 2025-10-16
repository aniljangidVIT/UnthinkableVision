import fs from "fs";
import csv from "csv-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../models/Product.js";
import connectDB from "../config/db.js";
import { getImageEmbedding } from "./embeddings.js";
import cliProgress from "cli-progress";

dotenv.config();

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const results = [];
const csvFilePath = path.join(__dirname, "../../data/raw/products.csv");
const BATCH_SIZE = 5;

const seedProducts = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => results.push(row))
      .on("end", async () => {
        console.log(`📊 ${results.length} rows found in CSV`);

        const progressBar = new cliProgress.SingleBar(
          {
            format: "Seeding |{bar}| {percentage}% || {value}/{total} Products",
          },
          cliProgress.Presets.shades_classic
        );

        progressBar.start(results.length, 0);

        for (let i = 0; i < results.length; i += BATCH_SIZE) {
          const batch = results.slice(i, i + BATCH_SIZE);

          await Promise.all(
            batch.map(async (item) => {
              if (!item.image_url) {
                progressBar.increment();
                return;
              }

              try {
                // Check if product already exists
                const exists = await Product.findOne({ productId: item.id });
                if (exists) {
                  progressBar.increment();
                  return;
                }

                const embedding = await getImageEmbedding(item.image_url);

                const newProduct = new Product({
                  productId: item.id,
                  name: item.productDisplayName,
                  gender: item.gender,
                  masterCategory: item.masterCategory,
                  subCategory: item.subCategory,
                  articleType: item.articleType,
                  baseColour: item.baseColour,
                  season: item.season,
                  year: item.year,
                  usage: item.usage,
                  imageUrl: item.image_url,
                  embedding,
                });

                await newProduct.save();
              } catch (err) {
                console.error(
                  `❌ Error adding ${item.productDisplayName}:`,
                  err.message
                );
              }

              progressBar.increment();
            })
          );
        }

        progressBar.stop();
        console.log("🎯 Seeding complete!");
        mongoose.connection.close();
      });
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    mongoose.connection.close();
  }
};

seedProducts();
