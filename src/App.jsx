import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Simulacao from "./pages/Simulacao";
import Analise from "./pages/Analise";
import Resultado from "./pages/Resultado";
import Dashboard from "./pages/Dashboard";
import Conteudos from "./pages/Conteudos";
import Assistente from "./pages/Assistente";
import Sobre from "./pages/Sobre";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulacao" element={<Simulacao />} />
        <Route path="/analise" element={<Analise />} />
        <Route path="/resultado" element={<Resultado />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/conteudos" element={<Conteudos />} />
        <Route path="/assistente" element={<Assistente />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
      <Footer />
    </Router>
  );
}
