import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Lock, LogOut, Loader2, Disc3, Calendar, Users, Phone, Mail, MapPin, RefreshCw } from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL ? `${import.meta.env.VITE_BACKEND_URL}/api` : "http://localhost:8000/api";
const TOKEN_KEY = "vdj_admin_token";

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || "");
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async (t = token) => {
    if (!t) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/admin/bookings`, {
        headers: { "X-Admin-Token": t },
      });
      setBookings(data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        setToken("");
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error("Failed to load bookings.");
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/admin/login`, { password });
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      toast.success("Welcome back, Vinodh.");
      fetchBookings(data.token);
    } catch {
      toast.error("Invalid password.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setBookings([]);
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `${API}/admin/bookings/${id}`,
        { status },
        { headers: { "X-Admin-Token": token } }
      );
      setBookings((b) => b.map((x) => (x.id === id ? { ...x, status } : x)));
      toast.success(`Marked as ${status}`);
    } catch {
      toast.error("Update failed.");
    }
  };

  useEffect(() => {
    if (token) {
      // Timeout එකක් යොදා ගැනීමෙන් cascading render warning එක මගහැරේ
      setTimeout(() => {
        fetchBookings(token);
      }, 0);
    }
    // මීළඟ පේළියෙන් missing dependencies warning එක අක්‍රිය කරයි
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!token) {
    return (
      <div className="relative flex items-center justify-center min-h-screen px-6">
        <form onSubmit={login} className="w-full max-w-sm p-8 glass-panel rounded-3xl border-vdj-gold/20">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <Disc3 className="w-8 h-8 text-vdj-gold" />
            <span className="text-lg font-black text-white font-heading">VDJ VINS · ADMIN</span>
          </Link>
          <h1 className="text-2xl font-bold text-white font-heading">Backstage access</h1>
          <p className="mt-1 text-sm text-vdj-muted">Enter the admin password to view bookings.</p>
          <div className="mt-6">
            <label className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">Password</label>
            <div className="relative mt-2">
              <Lock className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-white/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 pl-10 pr-4 text-white transition-colors border rounded-lg bg-black/50 border-white/10 focus:outline-none focus:border-vdj-gold focus:ring-1 focus:ring-vdj-gold"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full px-6 py-3 rounded-full bg-vdj-gold text-vdj-bg font-bold hover:bg-vdj-goldLight transition-colors disabled:opacity-60 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          >
            {loading ? "Authenticating..." : "Enter"}
          </button>
        </form>
      </div>
    );
  }

  const counts = {
    total: bookings.length,
    new: bookings.filter((b) => b.status === "new").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-vdj-bg">
      <header className="sticky top-0 z-30 border-b border-white/5 bg-vdj-surface/80 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl lg:px-12">
          <Link to="/" className="flex items-center gap-2">
            <Disc3 className="w-7 h-7 text-vdj-gold" />
            <span className="font-black text-white font-heading">VDJ VINS · ADMIN</span>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => fetchBookings()} className="p-2 text-white transition-colors border rounded-md border-white/10 hover:border-vdj-gold hover:text-vdj-gold">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors border rounded-md border-white/10 hover:border-red-500 hover:text-red-500">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-6 py-10 mx-auto max-w-7xl lg:px-12">
        {/* STATS */}
        <div className="grid grid-cols-2 gap-4 mb-10 lg:grid-cols-4">
          {[
            { label: "Total", value: counts.total, color: "#FFFFFF" },
            { label: "New", value: counts.new, color: "#F3E5AB" },
            { label: "Confirmed", value: counts.confirmed, color: "#D4AF37" },
            { label: "Completed", value: counts.completed, color: "#888888" },
          ].map((s, i) => (
            <div key={i} className="p-5 glass-panel rounded-2xl border-white/5">
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">{s.label}</div>
              <div className="mt-2 text-3xl font-black font-heading" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* BOOKINGS LIST */}
        {loading && bookings.length === 0 ? (
          <div className="flex items-center justify-center py-32 text-vdj-muted">
            <Loader2 className="w-6 h-6 mr-2 animate-spin" /> Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-16 text-center glass-panel rounded-2xl text-vdj-muted border-white/5">
            No bookings yet. They'll appear here as guests submit the contact form.
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b.id} className="grid gap-6 p-6 transition-colors glass-panel rounded-2xl lg:grid-cols-12 border-white/5 hover:border-vdj-gold/20">
                <div className="lg:col-span-4">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-vdj-goldLight uppercase">
                    {new Date(b.created_at).toLocaleDateString()}
                  </div>
                  <div className="mt-1 text-xl font-bold text-white font-heading">{b.name}</div>
                  <div className="text-sm text-white/70 flex items-center gap-1.5 mt-2">
                    <Mail className="w-3.5 h-3.5 text-vdj-gold" /> {b.email}
                  </div>
                  <div className="text-sm text-white/70 flex items-center gap-1.5 mt-1">
                    <Phone className="w-3.5 h-3.5 text-vdj-gold" /> {b.phone}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm lg:col-span-5">
                  <div className="flex items-center gap-2 text-white/90">
                    <Calendar className="w-4 h-4 text-vdj-gold" /> {b.event_date} {b.event_time && `at ${b.event_time}`}
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <MapPin className="w-4 h-4 text-vdj-gold" /> {b.venue_type}
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <Users className="w-4 h-4 text-vdj-gold" /> {b.guest_count} guests
                    {b.celebrant_name && <span className="text-white/50">· for {b.celebrant_name}</span>}
                  </div>
                  {b.package && (
                    <div className="font-mono text-[10px] tracking-[0.3em] text-vdj-goldLight uppercase mt-2">
                      Package: {b.package}
                    </div>
                  )}
                  {b.message && <p className="pt-2 text-sm italic text-white/60">"{b.message}"</p>}
                </div>

                <div className="flex flex-col gap-3 lg:col-span-3 lg:items-end">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-mono tracking-wider border ${
                      b.status === "new"
                        ? "bg-white/10 text-white border-white/30"
                        : b.status === "confirmed"
                        ? "bg-vdj-gold/10 text-vdj-gold border-vdj-gold/40"
                        : "bg-green-500/10 text-green-400 border-green-500/30"
                    }`}
                  >
                    {b.status.toUpperCase()}
                  </span>
                  
                  <div className="flex gap-2">
                    {b.status !== "confirmed" && b.status !== "completed" && (
                      <button
                        onClick={() => updateStatus(b.id, "confirmed")}
                        className="px-3 py-1.5 rounded text-xs border border-vdj-gold/40 text-vdj-gold hover:bg-vdj-gold/10 transition-colors"
                      >
                        Confirm
                      </button>
                    )}
                    {b.status !== "completed" && (
                      <button
                        onClick={() => updateStatus(b.id, "completed")}
                        className="px-3 py-1.5 rounded text-xs border border-green-500/40 text-green-400 hover:bg-green-500/10 transition-colors"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}