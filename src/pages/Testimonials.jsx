import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Headphones, Settings2, Truck, Sparkles, X, Image as ImageIcon } from "lucide-react";

// WhatsApp images ටික frontend/public/reviews/ folder එකට දාන්න.
const reviews = [
  {
    name: "Priyantha & Family",
    role: "Wedding · Colombo",
    text: "Vinodh is a superstar DJ. He read the room perfectly — calm during the ceremony, fire on the dance floor. Our elders sang, our cousins screamed. Magic.",
    screenshot: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80",
  },
  {
    name: "Dilini Fernando",
    role: "Daughter's 16th · Battaramulla",
    text: "He shifted vibes effortlessly. The teen crowd loved him, and somehow the parents did too. Karaoke section was unreal. Everyone is still talking about it.",
    screenshot: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80",
  },
  {
    name: "Aravinda Corp.",
    role: "Annual Gala · Sydney",
    text: "Professional, prepared, and engaging. He arrived 2 hours early, tested everything, then disappeared into the night flow like a pro. We've already rebooked.",
    screenshot: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80",
  },
  {
    name: "Mr. & Mrs. Perera",
    role: "Mum's 70th · Melbourne",
    text: "He played classics from 60s, 70s, 80s — and got our entire family on the floor. He even sang a duet with Mum. We laughed and cried.",
    screenshot: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80",
  },
  {
    name: "Tharindu N.",
    role: "Kids Party · Pelawatta",
    text: "Structured games, karaoke rounds, and not one bored child. He's a master of pace. Worth every rupee.",
    screenshot: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80",
  },
];

const steps = [
  { icon: Headphones, title: "Understand the Event & Audience", desc: "Discussion with the Client to understand the event details, culture, and age mix. Site visit if required." },
  { icon: Settings2, title: "Customise Music & Visuals", desc: "Curated playlists, custom music videos, and special stings built specifically for your night's theme." },
  { icon: Truck, title: "Professional Setup & Testing", desc: "Arrival 2 hours prior to guest arrival. Full sound check, redundancy verified, and background music ready." },
  { icon: Sparkles, title: "Smooth Event Flow & Hosting", desc: "Coordination with Event Managers, calm mic control, vibe shifts on demand, and a graceful close." },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null);

  const next = () => setIdx((p) => (p + 1) % reviews.length);
  const prev = () => setIdx((p) => (p - 1 + reviews.length) % reviews.length);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden w-full">
      
      {/* HEADER SECTION */}
      <section className="relative pt-16 pb-12 overflow-hidden z-20">
        <div className="relative z-10 px-6 mx-auto max-w-7xl lg:px-12">
          <p className="font-mono text-xs tracking-[0.3em] text-vdj-gold">◢ REVIEWS · PROCESS</p>
          <h1 className="font-heading mt-4 text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95]">
            What clients say.
            <br />
            <span className="text-gold-gradient">How I work.</span>
          </h1>
        </div>
      </section>

      {/* 3D CAROUSEL */}
      <section className="relative z-20 pb-24 overflow-hidden">
        <div className="max-w-6xl px-6 mx-auto lg:px-12">
          <div className="relative h-[480px] sm:h-[420px] flex items-center justify-center" style={{ perspective: 1400 }}>
            {reviews.map((r, i) => {
              const offset = ((i - idx + reviews.length) % reviews.length);
              const pos = offset > reviews.length / 2 ? offset - reviews.length : offset;
              const isActive = pos === 0;
              
              return (
                <motion.div
                  key={i}
                  // 🚀 Animation, Opacity සහ zIndex ඔක්කොම Framer Motion එකටම දුන්නා
                  animate={{
                    x: pos * 60,
                    z: -Math.abs(pos) * 200,
                    rotateY: pos * -25,
                    scale: isActive ? 1 : 0.85,
                    opacity: Math.abs(pos) > 2 ? 0 : 1 - Math.abs(pos) * 0.4,
                    zIndex: isActive ? 30 : 10 - Math.abs(pos)
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onClick={() => {
                    if (isActive) setSelectedReview(r);
                    else setIdx(i);
                  }}
                  // ❌ transition-all අයින් කරලා තියෙන්නේ fight කරන එක නවත්වන්න
                  className={`absolute w-[90%] sm:w-[560px] rounded-3xl p-8 sm:p-10 bg-[#0a0a0a] cursor-pointer group ${
                    isActive 
                      ? 'border border-vdj-gold/50 shadow-[0_10px_40px_rgba(212,175,55,0.2)]' 
                      : 'border border-white/5 select-none hidden sm:block'
                  }`}
                  style={{ 
                    transformStyle: "preserve-3d",
                    pointerEvents: isActive ? "auto" : "none" // Inactive ඒවා click/hover mix වෙන එක වැළැක්වීමට
                  }}
                >
                  <Quote className="w-10 h-10 mb-4 text-vdj-gold" />
                  <p className="text-base leading-relaxed sm:text-lg text-white/90">"{r.text}"</p>
                  
                  <div className="flex items-center justify-between mt-8">
                    <div>
                      <div className="text-lg font-bold text-white font-heading">{r.name}</div>
                      <div className="font-mono text-xs tracking-[0.2em] text-vdj-goldLight">{r.role}</div>
                    </div>
                    <div className="font-mono text-xs text-white/30">
                      {String(i + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
                    </div>
                  </div>

                  {isActive && (
                    <div className="flex items-center gap-2 pt-4 mt-6 text-sm transition-colors border-t border-white/10 text-vdj-goldLight/80 group-hover:text-vdj-gold">
                      <ImageIcon className="w-4 h-4" /> Click to view original message
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4 mt-6 relative z-30">
            <button onClick={prev} className="flex items-center justify-center w-12 h-12 transition-colors border rounded-full border-white/15 hover:border-vdj-gold hover:text-vdj-gold bg-[#050505]">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-vdj-gold" : "w-2 bg-white/20 hover:bg-white/40"}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className="flex items-center justify-center w-12 h-12 transition-colors border rounded-full border-white/15 hover:border-vdj-gold hover:text-vdj-gold bg-[#050505]">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* WHATSAPP SCREENSHOT POPUP (LIGHTBOX) */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-xl p-4 sm:p-10"
            onClick={() => setSelectedReview(null)}
          >
            <button
              className="absolute z-10 p-2 text-white transition-colors rounded-full top-6 right-6 sm:top-10 sm:right-10 bg-white/10 hover:bg-vdj-gold hover:text-black"
              onClick={() => setSelectedReview(null)}
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative flex flex-col items-center w-full max-w-lg">
              <motion.img
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                src={selectedReview.screenshot}
                alt={`Review from ${selectedReview.name}`}
                className="max-h-[75vh] w-auto rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.15)] border border-white/10 object-contain bg-black"
                onClick={(e) => e.stopPropagation()} 
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <div className="text-xl font-bold text-white font-heading">{selectedReview.name}</div>
                <div className="mt-1 font-mono text-sm text-vdj-gold">Verified Client Feedback</div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROCESS TIMELINE */}
      <section className="relative py-24 border-t border-white/5 bg-[#0a0a0a]/40 z-20">
        <div className="px-6 mx-auto max-w-7xl lg:px-12">
          <div className="max-w-3xl mb-16">
            <p className="font-mono text-xs tracking-[0.3em] text-vdj-goldLight">◢ THE PROCESS</p>
            <h2 className="mt-4 text-4xl font-bold text-white font-heading sm:text-5xl">
              Four steps from booking to bow.
            </h2>
          </div>

          <div className="relative">
            <div className="absolute top-0 bottom-0 hidden w-px left-7 bg-gradient-to-b from-vdj-gold via-vdj-goldLight to-transparent sm:block opacity-30" />
            
            <div className="space-y-10 sm:space-y-14">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="relative flex items-start gap-6"
                >
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#050505] border border-vdj-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                      <s.icon className="w-6 h-6 text-vdj-gold" />
                    </div>
                  </div>
                  <div className="flex-1 px-6 py-5 pt-1 bg-[#0a0a0a] rounded-2xl border border-white/5">
                    <div className="font-mono text-xs tracking-[0.3em] text-vdj-goldLight mb-2">
                      STEP 0{i + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-white font-heading">{s.title}</h3>
                    <p className="mt-3 leading-relaxed text-gray-400">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}