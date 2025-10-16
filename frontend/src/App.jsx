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
    <div className="min-h-screen w-full text-white flex items-center justify-center p-4">
      <div className="fixed inset-0 flex items-center justify-center z-0 overflow-hidden">
        <h1 className="unthinkable-text bg-gradient-to-br from-brand-light via-brand-blue to-brand-dark text-transparent bg-clip-text opacity-[0.03] tracking-tighter">
          UNTHINKABLE
        </h1>
      </div>

      <main className="w-full max-w-5xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-brand-navy/40 backdrop-blur-lg border border-brand-blue/10 rounded-2xl shadow-lg shadow-brand-blue/5"
        >
          <div className="p-8 space-y-8">
            <header className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter mb-1">
                Unthinkable Vision
              </h1>
              <p className="text-sm text-blue-400">AI Visual Search</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left Side: Dropzone and URL */}
              <div className="space-y-6 flex flex-col items-center">
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
                            className="absolute top-2 right-2 w-8 h-8 bg-slate-900/80 rounded-full flex items-center justify-center text-white hover:bg-slate-800 transition-colors"
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
              <div className="space-y-6">
                <FilterPanel
                  filters={filters}
                  setFilters={setFilters}
                  onApply={handleFrontendFilter}
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full px-5 py-3 rounded-lg font-medium flex items-center justify-center gap-2 bg-brand-blue text-brand-light hover:bg-brand-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-brand-blue/30"
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
          </div>
        </motion.div>

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
            className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
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
                className="aspect-w-1 aspect-h-1"
              >
                <ResultCard product={product} />
              </motion.div>
            ))}
          </motion.section>
        )}
      </main>
    </div>
  );
}
