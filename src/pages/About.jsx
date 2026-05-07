import { motion } from "framer-motion";
import { Mic2, Palette, ShieldCheck, Check, Globe2 } from "lucide-react";

const reasons = [
  {
    icon: Mic2,
    title: "Calm & Confident Mic Control",
    desc: "Years of MC craft mean smooth segues, audience reads, and on-the-fly adjustments. Coordinating perfectly with Event Managers for a smooth flow.",
  },
  {
    icon: Palette,
    title: "Customised Music & Visuals",
    desc: "Sets are tailored to your culture, age group, and theme — Sinhala classics, Bollywood bangers, EDM, golden oldies — synced with curated visuals.",
  },
  {
    icon: ShieldCheck,
    title: "Professional Equipment & Backups",
    desc: "Everything is owned, tested, and redundant. Arrival 2 hours prior to guest arrival. Your night is engineered to never miss a beat.",
  },
];

export default function About() {
  return (
    <div className="relative">
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="relative grid items-center gap-12 px-6 mx-auto max-w-7xl lg:px-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs tracking-[0.3em] text-vdj-gold">◢ MEET THE ARTIST</p>
            <h1 className="font-heading mt-4 text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95]">
              Vinodh Seneviratne.
              <br />
              <span className="text-gold-gradient">
                A.K.A VDJ Vins.
              </span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed mt-7 text-vdj-muted">
              He's not just a DJ. Vinodh engages audiences{" "}
              <span className="font-semibold text-white">visually, verbally, and emotionally</span>{" "}
              — pairing Video DJ techniques with curated music videos and live karaoke visuals to
              transform any room into a story.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-10">
              {/* (c, i) වෙනුවට (c) පමණක් යොදන්න */}
{["Melbourne", "Sydney", "Colombo"].map((c) => (
  <div
    key={c}
    className="flex items-center gap-2 px-4 py-2 text-sm border rounded-full border-vdj-gold/20 text-white/80 bg-black/40 backdrop-blur"
  >
    <Globe2 className="w-4 h-4 text-vdj-gold" />
    {c}
  </div>
))}
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-panel p-2">
              <img
                src="https://images.unsplash.com/photo-1764510383709-14be6ec28548?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwyfHxESiUyMHBlcmZvcm1hbmNlJTIwbmlnaHQlMjBjbHVifGVufDB8fHx8MTc3ODA3MzY5MHww&ixlib=rb-4.1.0&q=85"
                alt="VDJ Vins performing"
                className="w-full h-full object-cover rounded-2xl opacity-90 grayscale-[20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="font-mono text-[10px] tracking-[0.3em] text-vdj-goldLight">// LIVE FROM COLOMBO</div>
                <div className="mt-2 text-2xl font-bold font-heading">Where the night begins.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE HIM */}
      <section className="relative py-20 sm:py-28 border-y border-white/5 bg-vdj-surface/30">
        <div className="px-6 mx-auto max-w-7xl lg:px-12">
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-[0.3em] text-vdj-goldLight">◢ WHY VINS</p>
            <h2 className="mt-4 text-4xl font-bold font-heading sm:text-5xl">
              Crafted for crowds. Engineered for chaos.
            </h2>
          </div>

          <div className="grid gap-6 mt-16 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                className="p-8 glass-panel rounded-2xl group"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-6 border rounded-xl bg-vdj-gold/10 border-vdj-gold/30">
                    <r.icon className="w-6 h-6 text-vdj-gold" />
                </div>
                <h3 className="text-xl font-semibold text-white font-heading">{r.title}</h3>
                <p className="mt-3 leading-relaxed text-vdj-muted">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="py-24">
        <div className="max-w-5xl px-6 mx-auto lg:px-12">
          <h3 className="text-3xl font-bold text-center font-heading sm:text-4xl">What you get on the night</h3>
          <div className="grid mt-12 sm:grid-cols-2 gap-x-12 gap-y-5">
            {[
              "Premium Pioneer & Denon DJ controllers",
              "Wireless mics with full backup systems",
              "Full HD/4K video mixing setup",
              "Customised lighting tuned to room size",
              "Bilingual MC (English / Sinhala)",
              "On-site arrival 2 hours before guests",
              "LED Wall add-ons (via Radiance)",
              "Event Management Consulting",
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-lg glass-panel">
                <div className="flex items-center justify-center flex-shrink-0 w-5 h-5 mt-1 border rounded-full bg-vdj-gold/10 border-vdj-gold/40">
                  <Check className="w-3 h-3 text-vdj-gold" />
                </div>
                <span className="text-white/80">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}