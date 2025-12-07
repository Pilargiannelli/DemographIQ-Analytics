import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";

// Pages
import Home from "./pages/Home";
import Simulador from "./pages/Simulador";
import Servicios from "./pages/Servicios";
import Casos from "./pages/Casos";
import Precios from "./pages/Precios";
import PorQueElegirnos from "./pages/PorQueElegirnos";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";




function AppLayout() {
  const location = useLocation();

  // Detectamos si estamos en el checkout
  const esCheckout = location.pathname.startsWith("/checkout");

  return (
    <div className="layout">
      {/* Ocultamos Navbar en checkout */}
      {!esCheckout && <Navbar />}

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulador" element={<Simulador />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/casos" element={<Casos />} />
          <Route path="/precios" element={<Precios />} />
          <Route path="/por-que-elegirnos" element={<PorQueElegirnos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          

          {/* Checkout sin navbar ni footer */}
          <Route path="/checkout/:id" element={<Checkout />} />
        </Routes>
      </main>

      {/* Ocultamos Footer en checkout */}
      {!esCheckout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
