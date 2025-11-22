import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Lê o tipo do usuário — caso não exista, vira null sem quebrar nada
  const tipo = localStorage.getItem("tipoUsuario"); 
  // valores esperados: "adm" ou "colaborador"

  return (
    <nav className="bg-[#FFFDD0] py-8 shadow-sm">
      <div className="container mx-auto flex justify-center items-center space-x-10 text-gray-800 font-medium">

        {/* Sempre visível */}
        <Link to="/" className="hover:text-gray-600 transition-colors">
          Homepage
        </Link>

        {/* ADM vê Análise de Perfil */}
        {tipo === "adm" && (
          <Link to="/perfilAdm" className="hover:text-gray-600 transition-colors">
            Análise de perfil
          </Link>
        )}

        {/* Colaborador vê PERFIL */}
        {tipo === "colaborador" && (
          <Link to="/perfil" className="hover:text-gray-600 transition-colors">
            Perfil
          </Link>
        )}

        {/* Sobre: sempre visível */}
        <Link to="/sobre" className="hover:text-gray-600 transition-colors">
          Sobre Nós
        </Link>

        {/* Login: sempre visível */}
        <Link to="/login" className="hover:text-gray-600 transition-colors">
          Login
        </Link>
      </div>

      {/* Logo aparece apenas fora da homepage */}
      {!isHomePage && (
        <div className="flex justify-center mt-3">
          <img
            src="/images/logo-lume.png"
            alt="Logo Lume"
            className="w-40 h-auto mx-auto"
          />
        </div>
      )}
    </nav>
  );
}
