import React from "react";
import { Sliders } from "lucide-react";

export default function FilterPanel({ filters, setFilters, onApply }) {
  return (
    <div className="space-y-6 text-white">
      <div className="space-y-4">
        <label className="text-sm font-medium text-brand-gray">Gender</label>
          <select
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          className="w-full rounded-lg px-4 py-2 bg-brand-dark/70 border border-brand-blue/20 text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 transition-all"
        >
          <option value="">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-brand-gray">Color</label>
          <select
          value={filters.baseColour}
          onChange={(e) => setFilters({ ...filters, baseColour: e.target.value })}
          className="w-full rounded-lg px-4 py-2 bg-brand-dark/70 border border-brand-blue/20 text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 transition-all"
        >
          <option value="">All</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Blue">Blue</option>
          <option value="Red">Red</option>
          <option value="Green">Green</option>
          <option value="Grey">Grey</option>
          <option value="Navy Blue">Navy Blue</option>
          <option value="Orange">Orange</option>
          <option value="Purple">Purple</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-brand-gray">Category</label>
          <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="w-full rounded-lg px-4 py-2 bg-brand-dark/70 border border-brand-blue/20 text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 transition-all"
        >
          <option value="">All</option>
          <option value="Apparel">Apparel</option>
          <option value="Accessories">Accessories</option>
          <option value="Footwear">Footwear</option>
          <option value="Sporting Goods">Sports</option>
        </select>
      </div>

      <div className="space-y-3 pt-2">
        <label className="text-sm font-medium text-brand-gray flex justify-between items-center">
          <span>Minimum Similarity</span>
          <span className="px-2 py-1 rounded bg-brand-blue/20 border border-brand-blue/30 text-brand-light text-xs font-mono">
            {filters.similarity}%
          </span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={filters.similarity}
          onChange={(e) => setFilters({ ...filters, similarity: Number(e.target.value) })}
        />
      </div>
      
      <button
        onClick={onApply}
        className="w-full px-5 py-3 rounded-lg font-medium flex items-center justify-center gap-2 bg-brand-blue/20 text-brand-light border border-brand-blue/30 hover:bg-brand-blue/30 hover:border-brand-blue/50 disabled:opacity-50 transition-all"
      >
        <Sliders className="w-4 h-4" />
        Apply Filters
      </button>
    </div>
  );
}
