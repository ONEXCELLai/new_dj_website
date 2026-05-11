import { NavLink, Link, useLocation, useOutlet } from "react-router-dom";
import { useEffect, useState } from "react";
// Instagram, Youtube, Facebook අයින් කරලා තියෙන්නේ
import { Menu, X, Disc3, Mail, Phone, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Lucide Library එකෙන් Brand Icons අයින් කරපු නිසා අපි ඒ වෙනුවට Custom SVGs පාවිච්චි කරමු
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const YoutubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 5.4 3.9 4 5.6 4h12.8c1.7 0 3.1 1.4 3.1 3.1v9.8c0 1.7-1.4 3.1-3.1 3.1H5.6C3.9 20 2.5 18.6 2.5 16.9V7.1z"/><path d="m9.5 15.5 6-3.5-6-3.5v7z"/></svg>;

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/packages", label: "Packages" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Reviews" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const currentOutlet = useOutlet();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 0);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-panel border-x-0 border-t-0 rounded-none bg-[#0a0a0a]/90" : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <Disc3 className="w-9 h-9 text-vdj-gold group-hover:rotate-180 transition-transform duration-700" />
            <div className="flex flex-col leading-none">
              <span className="font-heading font-black text-lg tracking-tight text-gold-gradient">VDJ VINS</span>
              <span className="font-mono text-[10px] text-vdj-goldLight tracking-[0.3em]">RADIANCE.LK</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                    isActive ? "text-vdj-gold" : "text-white/70 hover:text-vdj-goldLight"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="ml-4 px-6 py-2.5 rounded-full border border-vdj-gold text-vdj-gold text-sm font-bold hover:bg-vdj-gold hover:text-vdj-bg transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
            >
              Book Now
            </Link>
          </nav>

          <button onClick={() => setOpen(!open)} className="lg:hidden text-vdj-gold p-2">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden glass-panel border-x-0 rounded-none bg-[#0a0a0a]"
            >
              <div className="px-6 py-6 flex flex-col gap-2">
                {navItems.map((n) => (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-md text-base font-medium ${
                        isActive ? "bg-vdj-gold/10 text-vdj-gold" : "text-white/80 hover:bg-white/5"
                      }`
                    }
                  >
                    {n.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* PAGE TRANSITION ANIMATIONS */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex-1 pt-20"
        >
          {currentOutlet}
        </motion.main>
      </AnimatePresence>

      {/* PROFESSIONAL FOOTER */}
      <footer className="mt-20 border-t border-white/10 bg-[#05050A] pt-16 pb-8 relative z-10 overflow-hidden">
        {/* Glow effect for footer */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-vdj-gold/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <Disc3 className="w-8 h-8 text-vdj-gold" />
              <div className="flex flex-col leading-none">
                <span className="font-heading font-black text-xl tracking-tight text-white">VDJ VINS</span>
                <span className="font-mono text-[9px] text-vdj-goldLight tracking-[0.3em] mt-1">RADIANCE.LK</span>
              </div>
            </Link>
            <p className="text-vdj-muted text-sm leading-relaxed mb-6">
              Sri Lanka's premier Video DJ, bringing nearly 30 years of international experience to weddings, corporate galas, and luxury parties.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-vdj-gold hover:text-vdj-bg transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-vdj-gold hover:text-vdj-bg transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-vdj-gold hover:text-vdj-bg transition-colors">
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navItems.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-vdj-muted hover:text-vdj-gold transition-colors text-sm">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+94773335050" className="flex items-center gap-3 text-vdj-muted hover:text-vdj-gold transition-colors text-sm">
                  <Phone className="w-4 h-4 text-vdj-gold/70" /> +94 77 333 5050
                </a>
              </li>
              <li>
                <a href="mailto:vinodh18@gmail.com" className="flex items-center gap-3 text-vdj-muted hover:text-vdj-gold transition-colors text-sm">
                  <Mail className="w-4 h-4 text-vdj-gold/70" /> vinodh18@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-vdj-muted text-sm">
                <MapPin className="w-4 h-4 text-vdj-gold/70 shrink-0 mt-0.5" /> 
                <span>Light of Asia Centre,<br/>Pelawatta, Battaramulla</span>
              </li>
            </ul>
          </div>

          {/* CTA / Company Info */}
          <div>
            <h4 className="font-heading font-bold text-white mb-6">Radiance Entertainments</h4>
            <p className="text-vdj-muted text-sm leading-relaxed mb-6">
              For complete event management, LED walls, and professional lighting setups.
            </p>
            <Link to="/contact" className="inline-block px-6 py-2 border border-vdj-gold/50 text-vdj-gold rounded-full text-sm font-semibold hover:bg-vdj-gold hover:text-vdj-bg transition-all">
              Request a Quote
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-vdj-muted/70 relative">
          <p>© {new Date().getFullYear()} VDJ Vins. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/admin" className="hover:text-vdj-gold transition-colors">Admin Login</Link>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/94773335050"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_4px_25px_rgba(37,211,102,0.6)] transition-all duration-300 flex items-center justify-center group"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 0C5.385 0 0 5.384 0 12.032c0 2.658.687 5.24 1.996 7.514L.048 24l4.636-1.216A11.961 11.961 0 0012.031 24c6.646 0 12.03-5.384 12.03-12.032C24.06 5.384 18.676 0 12.031 0zm3.626 17.202c-.546 1.543-3.136 1.597-3.327 1.6-.234.004-1.127-.184-3.175-1.04-2.827-1.182-4.66-4.086-4.802-4.276-.142-.19-1.144-1.523-1.144-2.906 0-1.383.712-2.06 1.002-2.368.24-.254.665-.333.955-.333.284 0 .445.012.636.012.235 0 .551-.09.86.657.327.79.882 2.152.955 2.295.074.143.143.333.023.571-.118.238-.184.381-.375.603-.19.223-.403.486-.569.629-.19.167-.394.349-.166.741.228.393 1.018 1.68 2.186 2.723 1.51 1.348 2.766 1.767 3.167 1.956.398.19.64.167.876-.104.238-.27.994-1.157 1.256-1.554.26-.398.523-.333.882-.19.355.143 2.247 1.058 2.632 1.25.385.19.64.285.735.444.096.158.096.918-.45 2.46z"/>
        </svg>
      </a>
    </div>
  );
}