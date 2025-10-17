import React, { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { motion } from "framer-motion";
import FilterPanel from "./components/FilterPanel";
import ResultCard from "./components/ResultCard";
import { enhanceCloudinaryUrl } from "./utils/cloudinary";
import { Search } from "lucide-react";

export default function App() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    gender: "",
    baseColour: "",
    category: "",
    similarity: 0,
  });

  const handleSearch = async () => {
    if (!file && !url)
      return setError("😊 Upload a file or enter a URL first!");
    setAllResults([]);
    setFilteredResults([]);
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      if (url) {
        const optimizedUrl = enhanceCloudinaryUrl(url);
        formData.append("imageUrl", optimizedUrl);
      }
      formData.append("filters", JSON.stringify(filters));

      const backendURL = `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")}/api/products/search`;

      const res = await axios.post(backendURL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const topResults = res.data.slice(0, 16);
      setAllResults(topResults);
      setFilteredResults(topResults);
    } catch {
      setError("😔 Failed to fetch results. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleFrontendFilter = () => {
    if (!file && url.trim() === "") {
      setError("😊 Please upload an image or enter a URL to apply filters!");
      return;
    }

    let results = allResults;
    setError("");

    if (filters.gender)
      results = results.filter((r) => r.gender === filters.gender);
    if (filters.baseColour)
      results = results.filter((r) => r.baseColour === filters.baseColour);
    if (filters.category)
      results = results.filter((r) => r.masterCategory === filters.category);
    if (filters.similarity)
      results = results.filter((r) => r.similarity >= filters.similarity / 100);

    if (results.length === 0) {
      setError(
        "😔 No products found matching your filters. Try changing them!"
      );
    }
    setFilteredResults(results.slice(0, 12));
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setAllResults([]);
    setFilteredResults([]);
    setError("");
  };

  const handleUrlChange = (e) => {
    const val = e.target.value;
    setUrl(val);
    if (val.trim() === "") {
      setAllResults([]);
      setFilteredResults([]);
      setError("");
    }
  };

  return (
    <>
      {/* Deep space split background and animated stars */}
      <div className="space-split-bg">
        <div className="half-circle"></div>
        <div className="stars-animated"></div>
      </div>
      {/* Huge UNTHINKABLE background text, centered with 1in margin */}
      <div className="unthinkable-bg-text">UNTHINKABLE</div>
      <div className="space-split-content perfect-center">
        <main className="main-content-card">
          <header className="main-header">
            <h1>Unthinkable Vision</h1>
            <p>AI Visual Search</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full">
            {/* Left Side: Dropzone and URL */}
            <div className="space-y-6 flex flex-col items-center w-full">
              <Dropzone
                onDrop={(accepted) => setFile(accepted[0])}
                disabled={url.trim() !== ""}
                accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'] }}
              >
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div
                    {...getRootProps()}
                    className={`wormhole-dropzone relative w-64 h-64 rounded-full flex items-center justify-center transition-all duration-300 ${
                      url.trim() !== "" ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <input {...getInputProps()} />
                    {file ? (
                      <>
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-full"
                        />
                        <button
                          onClick={removeFile}
                          className="absolute top-2 right-2 w-8 h-8 deep-btn small"
                        >
                          &times;
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="wormhole-swirl"></div>
                        <span className="drop-text font-bold text-5xl animate-pulse">
                          DROP
                        </span>
                      </>
                    )}
                  </div>
                )}
              </Dropzone>
              <div className="w-full max-w-xs text-center">
                <input
                  type="text"
                  placeholder="Or paste an image URL"
                  value={url}
                  onChange={handleUrlChange}
                  disabled={file !== null}
                  className={`w-full px-4 py-2 rounded-lg bg-brand-dark/70 border border-brand-blue/20 text-brand-light placeholder:text-brand-blue/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 text-sm transition-all ${
                    file ? "opacity-50 cursor-not-allowed" : "hover:border-brand-blue/30"
                  }`}
                />
              </div>
            </div>
            {/* Right Side: Filters and Search */}
            <div className="space-y-6 w-full flex flex-col items-center">
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                onApply={handleFrontendFilter}
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full deep-btn accent font-medium flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Find Similar</span>
                  </>
                )}
              </button>
            </div>
          </div>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm text-center backdrop-blur-sm"
            >
              {error}
            </motion.div>
          )}
          {!loading && filteredResults.length > 0 && (
            <motion.section
              className="result-grid"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
            >
              {filteredResults.map((product, i) => (
                <motion.div
                  key={product._id || i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="result-card"
                >
                  <ResultCard product={product} />
                </motion.div>
              ))}
            </motion.section>
          )}
        </main>
      </div>
    </>
  );
}
