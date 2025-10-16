import os
import sys
import clip
import torch

device = "cuda" if torch.cuda.is_available() else "cpu"
print("Device:", device)

# Path to local model
local_model_dir = "./clip_models"
local_model_path = os.path.join(local_model_dir, "ViT-B-32.pt")

# Delete existing model file if it exists
if os.path.exists(local_model_path):
    print("Deleting existing local CLIP model...", file=sys.stderr)
    os.remove(local_model_path)

# Load model (will be downloaded by generate_embed later)
model, preprocess = clip.load("ViT-B/32", device=device)
print("CLIP model loaded successfully ✅")
