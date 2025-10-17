import React from "react";
import { Sliders } from "lucide-react";

export default function FilterPanel({ filters, setFilters, onApply }) {
  return (
    <div className="filter-panel-glass flex flex-col items-center justify-center">
      <div className="space-y-5 w-full">
        <div className="mb-4 w-full">
          <label className="block mb-2 text-base text-center">Gender</label>
          <select
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
            className="w-full px-4 py-2 text-center"
          >
            <option value="">All</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2 text-base text-center">Color</label>
          <select
            value={filters.baseColour}
            onChange={(e) => setFilters({ ...filters, baseColour: e.target.value })}
            className="w-full px-4 py-2 text-center"
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
        <div className="mb-4 w-full">
          <label className="block mb-2 text-base text-center">Category</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full px-4 py-2 text-center"
          >
            <option value="">All</option>
            <option value="Apparel">Apparel</option>
            <option value="Accessories">Accessories</option>
            <option value="Footwear">Footwear</option>
            <option value="Sporting Goods">Sports</option>
          </select>
        </div>
        <div className="mb-6 w-full">
          <label className="block mb-2 text-base flex justify-between items-center">
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
        <div className="button-group w-full flex justify-center">
          <button
            onClick={onApply}
            className="w-full deep-btn accent font-medium flex items-center justify-center gap-2"
          >
            <span className="orb" aria-hidden="true" />
            <Sliders className="w-4 h-4" />
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
