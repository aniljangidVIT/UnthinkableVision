import axios from "axios";

export const getImageEmbedding = async (imageUrl) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/embeddings",
      {
        model: "text-embedding-3-large",
        input: imageUrl, // works with both Cloudinary URLs & direct URLs
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data[0].embedding;
  } catch (error) {
    console.error(
      "Embedding generation failed:",
      error.response?.data || error.message
    );
    throw new Error("Failed to generate embedding");
  }
};
