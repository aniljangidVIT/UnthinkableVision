import { getImageEmbedding } from "./embeddings.js";

const test = async () => {
  try {
    const imageUrl =
      "https://res.cloudinary.com/dp6uekd95/image/upload/v1760211131/lookalike/1165.jpg";
    console.log("🔍 Generating embedding for:", imageUrl);

    const embedding = await getImageEmbedding(imageUrl);

    if (embedding && embedding.length > 0) {
      console.log("✅ Embedding generated!");
      console.log("Length:", embedding.length);
      console.log("First 5 values:", embedding.slice(0, 5));
    } else {
      console.log("⚠️ No embedding returned.");
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
};

test();
