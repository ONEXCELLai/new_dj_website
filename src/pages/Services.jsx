import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HeartHandshake, Briefcase, Mic2, Cake, Tv, Sparkles, ArrowRight, Music } from "lucide-react";

const services = [
  {
    id: "weddings",
    icon: HeartHandshake,
    title: "Weddings & Homecomings",
    desc: "A wedding is a once-in-a-lifetime moment. I provide carefully curated background music for arrivals and ceremonies, smooth transitions, and high-energy dance sets to end the night right. Coordinating closely with your event planner.",
    features: ["Custom Entrance Tracks", "Bilingual Announcements", "Elegant Visuals", "Strict Timeline Adherence"],
  },
  {
    id: "corporate",
    icon: Briefcase,
    title: "Corporate Events & Galas",
    desc: "From product launches to end-of-year galas, corporate events require a delicate balance of professionalism and entertainment. I ensure crystal-clear audio for speeches and the perfect vibe for networking or dancing.",
    features: ["Awards Walk-up Music", "Wireless Mics for Speeches", "Background Ambience", "Brand-tailored Visuals"],
  },
  {
    id: "karaoke",
    icon: Mic2,
    title: "Live Karaoke Hosting",
    desc: "Turn your guests into stars. With a massive curated library and live video lyrics displayed on screens, I host interactive karaoke sessions that keep the energy high and encourage everyone to participate.",
    features: ["Vocal Balancing", "Confidence-building MCing", "Extensive Song Library", "Seamless DJ Transitions"],
  },
  {
    id: "kids-parties",
    icon: Cake,
    title: "Kids & Teen Parties",
    desc: "Keeping young crowds engaged is an art. I combine age-appropriate music videos, interactive games, and guided dance routines to ensure the kids are entertained from start to finish.",
    features: ["Clean Music Edits", "Interactive Games", "TikTok/Viral Trends", "High Energy Pace"],
  },
  {
    id: "greeting-tracks",
    icon: Music,
    title: "Custom Greeting Tracks",
    desc: "Make birthdays, anniversaries, and special moments truly unforgettable. I professionally mix and produce custom audio tracks featuring your personalized voice messages, favorite songs, and surprise shoutouts.",
    features: ["Voice Message Mixing", "Studio Quality Output", "Surprise Reveals", "Personalized Edits"],
  },
  {
    id: "radiance-production",
    icon: Tv,
    title: "Full Event Production",
    desc: "Powered by Radiance Entertainments, we offer comprehensive technical solutions for large-scale events so you don't have to hire multiple vendors.",
    features: ["High-Res LED Walls", "Roba 17R Beam Lighting", "Event Management", "Project Consulting"],
  }
];

export default function Services() {
  return (
    <div className="relative min-h-screen">
      {/* HEADER SECTION */}
      <section className="relative pt-16 pb-12 overflow-hidden">
        <div className="relative z-10 px-6 mx-auto max-w-7xl lg:px-12">
          <p className="font-mono text-xs tracking-[0.3em] text-vdj-gold">◢ WHAT I DO</p>
          <h1 className="font-heading mt-4 text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95]">
            Tailored for
            <br />
            <span className="text-gold-gradient">every crowd.</span>
          </h1>
          <p className="max-w-2xl mt-6 text-lg text-vdj-muted">
            From intimate weddings to large corporate galas, every setup is engineered to deliver the perfect balance of sight and sound.
          </p>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="relative z-10 pb-24">
        <div className="px-6 mx-auto space-y-8 max-w-7xl lg:px-12">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="grid items-center gap-8 p-8 transition-all glass-panel rounded-3xl sm:p-12 border-white/5 hover:border-vdj-gold/20 group lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-8">
                <div className="flex items-center justify-center w-16 h-16 mb-6 transition-transform duration-500 border rounded-2xl bg-vdj-gold/10 border-vdj-gold/20 group-hover:scale-110">
                  <s.icon className="w-8 h-8 text-vdj-gold" />
                </div>
                <h2 className="mb-4 text-3xl font-bold text-white font-heading sm:text-4xl">
                  {s.title}
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-vdj-muted">
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-3">
                  {s.features.map((f, j) => (
                    <span key={j} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-vdj-gold" /> {f}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex mt-6 lg:col-span-4 lg:justify-end lg:mt-0">
                <Link
                  to={`/contact?package=${s.id}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-vdj-gold/50 text-vdj-gold hover:bg-vdj-gold hover:text-vdj-bg transition-all font-semibold shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] w-full lg:w-auto"
                >
                  Inquire Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}