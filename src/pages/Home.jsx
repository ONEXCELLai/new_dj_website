import { Link } from "react-router-dom";
import { Mic2, ArrowRight, Sparkles, Gamepad2, Wine, ListMusic, Star } from "lucide-react";
import { motion } from "framer-motion";
import VinylScene from "../components/three/VinylScene"; 

const usps = [
  {
    icon: Gamepad2,
    title: "Best Kids & Teen Party VDJ",
    desc: "Keeping young crowds engaged is an art. Clean music edits, interactive games, TikTok trends, and high-energy visuals.",
    colSpan: "md:col-span-2 lg:col-span-1",
  },
  {
    icon: Mic2,
    title: "Best Karaoke & Dance VDJ",
    desc: "Live video lyrics on screens with confidence-building MC control. Turning your guests into the stars of the night.",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    icon: Wine,
    title: "Mature & Elders Parties",
    desc: "Master of pace for the older crowd. Golden oldies, 70s/80s classics, baila, and sing-alongs at the perfect volume.",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    icon: ListMusic,
    title: "Unique Event Flow",
    desc: "Not just playing songs. I craft unique games, custom background tracks, and coordinate seamlessly with event managers.",
    colSpan: "md:col-span-2 lg:col-span-1",
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* CINEMATIC HERO SECTION */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay (Report එකේ ඉල්ලපු Cinematic Feel එක) */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/flagged/photo-1569521739482-5443615d3725?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="DJ Crowd Performance" 
            className="w-full h-full object-cover opacity-80 grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-vdj-bg via-vdj-bg/95 to-vdj-bg/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-vdj-bg via-transparent to-transparent" />
        </div>

        {/* Glow Effects */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full bg-vdj-gold/10 blur-[140px]" />
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-vdj-goldLight/5 blur-[160px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 items-center relative z-10 w-full pt-10">
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-vdj-gold/30 bg-vdj-gold/5 backdrop-blur mb-6"
            >
              <Star className="w-4 h-4 text-vdj-gold fill-vdj-gold" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-vdj-goldLight uppercase">
                Sri Lanka's Premium Video DJ
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl sm:text-6xl lg:text-[5rem] font-black leading-[1.05] tracking-tight"
            >
              Experience the
              <br />
              <span className="text-gold-gradient">Ultimate Rhythm.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-vdj-muted max-w-2xl leading-relaxed"
            >
              With nearly <span className="text-vdj-text font-semibold">30 years</span> of expertise across Melbourne, Sydney, and Colombo. I don't just play music; I craft emotional journeys, blending custom visuals, live karaoke, and flawless event coordination.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-5"
            >
              <Link
                to="/contact"
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-vdj-gold text-vdj-bg font-bold tracking-wide hover:bg-vdj-goldLight transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)]"
              >
                Book Your Event <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/testimonials"
                className="flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-vdj-text hover:border-vdj-gold hover:text-vdj-goldLight transition-all font-semibold glass-panel"
              >
                Read Client Reviews
              </Link>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-5 h-[400px] sm:h-[500px] relative hidden lg:block"
          >
             <VinylScene /> 
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US (CLIENT'S USPs) SECTION */}
      <section className="py-24 relative z-10 bg-vdj-surface/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <p className="font-mono text-xs tracking-[0.3em] text-vdj-gold mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> THE VINS DIFFERENCE
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold">
              Mastering every crowd. <br/>
              <span className="text-vdj-gold italic font-medium">Any age. Any vibe.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usps.map((u, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-panel rounded-3xl p-8 sm:p-10 group border-white/5 hover:border-vdj-gold/40 transition-all duration-500 ${u.colSpan}`}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br from-vdj-gold/20 to-transparent border border-vdj-gold/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                  <u.icon className="w-8 h-8 text-vdj-gold" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4 text-white">
                  {u.title}
                </h3>
                <p className="text-vdj-muted leading-relaxed text-lg">
                  {u.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}