import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";


export default function TesteDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teste, setTeste] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function carregarTeste() {
    try {
      const res = await fetch(`http://localhost:8080/testes/${id}`);
      const data = await res.json();
      setTeste(data);
    } catch (err) {
      console.error("Erro ao carregar teste:", err);
      alert("Erro ao carregar o teste.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarTeste();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDD0] flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto w-full p-8">
        <button
          onClick={() => navigate("/listaTestes")}
          className="px-4 py-2 bg-[#789c63] text-white rounded-lg hover:bg-[#6c8a58] mb-6"
        >
          ⬅ Voltar
        </button>

        {loading ? (
          <p className="text-gray-700">Carregando...</p>
        ) : !teste ? (
          <p className="text-red-600">Teste não encontrado.</p>
        ) : (
          <div className="bg-white shadow rounded-xl p-6">
            <h1 className="text-2xl font-semibold text-[#5a6e4f] mb-4">
              {teste.titulo}
            </h1>

            {/* Conteúdo do teste */}
            <div className="prose max-w-none whitespace-pre-line">
              {teste.conteudo}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
