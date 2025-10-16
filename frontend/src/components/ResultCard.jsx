import React from "react";
import { motion } from "framer-motion";
import { getResponsiveCloudinaryUrl } from "../utils/cloudinary";
import { Star, Heart, ExternalLink } from "lucide-react";

export default function ResultCard({ product }) {
  const optimizedImageUrl = getResponsiveCloudinaryUrl(product.imageUrl, 400, 400);
  const similarityPercentage = Math.round((product.similarity || 0) * 100);
  
  const getSimilarityColor = (percentage) => {
    if (percentage >= 80) return "from-green-500 to-emerald-500";
    if (percentage >= 60) return "from-blue-500 to-cyan-500";
    if (percentage >= 40) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const getSimilarityText = (percentage) => {
    if (percentage >= 80) return "Excellent Match";
    if (percentage >= 60) return "Good Match";
    if (percentage >= 40) return "Fair Match";
    return "Basic Match";
  };
  
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="group relative rounded-3xl overflow-hidden transition-all duration-500 bg-brand-navy/40 border border-brand-blue/10 backdrop-blur-sm"
      style={{ 
        boxShadow: 'var(--glow-sm)'
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={optimizedImageUrl}
          alt={product.productDisplayName || product.name}
          className="w-full h-64 object-contain group-hover:scale-110 transition-transform duration-700 bg-brand-dark/60"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
          <motion.button
            whileHover={{ scale: 1.2, rotate: 12 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 backdrop-blur-md rounded-2xl bg-brand-blue/20 border border-brand-blue/30 text-brand-light shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/30 transition-all"
          >
            <Heart className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2, rotate: -12 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 backdrop-blur-md rounded-2xl bg-brand-blue/20 border border-brand-blue/30 text-brand-light shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/30 transition-all"
          >
            <ExternalLink className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Enhanced Similarity Badge */}
        {product.similarity !== undefined && (
          <div className="absolute top-4 left-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="px-4 py-2 backdrop-blur-md rounded-2xl bg-brand-navy/80 border border-brand-blue/30 text-brand-light shadow-lg shadow-brand-blue/20"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-4 h-4 fill-brand-blue" />
                </motion.div>
                <span className="font-bold text-sm bg-gradient-to-r from-brand-blue to-brand-light bg-clip-text text-transparent">{similarityPercentage}%</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Enhanced Content */}
      <div className="p-6 space-y-4">
        {/* Product Name */}
        <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:opacity-90 transition-colors"
            style={{ color: 'var(--foreground)' }}>
          {product.productDisplayName || product.name}
        </h3>
        
        {/* Enhanced Product Details */}
        <div className="flex flex-wrap gap-2 text-sm">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="px-3 py-2 rounded-xl font-semibold transition-all bg-brand-blue/20 border border-brand-blue/30 text-brand-light">
            {product.gender}
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="px-3 py-2 rounded-xl font-semibold transition-all bg-brand-blue/20 border border-brand-blue/30 text-brand-light">
            {product.baseColour}
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="px-3 py-2 rounded-xl font-semibold transition-all bg-brand-blue/20 border border-brand-blue/30 text-brand-light">
            {product.masterCategory}
          </motion.span>
        </div>

        {/* Enhanced Similarity Score */}
        {product.similarity !== undefined && (
          <div className="space-y-3 p-4 rounded-2xl bg-brand-navy/40 border border-brand-blue/20 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold flex items-center gap-2 text-brand-gray">
                <Star className="w-4 h-4 text-brand-blue" />
                AI Match Score
              </span>
              <span className="text-lg font-bold bg-gradient-to-r from-brand-blue to-brand-light bg-clip-text text-transparent">
                {similarityPercentage}%
              </span>
            </div>
            
            {/* Enhanced Progress Bar */}
            <div className="relative h-3 rounded-full overflow-hidden border border-brand-blue/30 bg-brand-dark/60">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${similarityPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-brand-blue/60 to-brand-blue rounded-full relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </motion.div>
            </div>
            
            {/* Match Quality Text */}
            <div className="text-center">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="font-bold text-sm px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-light"
              >
                {getSimilarityText(similarityPercentage)}
              </motion.span>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Glow Effect */}
      <div className="absolute inset-0 rounded-3xl transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-30 bg-gradient-radial from-brand-blue/30 to-transparent" />
    </motion.div>
  );
}
