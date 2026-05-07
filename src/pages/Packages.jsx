import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cake, PartyPopper, Sparkles, Heart, Briefcase, Mic2, ArrowUpRight, Lightbulb, Tv, Layers, Wrench } from "lucide-react";

const packages = [
  {
    id: "basic",
    name: "Basic Party",
    price: "35,000",
    pax: "Up to 50 pax",
    icon: PartyPopper,
    featured: false,
    perks: ["Behringer DSP 215 Powered Speakers", "Pioneer DDJ-SB3 Console", "Derby Light & Colour Washes", "Transport & Setup included"],
  },
  {
    id: "advanced",
    name: "Advanced Party",
    price: "45,000",
    pax: "Up to 100 pax",
    icon: Sparkles,
    featured: true, // මේකට premium gold glow එකක් එනවා
    perks: ["RCF 715 Tops & 708 Subwoofers", "Pioneer DDJ-1000 Console", "Moving Heads & Mirror Ball", "TV/Projector for Karaoke"],
  },
  {
    id: "kids-teen",
    name: "Kids & Teen Birthday",
    price: "40,000",
    pax: "Up to 50 pax",
    icon: Cake,
    featured: false,
    perks: ["Age-appropriate Music Videos", "Interactive Games & Dance", "Guided Karaoke", "Strong microphone control"],
  },
  {
    id: "wedding",
    name: "Wedding VDJ",
    price: "60,000",
    pax: "Up to 150 pax",
    icon: Heart,
    featured: true,
    perks: ["Curated wedding visuals", "Smooth moment coordination", "Balanced programming", "Wireless mics & full backup"],
  },
  {
    id: "corporate",
    name: "Corporate Events",
    price: "50,000",
    pax: "Large setups",
    icon: Briefcase,
    featured: false,
    perks: ["Professional-grade production", "Additional 18\" Bins & Amp", "Truss Bar Lighting", "Presentations support"],
  },
  {
    id: "karaoke",
    name: "Karaoke & Dance",
    price: "45,000",
    pax: "Signature Experience",
    icon: Mic2,
    featured: false,
    perks: ["Large curated library", "Live video lyrics", "Vocal balancing", "Seamless dance transitions"],
  },
];

const radiance = [
  { icon: Layers, title: "Event Management", desc: "End-to-end planning, vendor coordination, run-of-show." },
  { icon: Tv, title: "LED Walls", desc: "High-res LED screens for visuals, sponsors, and stage backdrops." },
  { icon: Lightbulb, title: "Roba 17R Beams", desc: "Industry-grade beam lighting for cinematic effect." },
  { icon: Wrench, title: "Project Consulting", desc: "Technical consulting for large-scale productions." },
];

export default function Packages() {
  return (
    <div className="relative">
      {/* HEADER SECTION */}
      <section className="relative pt-16 pb-12 overflow-hidden">
        <div className="relative z-10 px-6 mx-auto max-w-7xl lg:px-12">
          <p className="font-mono text-xs tracking-[0.3em] text-vdj-gold">◢ PACKAGES & SERVICES</p>
          <h1 className="font-heading mt-4 text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95]">
            Pick the night
            <br />
            <span className="text-gold-gradient">you want to throw.</span>
          </h1>
          <p className="max-w-2xl mt-6 text-lg text-vdj-muted">
            All packages are starting points — final quote is shaped around your venue, guest count and timeline. Prices in Sri Lankan Rupees.
          </p>
        </div>
      </section>

      {/* PACKAGES GRID */}
      <section className="relative z-10 pb-20">
        <div className="grid gap-6 px-6 mx-auto max-w-7xl lg:px-12 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className={`relative rounded-2xl p-8 group transition-all glass-panel ${
                p.featured ? "border-vdj-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.15)]" : "border-white/10"
              }`}
            >
              {p.featured && (
                <span className="absolute top-5 right-5 font-mono text-[10px] tracking-[0.3em] text-vdj-gold">
                  ★ POPULAR
                </span>
              )}
              <div className="flex items-center justify-center mb-6 border w-14 h-14 rounded-xl bg-vdj-gold/10 border-vdj-gold/20">
                <p.icon className="w-7 h-7 text-vdj-gold" />
              </div>
              <h3 className="text-2xl font-bold text-white font-heading">{p.name}</h3>
              <p className="font-mono text-xs tracking-[0.2em] text-white/50 mt-1">{p.pax}</p>

              <div className="flex items-baseline gap-2 mt-6">
                <span className="font-mono text-sm text-vdj-goldLight">FROM</span>
                <span className="text-4xl font-black font-heading text-vdj-gold">
                  Rs. {p.price}
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                {p.perks.map((perk, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-vdj-gold" />
                    {perk}
                  </li>
                ))}
              </ul>

              <Link
                to={`/contact?package=${p.id}`}
                className="inline-flex items-center gap-2 pb-1 mt-8 text-sm font-semibold text-white transition-colors border-b border-white/20 hover:border-vdj-gold hover:text-vdj-gold"
              >
                Reserve this package <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* RADIANCE ADD-ONS SECTION */}
      <section className="relative py-24 border-t border-white/5 bg-vdj-surface/50">
        <div className="px-6 mx-auto max-w-7xl lg:px-12">
          <div className="grid items-end gap-10 lg:grid-cols-12 mb-14">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs tracking-[0.3em] text-vdj-goldLight">◢ RADIANCE ENTERTAINMENTS</p>
              <h2 className="mt-4 text-4xl font-bold text-white font-heading sm:text-5xl">
                Beyond the booth — full production add-ons.
              </h2>
            </div>
            <div className="text-base lg:col-span-5 text-vdj-muted">
              For larger events, Radiance Entertainments (Pvt) Ltd brings full production muscle: LED walls, advanced lighting, event management, and project consulting.
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {radiance.map((r, i) => (
              <div key={i} className="p-6 transition-transform glass-panel rounded-2xl group hover:-translate-y-1 border-white/5 hover:border-vdj-gold/30">
                <r.icon className="w-8 h-8 mb-4 text-vdj-gold" />
                <h4 className="text-lg font-semibold text-white font-heading">{r.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-vdj-muted">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}