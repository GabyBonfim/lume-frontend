import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import DashboardBox from "../components/dashboardbox";
import ChatLumIA from "../components/ChatLumIA";

import { getTestesPorColaborador } from "../services/adm";

const API = "http://localhost:8080";

export default function Perfil() {
  const COLAB_ID = 21; // Adriano

  const [colaborador, setColaborador] = useState({
    id: COLAB_ID,
    nome: "",
    dataNascimento: "",
    cpf: "",
    email: "",
    numero: "",
  });

  const [testes, setTestes] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [testeSelecionado, setTesteSelecionado] = useState<any>(null);
  const [resposta, setResposta] = useState("");
  const [feedbackIA, setFeedbackIA] = useState("");

  // ===================================================
  // 1) Carregar Adriano e seus testes
  // ===================================================
  useEffect(() => {
    async function carregarAdriano() {
      try {
        // Backend NÃO TEM /colaboradores/{id}, então pegamos tudo
        const resp = await fetch(`${API}/colaboradores`);
        const lista = await resp.json();

        const adriano = lista.find((c: any) => c.id === COLAB_ID);
        if (adriano) {
          setColaborador(adriano);
        } else {
          console.error("Colaborador ID 21 não encontrado.");
        }

        // Carregar testes do Adriano
        const testesResp = await getTestesPorColaborador(COLAB_ID);
        setTestes(testesResp);
      } catch (e) {
        console.error("Erro ao carregar Adriano:", e);
      }
    }

    carregarAdriano();
  }, []);

  // ===================================================
  // 2) Abrir/fechar modal
  // ===================================================
  function abrirModal(teste: any) {
    setTesteSelecionado(teste);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setTesteSelecionado(null);
    setResposta("");
    setFeedbackIA("");
  }

  // ===================================================
  // 3) Enviar resposta → backend (feedback vem como TEXTO!)
  // ===================================================
async function enviarResposta() {
  try {
    const resp = await fetch(
      `${API}/colaboradores/${COLAB_ID}/teste/${testeSelecionado.id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resposta }),
      }
    );

    const texto = await resp.text(); // backend não retorna json
    setFeedbackIA(texto);

    // recarrega lista de testes
    const novosTestes = await getTestesPorColaborador(COLAB_ID);

    setTestes(novosTestes);
  } catch (e) {
    console.error("Erro ao enviar resposta:", e);
  }
}


  // ===================================================
  // RENDER
  // ===================================================
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDD0] text-gray-800">
      <Navbar />

      <main className="flex flex-col items-center py-16 px-6">
        <DashboardBox>
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            {/* ============================================
                ESQUERDA: DADOS DO COLABORADOR
            ============================================== */}
            <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
              <img
                src="/images/icon-user.png"
                className="w-24 h-24 rounded-full shadow mb-3"
              />

              <p className="font-semibold text-xl">
                {colaborador.nome || "Carregando..."}
              </p>

              <div className="mt-4 flex flex-col gap-2 text-sm w-full">
                <span className="bg-[#B3E099] px-4 py-1 rounded-xl shadow">
                  🎂 Nascimento: {colaborador.dataNascimento || "—"}
                </span>

                <span className="bg-[#B3E099] px-4 py-1 rounded-xl shadow">
                  📧 Email: {colaborador.email || "—"}
                </span>

                <span className="bg-[#B3E099] px-4 py-1 rounded-xl shadow">
                  📱 Telefone: {colaborador.numero || "—"}
                </span>
              </div>
            </div>

            {/* ============================================
                DIREITA: TESTES
            ============================================== */}
            <div className="w-full md:w-2/3">
              <h3 className="font-semibold mb-4">Para fazer:</h3>

              <div className="flex flex-col gap-4">
                {testes.length === 0 && (
                  <p className="italic text-gray-600">
                    Nenhum teste pendente 🎉
                  </p>
                )}

{testes.map((teste: any, index: number) => (
  <div
    key={`${teste.id}-${index}`}
    onClick={() => abrirModal(teste)}
    className="cursor-pointer flex items-center gap-3 bg-[#B3E099] py-3 px-4 rounded-xl shadow hover:shadow-md transition"
  >
    <img src="/images/icon-calendar.png" className="w-8 h-8" />
    <p className="font-medium">{teste.titulo}</p>
  </div>
))}

              </div>
            </div>
          </div>

          {/* CHAT */}
          <div className="mt-12">
  
                <ChatLumIA />
            
          </div>
        </DashboardBox>
      </main>

      <Footer />

      {/* ============================================
          MODAL DO TESTE
      ============================================== */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            <h2 className="font-semibold text-lg mb-3">
              {testeSelecionado?.titulo}
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              {testeSelecionado?.conteudo}
            </p>

            <textarea
              className="w-full border p-3 rounded-lg min-h-[120px]"
              value={resposta}
              onChange={(e) => setResposta(e.target.value)}
              placeholder="Digite sua resposta..."
            />

            {feedbackIA && (
              <div className="bg-[#B3E099] mt-4 p-3 rounded-lg text-gray-900">
                <p className="font-semibold">Feedback da LUM.IA:</p>
                <p>{feedbackIA}</p>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={fecharModal}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Fechar
              </button>

              <button
                onClick={enviarResposta}
                className="px-4 py-2 bg-[#B3E099] text-gray-900 rounded-lg shadow hover:shadow-md"
              >
                Enviar Resposta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
