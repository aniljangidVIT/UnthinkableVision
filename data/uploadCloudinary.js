require("dotenv").config();
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { parse } = require("json2csv");
const cloudinary = require("cloudinary").v2;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Paths
const csvPath = "E:/MERN/lookalike/data/raw/styles.csv";
const imagesFolder = "E:/MERN/lookalike/data/raw/images/";
const outputCsv = "E:/MERN/lookalike/data/raw/products.csv";

const results = [];

// Read CSV
fs.createReadStream(csvPath)
  .pipe(csv())
  .on("data", (row) => results.push(row))
  .on("end", async () => {
    console.log("CSV loaded");

    const updatedRows = [];

    // Upload images asynchronously
    for (const row of results) {
      const imageName = `${row.id}.jpg`;
      const filePath = path.join(imagesFolder, imageName);

      if (fs.existsSync(filePath)) {
        try {
          const res = await cloudinary.uploader.upload(filePath, {
            public_id: row.id,
            folder: "lookalike"
          });
          updatedRows.push({ ...row, image_url: res.secure_url });
          console.log(`Uploaded: ${imageName}`);
        } catch (err) {
          console.error(`Error uploading ${imageName}:`, err);
          updatedRows.push({ ...row, image_url: "" });
        }
      } else {
        console.log(`Image not found: ${imageName}`);
        updatedRows.push({ ...row, image_url: "" });
      }
    }

    // Save new CSV
    const csvData = parse(updatedRows);
    fs.writeFileSync(outputCsv, csvData);
    console.log(`Done! New CSV saved as: ${outputCsv}`);
  });
