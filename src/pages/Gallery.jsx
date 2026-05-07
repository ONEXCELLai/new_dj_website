import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";

const categories = ["All", "Setups", "Weddings", "Parties", "Corporate"];

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80", category: "Setups", title: "Advanced Lighting Setup" },
  { id: 2, src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80", category: "Weddings", title: "Wedding Reception" },
  { id: 3, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80", category: "Parties", title: "Teen Birthday Party" },
  { id: 4, src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80", category: "Corporate", title: "Annual Gala Dinner" },
  { id: 5, src: "https://images.unsplash.com/photo-1533174000273-7c18242a51ff?auto=format&fit=crop&q=80", category: "Setups", title: "Basic Party Setup" },
  { id: 6, src: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?auto=format&fit=crop&q=80", category: "Parties", title: "Kids Party Entertainment" },
  { id: 7, src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80", category: "Weddings", title: "First Dance Moment" },
  { id: 8, src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80", category: "Corporate", title: "Conference After-Party" },
  { id: 9, src: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80", category: "Setups", title: "Corporate Stage Setup" },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedImg, setSelectedImg] = useState(null);

  const filteredImages = activeTab === "All" ? images : images.filter((img) => img.category === activeTab);

  return (
    <div className="relative min-h-screen">
      <section className="relative pt-16 pb-12 overflow-hidden">
        <div className="relative z-10 px-6 mx-auto max-w-7xl lg:px-12">
          <p className="font-mono text-xs tracking-[0.3em] text-vdj-gold">◢ MOMENTS & SETUPS</p>
          <h1 className="font-heading mt-4 text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95]">
            The Visual
            <br />
            <span className="text-gold-gradient">Experience.</span>
          </h1>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="relative z-10 pb-8">
        <div className="flex flex-wrap gap-3 px-6 mx-auto max-w-7xl lg:px-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === cat
                  ? "bg-vdj-gold text-vdj-bg shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  : "bg-black/40 border border-white/10 text-white/70 hover:border-vdj-gold/50 hover:text-vdj-goldLight"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* IMAGE GRID */}
      <section className="relative z-10 pb-24">
        <div className="px-6 mx-auto max-w-7xl lg:px-12">
          <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredImages.map((img) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={img.id}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden glass-panel border-white/5 cursor-pointer"
                  onClick={() => setSelectedImg(img)}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                    <Maximize2 className="w-8 h-8 mb-2 text-vdj-gold drop-shadow-lg" />
                    <span className="px-4 text-lg font-bold tracking-wide text-center text-white font-heading drop-shadow-md">
                      {img.title}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* LIGHTBOX (FULLSCREEN IMAGE) */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-vdj-bg/95 backdrop-blur-xl p-4 sm:p-10"
            onClick={() => setSelectedImg(null)}
          >
            <button
              className="absolute p-2 text-white transition-colors rounded-full top-6 right-6 sm:top-10 sm:right-10 bg-white/10 hover:bg-vdj-gold hover:text-vdj-bg"
              onClick={() => setSelectedImg(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImg.src}
              alt={selectedImg.title}
              className="max-w-full max-h-full rounded-xl shadow-[0_0_50px_rgba(212,175,55,0.15)] border border-white/10"
              onClick={(e) => e.stopPropagation()} // පින්තූරය උඩ click කළාම වැහෙන එක නවත්තන්න
            />
            <div className="absolute left-0 right-0 text-center pointer-events-none bottom-10">
              <span className="px-6 py-3 font-bold border rounded-full bg-black/60 backdrop-blur-md font-heading text-vdj-gold border-white/10">
                {selectedImg.title}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}