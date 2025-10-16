# 🎯 SameSnap - AI-Powered Visual Search

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="AI"/>
</div>

<div align="center">
  <h3>🔍 Find visually similar products using deep learning and CLIP embeddings</h3>
  <p>Upload an image and discover similar fashion items with AI-powered visual search</p>
</div>

---

## ✨ Features

🎨 **Visual Search Engine**
- Upload images or paste URLs for instant similarity search
- AI-powered image analysis using CLIP (Contrastive Language-Image Pre-training)
- Real-time similarity scoring with adjustable thresholds

🎯 **Smart Filtering System**
- Filter by gender, color, category, and brand
- Advanced similarity slider (0-100%)
- Dynamic product filtering with live results

🌙 **Modern UI/UX**
- Beautiful dark/light theme toggle
- Responsive design for all devices
- Smooth animations with Framer Motion
- Notebook-style theme with custom typography

⚡ **Performance Optimized**
- Cloudinary integration for optimized image delivery
- MongoDB with indexed embeddings for fast searches
- Efficient CLIP model caching
- Lazy loading and image optimization

## 🛠️ Tech Stack

### Frontend
- **React** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### AI & Image Processing
- **CLIP (ViT-B/32)** - Vision transformer model
- **PyTorch** - Deep learning framework
- **Cloudinary** - Image CDN and optimization
- **Python Integration** - CLIP model execution

### Data
- **100+ Fashion Products** - Curated dataset
- **512-dimensional embeddings** - High-quality vector representations
- **Multiple categories** - Apparel, Footwear, Accessories

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+ with pip
- MongoDB database
- Cloudinary account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/luckykumar11/SameSnap.git
cd SameSnap
```

2. **Install Python dependencies**
```bash
cd backend/utils
pip install torch torchvision clip-by-openai pillow requests
```

3. **Install Node.js dependencies**
```bash
# Backend
cd ../../backend
npm install

# Frontend
cd ../frontend
npm install
```

4. **Environment Setup**
```bash
# Backend/.env
MONGODB_URI=mongodb://localhost:27017/SameSnap
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000

# Frontend/.env (optional)
VITE_API_URL=http://localhost:5000
```

5. **Database Setup**
```bash
cd backend
npm run seed
```

6. **Start the application**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

7. **Open your browser**
```
http://localhost:5173
```

## 📸 How It Works

1. **Upload Image** - Drag & drop or paste URL
2. **AI Analysis** - CLIP model generates 512-dimensional embeddings
3. **Similarity Search** - Vector comparison with database products
4. **Smart Results** - Filtered and ranked similar products
5. **Interactive Filters** - Refine results by preferences

## 🎨 UI Theme

### Dark Theme (Modern)
- Deep dark backgrounds
- High contrast elements
- Neon accents
- Sleek interface

## 📊 Performance Metrics

- **Search Speed**: < 200ms average response
- **Image Processing**: ~1-2s for CLIP embeddings
- **Database**: Indexed queries for optimal performance
- **UI Responsiveness**: 60fps animations

## 🔧 API Endpoints

### POST `/api/products/search`
Search for visually similar products
```javascript
{
  "imageUrl": "https://example.com/image.jpg",
  "filters": {
    "gender": "Women",
    "baseColour": "Black",
    "category": "Apparel",
    "similarity": 70
  }
}
```

### GET `/api/products`
Get all products with optional filters

## 🙏 Acknowledgments

- **OpenAI CLIP** - For the amazing vision-language model
- **Fashion Dataset** - Product data for training and testing
- **Cloudinary** - Image optimization and delivery
- **MongoDB** - Reliable database solution

## 📞 Contact

**Rajeev Ranjan**
- GitHub: [@rajeev-2003](https://github.com/rajeev-2003)
- Project Link: [SamaanMilaap](https://github.com/rajeev-2003/SamaanMilaap)

---

<div align="center">
  <h3>🌟 Star this repo if you found it helpful! 🌟</h3>
  <p>Made with ❤️ by lucky kumar</p>
</div>