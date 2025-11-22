import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const validarLogin = () => {
    // ADM
    if (email === "adm@lume.com" && senha === "1234") {
      localStorage.setItem("tipoUsuario", "adm");
      navigate("/perfilAdm");  // 🔥 ROTA CORRETA QUE EXISTE
      return;
    }

    // COLABORADOR
    if (email === "colab@lume.com" && senha === "1234") {
      localStorage.setItem("tipoUsuario", "colaborador");
      navigate("/perfil");  // 🔥 ROTA CORRETA QUE EXISTE
      return;
    }

    // Erro
    setErro("Login ou senha inválidos.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#D3E8B0] text-gray-800">
      
      {/* Logo */}
      <img 
        src="/images/logo-lume.png"
        alt="Logo LUME"
        className="w-56 mb-8"
      />

      <button
        onClick={() => setShowPopup(true)}
        className="bg-[#FFFDEB] hover:bg-[#f6f1b3] px-8 py-3 rounded-full shadow font-medium transition"
      >
        Entrar
      </button>

      <p className="text-sm text-gray-600 mt-8">
        © {new Date().getFullYear()} LUME — caminhos inteligentes guiados pela mente e dados.
      </p>

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          
          <div className="bg-[#FFFDEB] rounded-2xl p-10 w-96 shadow-xl relative">

            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-xl font-bold"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold text-center mb-6">
              Acessar conta
            </h2>

            <p className="text-gray-600 text-sm mb-4 text-center">
              Use os dados de exemplo:
              <br />
              <strong>ADM:</strong> adm@lume.com / 1234  
              <br />
              <strong>Colaborador:</strong> colab@lume.com / 1234
            </p>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#B3E099] outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Digite sua senha"
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#B3E099] outline-none"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              {erro && (
                <p className="text-red-500 text-sm text-center">{erro}</p>
              )}

              <button
                onClick={validarLogin}
                className="bg-[#B3E099] hover:bg-[#9dcf88] text-gray-900 px-6 py-2 rounded-full shadow font-medium transition mt-4"
              >
                Entrar
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
