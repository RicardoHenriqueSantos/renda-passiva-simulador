import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="bg-[#0F766E] text-white shadow">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Renda Passiva Simulador</h1>

        {/* Botão de menu mobile */}
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="md:hidden"
        >
          {menuAberto ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menu de navegação */}
        <ul
          className={`flex flex-col md:flex-row gap-6 md:gap-8 absolute md:static top-16 left-0 w-full md:w-auto bg-green-700 md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none transition-all z-50 ${
            menuAberto ? "flex" : "hidden md:flex"
          }`}
        >
          <li>
            <Link to="/" className="hover:underline" onClick={() => setMenuAberto(false)}>Home</Link>
          </li>
          <li>
            <Link to="/simulacao" className="hover:underline" onClick={() => setMenuAberto(false)}>Simulação</Link>
          </li>
          <li>
            <Link to="/analise" className="hover:underline" onClick={() => setMenuAberto(false)}>Análise</Link>
          </li>
          {/* 
          <li>
            <Link to="/resultado" className="hover:underline" onClick={() => setMenuAberto(false)}>Resultado</Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:underline" onClick={() => setMenuAberto(false)}>Dashboard</Link>
          </li> 
          */}
          <li>
            <Link to="/conteudos" className="hover:underline" onClick={() => setMenuAberto(false)}>Conteúdos</Link>
          </li>
          <li>
            <Link to="/assistente" className="hover:underline" onClick={() => setMenuAberto(false)}>Assistente</Link>
          </li>
          <li>
            <Link to="/sobre" className="hover:underline" onClick={() => setMenuAberto(false)}>Sobre</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}