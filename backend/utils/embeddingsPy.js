import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const scriptPath = join(__dirname, "generate_embed.py");

/**
 * Generates image embedding using Python script.
 * Accepts either an image URL or local file path.
 * @param {string} imagePathOrUrl - URL or local path
 * @returns {Promise<Array<number>>}
 */
export const getImageEmbedding = (imagePathOrUrl) => {
  return new Promise((resolve, reject) => {
    const process = spawn("python", [scriptPath, imagePathOrUrl]);

    let data = "";
    let error = "";

    process.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    process.stderr.on("data", (chunk) => {
      error += chunk.toString();
    });

    process.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(error || `Python process exited with code ${code}`));
      } else {
        try {
          const result = JSON.parse(data);
          if (result.error) {
            reject(new Error(result.error));
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(new Error("Failed to parse embedding output: " + data));
        }
      }
    });
  });
};
