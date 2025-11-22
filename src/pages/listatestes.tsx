import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTodosTestes } from "../services/adm";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function ListaTestes() {
  const navigate = useNavigate();

  const [testes, setTestes] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const lista = await getTodosTestes();
        setTestes(lista);
      } catch (error) {
        setErro("Erro ao carregar testes");
      }
    }
    carregar();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDD0] flex flex-col">
      <Navbar />

      <main className="max-w-5xl mx-auto p-6 w-full">
        <h1 className="text-2xl font-semibold text-[#5a6e4f] mb-6">
          Todos os Testes Criados
        </h1>

        {erro && (
          <div className="bg-red-200 text-red-800 p-3 rounded mb-4">
            {erro}
          </div>
        )}

        {testes.length === 0 ? (
          <p className="text-gray-600">Nenhum teste foi gerado ainda.</p>
        ) : (
          <ul className="space-y-4">
            {testes.map((t: any) => (
              <li
                key={t.id}
                className="bg-white shadow rounded-xl p-4 border border-gray-200"
              >
                <p className="font-semibold text-lg">{t.titulo}</p>

                <p className="text-gray-700 mt-2 whitespace-pre-line">
                  {t.conteudo.length > 300
                    ? t.conteudo.substring(0, 300) + "..."
                    : t.conteudo}
                </p>

                <button
                  onClick={() => navigate(`/listaTestes/${t.id}`)}
                  className="mt-3 px-4 py-1 bg-[#789c63] text-white rounded hover:bg-[#6c8a58]"
                >
                  Ver completo
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}
