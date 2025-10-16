import sys
import json
import os
import torch
import clip
from PIL import Image
import requests
from io import BytesIO

device = "cuda" if torch.cuda.is_available() else "cpu"

# Path to save/load the CLIP model
local_model_path = "./clip_models/ViT-B-32.pt"
os.makedirs(os.path.dirname(local_model_path), exist_ok=True)

# Load CLIP model
if os.path.exists(local_model_path):
    print("Loading CLIP model from local file...", file=sys.stderr)
    # Load state dict from saved file
    model, preprocess = clip.load("ViT-B/32", device=device, jit=False)
    model.load_state_dict(torch.load(local_model_path, map_location=device))
    model.eval()
else:
    print("Local CLIP model not found, downloading...", file=sys.stderr)
    model, preprocess = clip.load("ViT-B/32", device=device)
    # Save model state for future use
    torch.save(model.state_dict(), local_model_path)
    print(f"Model saved locally at {local_model_path}", file=sys.stderr)

def get_image_embedding(image_url):
    try:
        response = requests.get(image_url, timeout=10)
        image = Image.open(BytesIO(response.content)).convert("RGB")
        image_input = preprocess(image).unsqueeze(0).to(device)

        with torch.no_grad():
            embedding = model.encode_image(image_input)
            embedding = embedding.cpu().numpy()[0].tolist()
        return embedding
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        return []

if __name__ == "__main__":  
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image URL provided"}))
        sys.exit(1)

    image_url = sys.argv[1]
    embedding = get_image_embedding(image_url)
    print(json.dumps(embedding))
