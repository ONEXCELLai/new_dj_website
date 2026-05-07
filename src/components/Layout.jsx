import { NavLink, Link, useLocation, useOutlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Disc3 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" }, // අලුතින් එකතු කළා
  { to: "/packages", label: "Packages" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Reviews" },
];
export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const currentOutlet = useOutlet(); // අලුතින් එකතු කළ පේළිය



  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Timeout එකක් පාවිච්චි කරලා state එක update කිරීම (cascading render warning එක මගහැරීමට)
    setTimeout(() => {
      setOpen(false);
    }, 0);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-panel border-x-0 border-t-0 rounded-none" : "bg-transparent border-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-20 px-6 mx-auto max-w-7xl lg:px-12">
          <Link to="/" className="flex items-center gap-3 group">
            <Disc3 className="transition-transform duration-700 w-9 h-9 text-vdj-gold group-hover:rotate-180" />
            <div className="flex flex-col leading-none">
              <span className="text-lg font-black tracking-tight font-heading text-gold-gradient">VDJ VINS</span>
              <span className="font-mono text-[10px] text-vdj-goldLight tracking-[0.3em]">RADIANCE.LK</span>
            </div>
          </Link>

          <nav className="items-center hidden gap-2 lg:flex">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `relative px-5 py-2 text-sm font-medium tracking-wide transition-colors ${
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

          <button onClick={() => setOpen(!open)} className="lg:hidden text-vdj-gold">
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
              className="rounded-none lg:hidden glass-panel border-x-0"
            >
              <div className="flex flex-col gap-2 px-6 py-6">
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

      <main className="flex-1 pt-20">
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
          {/* <Outlet /> වෙනුවට currentOutlet දාන්න */}
          {currentOutlet}
        </motion.main>
      </AnimatePresence>
      </main>

{/* ... කලින් තිබ්බ footer එක ... */}
      <footer className="py-10 mt-20 border-t border-white/5 bg-vdj-surface/30">
        <div className="flex flex-col items-center gap-2 px-6 mx-auto font-mono text-sm text-center max-w-7xl text-vdj-muted">
          <span>© {new Date().getFullYear()} VDJ VINS · Radiance Entertainments</span>
          <span className="text-[10px] tracking-[0.2em] text-vdj-gold/50">LIGHT OF ASIA CENTRE, PELAWATTA</span>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON (මෙන්න මේ කොටස අලුතින් දාන්න) */}
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