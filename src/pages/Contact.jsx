import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { Phone, Mail, MapPin, Building2, Send, Loader2 } from "lucide-react";
import SpeakerScene from "../components/three/SpeakerScene";

// Vite වලදී env variables ගන්නේ import.meta.env හරහා
const API = import.meta.env.VITE_BACKEND_URL ? `${import.meta.env.VITE_BACKEND_URL}/api` : "http://localhost:8000/api";

const venueTypes = [
  "Wedding Hall",
  "Hotel Ballroom",
  "Private Residence",
  "Beach / Outdoor",
  "Corporate Venue",
  "Restaurant / Lounge",
  "Other",
];

export default function Contact() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    event_date: "",
    event_time: "",
    venue_type: venueTypes[0],
    celebrant_name: "",
    guest_count: 50,
    package: params.get("package") || "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "number" ? Number(e.target.value) : e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.event_date) {
      toast.error("Please fill in name, email, phone and event date.");
      return;
    }
    setLoading(true);
    try {
      // 1. මුලින්ම Database එකට Save කරනවා (Admin Dashboard එකට)
      await axios.post(`${API}/bookings`, form);

      // 2. WhatsApp එකට යවන්න ඕන Message එක ලස්සනට හදාගන්නවා
      const waMessage = `*New Booking Request (VDJ Vins)* 🎧\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Email:* ${form.email}\n*Event Date:* ${form.event_date}\n*Time:* ${form.event_time}\n*Venue:* ${form.venue_type}\n*Guest Count:* ${form.guest_count}\n*Package:* ${form.package}\n\n*Message:* ${form.message}`;

      // URL එකට ගැළපෙන විදිහට Text එක encode කරනවා
      const encodedMessage = encodeURIComponent(waMessage);
      // ඔයාගේ නම්බර් එක (94773335050) මෙතන තියෙනවා
      const waURL = `https://wa.me/94773335050?text=${encodedMessage}`;

      toast.success("Booking received! Opening WhatsApp...");

      // 3. අලුත් Tab එකකින් WhatsApp Open කරනවා
      window.open(waURL, "_blank");

      // Form එක හිස් කරනවා
      setForm({
        name: "", email: "", phone: "", event_date: "", event_time: "",
        venue_type: venueTypes[0], celebrant_name: "", guest_count: 50, package: "", message: "",
      });
    } catch {
      toast.error("Could not submit. Please try again or call directly.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-vdj-gold focus:ring-1 focus:ring-vdj-gold transition-colors";

  return (
    <div className="relative">
      <section className="relative pt-16 pb-12">
        <div className="relative z-10 px-6 mx-auto max-w-7xl lg:px-12">
          <p className="font-mono text-xs tracking-[0.3em] text-vdj-goldLight">◢ BOOK THE NIGHT</p>
          <h1 className="font-heading mt-4 text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95]">
            Let's design
            <br />
            <span className="text-gold-gradient">your event.</span>
          </h1>
          <p className="max-w-2xl mt-6 text-lg text-vdj-muted">
            Share the basics — Vinodh will respond personally within 24 hours with a tailored quote.
          </p>
        </div>
      </section>

      <section className="relative z-10 pb-28">
        <div className="grid gap-10 px-6 mx-auto max-w-7xl lg:px-12 lg:grid-cols-12">
          {/* FORM */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 glass-panel rounded-3xl p-7 sm:p-10 border-white/10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">Your Name *</label>
                <input required value={form.name} onChange={update("name")} className={`${inputCls} mt-2`} placeholder="Jane Perera" />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">Email *</label>
                <input required type="email" value={form.email} onChange={update("email")} className={`${inputCls} mt-2`} placeholder="you@example.com" />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">Phone / WhatsApp *</label>
                <input required value={form.phone} onChange={update("phone")} className={`${inputCls} mt-2`} placeholder="+94 77 ..." />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">Celebrant Name</label>
                <input value={form.celebrant_name} onChange={update("celebrant_name")} className={`${inputCls} mt-2`} placeholder="Bride / Birthday Star" />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">Event Date *</label>
                <input required type="date" value={form.event_date} onChange={update("event_date")} className={`${inputCls} mt-2`} />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">Event Time</label>
                <input type="time" value={form.event_time} onChange={update("event_time")} className={`${inputCls} mt-2`} />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">Venue Type</label>
                <select value={form.venue_type} onChange={update("venue_type")} className={`${inputCls} mt-2`}>
                  {venueTypes.map((v) => (
                    <option key={v} value={v} className="text-white bg-vdj-surface">
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">Guest Count</label>
                <input type="number" min={1} value={form.guest_count} onChange={update("guest_count")} className={`${inputCls} mt-2`} />
              </div>
            </div>
            <div className="mt-5">
              <label className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">Tell Vinodh about your event</label>
              <textarea
                value={form.message}
                onChange={update("message")}
                rows={4}
                className={`${inputCls} mt-2 resize-none`}
                placeholder="Theme, must-play songs, special moments..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-vdj-gold text-vdj-bg font-bold tracking-wide hover:bg-vdj-goldLight transition-all disabled:opacity-60 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
              ) : (
                <>Send Booking Request <Send className="w-5 h-5" /></>
              )}
            </button>
          </motion.form>

          {/* CONTACT INFO */}
          <div className="space-y-6 lg:col-span-5">
            <div className="relative h-56 p-2 overflow-hidden rounded-3xl glass-panel border-white/5">
              <div className="relative w-full h-full bg-black/50 rounded-2xl">
                <SpeakerScene />
              </div>
              <div className="absolute bottom-6 left-6 font-mono text-[10px] tracking-[0.3em] text-vdj-goldLight">
                STEREO · LIVE
              </div>
            </div>

            {[
              { icon: Phone, label: "Mobile · WhatsApp", value: "+94 77 333 5050", href: "tel:+94773335050" },
              { icon: Mail, label: "Email", value: "vinodh18@gmail.com", href: "mailto:vinodh18@gmail.com" },
              { icon: Building2, label: "Company", value: "Radiance Entertainments (Pvt) Ltd" },
              { icon: MapPin, label: "Studio", value: "Light of Asia Centre, Pelawatta, Battaramulla" },
            ].map((c, i) => (
              <motion.a
                key={i}
                whileHover={{ y: -4 }}
                href={c.href || "#"}
                className="block p-6 glass-panel rounded-2xl group border-white/5 hover:border-vdj-gold/30"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 transition-colors border rounded-xl bg-vdj-gold/10 border-vdj-gold/20 group-hover:bg-vdj-gold/20">
                    <c.icon className="w-5 h-5 text-vdj-gold" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-vdj-muted uppercase">{c.label}</div>
                    <div className="mt-1 text-base font-medium text-white transition-colors sm:text-lg group-hover:text-vdj-goldLight">
                      {c.value}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}

            <div className="pt-2 text-xs text-center text-white/20">
              <a href="/admin" className="transition-colors hover:text-vdj-gold">
                · admin login ·
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
