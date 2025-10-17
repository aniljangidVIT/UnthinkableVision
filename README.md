# � Unthinkable Vision - AI Visual Search

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" alt="TensorFlow"/>
</div>

<div align="center">
  <h3>✨ Discover Visually Similar Products Using AI ✨</h3>
  <p>A cutting-edge visual search engine that uses deep learning to find similar products based on image input.</p>
</div>

## � System Architecture

```mermaid
graph TD
    A[Frontend - React/Vite] --> B[Backend - Node.js/Express]
    B --> C[MongoDB Database]
    B --> D[AI Embeddings Service]
    E[Product Images] --> D
    D --> F[Vector Embeddings]
    F --> C
    
    style A fill:#61DAFB,stroke:#333,stroke-width:2px
    style B fill:#68A063,stroke:#333,stroke-width:2px
    style C fill:#4DB33D,stroke:#333,stroke-width:2px
    style D fill:#FF6B6B,stroke:#333,stroke-width:2px
    style F fill:#FFD93D,stroke:#333,stroke-width:2px
```

## 📝 Project Overview

UnthinkableVision is an innovative fashion search platform that combines cutting-edge AI technology with an intuitive user interface. The system processes fashion product images through deep learning models to generate vector embeddings, enabling sophisticated similarity-based search capabilities.

### Key Components

#### Frontend Architecture
- React 18 with Vite for optimal performance
- Space-themed split-screen interface with animated elements
- Real-time search results with dynamic filtering
- Responsive design using Tailwind CSS
- Cloudinary integration for image optimization

#### Backend Infrastructure
- Node.js/Express server with RESTful API endpoints
- MongoDB for scalable product and metadata storage
- Python-based AI service for generating embeddings
- Vector similarity search implementation
- Efficient data processing pipeline

### Data Flow
1. Product images are processed through AI models to generate embeddings
2. Embeddings and metadata are stored in MongoDB
3. Users can search through visual or text-based queries
4. Backend processes queries and returns relevant matches
5. Results are displayed in an intuitive card-based layout

## �🚀 Features

- 🔍 **Visual Similarity Search**: Advanced neural network for precise product matching
- 🖼️ **Flexible Input**: Upload images directly or paste image URLs
- 🎯 **Smart Filtering**: Filter by gender, color, category, and similarity score
- 📊 **Real-time Analysis**: Instant similarity scoring and matching
- 🌓 **Dark Mode**: Space-themed dark mode interface
- 💫 **Smooth Animations**: Fluid transitions and micro-interactions
- 🎨 **Modern UI**: Sleek space-themed design with glowing effects
- ☁️ **Cloudinary Integration**: Optimized image handling and processing

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for blazing fast development
- **TailwindCSS** for modern, responsive styling
- **Framer Motion** for smooth animations
- **Axios** for API communication
- **Cloudinary SDK** for image optimization

### Backend
- **Node.js** & Express for robust server
- **MongoDB** for scalable database
- **TensorFlow** for image feature extraction
- **Python** scripts for ML processing
- **Cloudinary** for image management

## 🚀 Deployment

### Deploying Frontend to Vercel

1. **Prepare Your Repository**
   ```bash
   # Ensure your frontend directory is committed to GitHub
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push
   ```

2. **Deploy to Vercel**
   - Sign up/Login at [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` directory as the root
   - Set build settings:
     - Framework Preset: `Vite`
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Configure Environment Variables**
   - Go to Project Settings > Environment Variables
   - Add the following:
     ```
     VITE_BACKEND_URL=your_backend_url
     VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
     VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your frontend
   - You'll get a production URL like `your-app.vercel.app`

5. **Custom Domain (Optional)**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow Vercel's DNS configuration instructions

### Auto-Deployments
- Vercel will automatically deploy when you push to your main branch
- Preview deployments are created for pull requests
- You can configure deployment settings in `vercel.json`

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- MongoDB
- npm or yarn

### Setting Up Frontend
\`\`\`bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
\`\`\`

### Setting Up Backend
\`\`\`bash
# Navigate to backend
cd backend

# Install Node.js dependencies
npm install

# Install Python requirements
pip install -r requirements.txt

# Configure environment
cp .env.example .env

# Start server
npm start
\`\`\`

## ⚙️ Environment Configuration

### Frontend (.env)
\`\`\`env
VITE_BACKEND_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
\`\`\`

### Backend (.env)
\`\`\`env
MONGODB_URI=your_mongodb_uri
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
\`\`\`

## 🗄️ Project Structure

\`\`\`
unthinkable-vision/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx        # Main application
│   │   └── main.jsx       # Entry point
│   └── index.html         # HTML template
├── backend/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── utils/            # Helper utilities
│   │   ├── embeddings.js  # Feature extraction
│   │   └── generate_embed.py # Python ML script
│   └── index.js          # Server entry
└── data/                  # Data files
    └── raw/              # Raw datasets
\`\`\`

## 🎯 API Endpoints

### Product Search
\`\`\`http
POST /api/products/search
# Body: FormData (image file or URL)
# Returns: Array of similar products with scores
\`\`\`

### Product Management
\`\`\`http
GET /api/products        # Get all products
POST /api/products       # Add new product
PUT /api/products/:id    # Update product
DELETE /api/products/:id # Delete product
\`\`\`

## 🧠 Machine Learning

The visual search employs a sophisticated neural network architecture:

- **Model**: Pre-trained ResNet50
- **Feature Vector**: 2048-dimensional
- **Similarity**: Cosine similarity metric
- **Processing**: Real-time feature extraction
- **Input Processing**: Automatic resizing and normalization

## 🎨 Key Components

- **Dropzone**: Space-themed upload area with animations
- **FilterPanel**: Advanced filtering with real-time updates
- **ResultCard**: Product cards with similarity scores
- **Navbar**: Navigation with theme switching

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Team

- **Frontend Developer**: [Your Name]
- **Backend Developer**: [Your Name]
- **ML Engineer**: [Your Name]
- **UI/UX Designer**: [Your Name]

## 🌟 Acknowledgements

- TensorFlow team for ML tools
- React team for the framework
- Cloudinary for image services
- MongoDB team for the database

---

<p align="center">Made with 💙 by the Unthinkable Vision Team</p>
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