import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Packages from "./pages/Packages";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Gallery from "./pages/Gallery"; // Gallery Import කළා
import Services from "./pages/Services";

function App() {
  return (
    <div className="min-h-screen font-sans bg-vdj-bg text-vdj-text">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/gallery" element={<Gallery />} /> {/* Gallery Route එක */}
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <Toaster 
        theme="dark" 
        position="top-right" 
        toastOptions={{
          style: {
            background: 'rgba(18, 18, 18, 0.9)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            color: '#fff',
          }
        }} 
      />
    </div>
  );
}

export default App;