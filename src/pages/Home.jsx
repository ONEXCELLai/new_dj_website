import { Link } from "react-router-dom";
import { Music4, Mic2, CalendarHeart, ArrowRight, Sparkles } from "lucide-react";
// 3D Component එක පසුව අපි හදමු, දැනට import එක තියන්න.
import VinylScene from "../components/three/VinylScene"; 

const highlights = [
  {
    icon: Music4,
    title: "Premium Video DJ",
    desc: "Curated music videos synced to the moment — sight + sound that move the room.",
  },
  {
    icon: Mic2,
    title: "Karaoke Host",
    desc: "Live karaoke visuals with confident MC flow, encouraging every guest to shine.",
  },
  {
    icon: CalendarHeart,
    title: "Event Flow Specialist",
    desc: "Kids parties, teen birthdays, weddings, elders' celebrations & corporate galas.",
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-[400px] h-[400px] rounded-full bg-vdj-gold/10 blur-[140px]" />
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-vdj-goldLight/5 blur-[160px]" />
        </div>

        <div className="relative z-10 grid items-center w-full gap-12 px-6 mx-auto max-w-7xl lg:px-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-vdj-gold/30 bg-vdj-gold/5 backdrop-blur mb-6">
              <Sparkles className="w-4 h-4 text-vdj-gold" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-vdj-goldLight uppercase">
                Est. 1996 · Melbourne → Sydney → Colombo
              </span>
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight font-heading sm:text-6xl lg:text-7xl">
              The Ultimate
              <br />
              <span className="text-gold-gradient">Video DJ</span>
              <br />
              Experience.
            </h1>

            <p className="max-w-2xl mt-6 text-lg leading-relaxed sm:text-xl text-vdj-muted">
              Nearly <span className="font-semibold text-vdj-text">30 years</span> of professional DJ artistry. Creating unforgettable moments through music, visuals, and voice.
            </p>

            <div className="flex flex-col gap-5 mt-10 sm:flex-row">
              <Link
                to="/contact"
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-vdj-gold text-vdj-bg font-bold tracking-wide hover:bg-vdj-goldLight transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)]"
              >
                Book Your Event <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/packages"
                className="flex items-center justify-center px-8 py-4 font-semibold transition-all border rounded-full border-white/20 text-vdj-text hover:border-vdj-gold hover:text-vdj-goldLight glass-panel"
              >
                Explore Packages
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 h-[400px] sm:h-[500px] relative hidden lg:block">
             <VinylScene /> 
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS SECTION (BENTO GRID) */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-vdj-surface/30">
        <div className="px-6 mx-auto max-w-7xl lg:px-12">
          <div className="mb-16">
            <p className="font-mono text-xs tracking-[0.3em] text-vdj-gold mb-4">◢ SIGNATURE OFFERINGS</p>
            <h2 className="text-4xl font-bold font-heading sm:text-5xl">
              Three pillars of an <span className="italic text-vdj-gold">unforgettable</span> night.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {highlights.map((h, i) => (
              <div key={i} className="p-8 glass-panel rounded-2xl group">
                <div className="flex items-center justify-center mb-6 transition-colors duration-300 border w-14 h-14 rounded-xl bg-vdj-gold/10 border-vdj-gold/20 group-hover:bg-vdj-gold/20">
                  <h.icon className="w-7 h-7 text-vdj-gold" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold font-heading text-vdj-text">
                  {h.title}
                </h3>
                <p className="leading-relaxed text-vdj-muted">{h.desc}</p>
                <div className="mt-8 font-mono text-[10px] tracking-[0.3em] text-white/20">
                  0{i + 1} / 03
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}