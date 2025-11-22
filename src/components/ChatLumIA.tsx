import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ChatLumIA() {
  const [mensagem, setMensagem] = useState("");
  const [historico, setHistorico] = useState<
    { autor: string; texto: string }[]
  >([]);
  const [digitando, setDigitando] = useState(false);

  async function enviar() {
    if (!mensagem.trim()) return;

    // Mensagem do usuário
    const novaMsg = { autor: "usuario", texto: mensagem };
    setHistorico((prev) => [...prev, novaMsg]);

    setMensagem("");
    setDigitando(true);

    try {
      const resposta = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagem: novaMsg.texto }),
      });

      const data = await resposta.json();
      setDigitando(false);

      // Resposta da IA
      setHistorico((prev) => [
        ...prev,
        { autor: "lumia", texto: data.resposta },
      ]);
    } catch (e) {
      setDigitando(false);
      setHistorico((prev) => [
        ...prev,
        { autor: "lumia", texto: "Erro ao se comunicar com a LUM.IA." },
      ]);
    }
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">

      <div className="bg-[#B3E099] font-semibold px-4 py-2 rounded-t-xl text-gray-900">
        Chat com LUM.IA
      </div>

      {/* LISTA DE MENSAGENS */}
      <div className="p-4 h-80 overflow-y-auto flex flex-col space-y-3">

        {historico.map((msg, index) => (
          <div
            key={index}
            className={`p-3 max-w-[85%] rounded-xl shadow-sm leading-relaxed prose prose-sm
              ${msg.autor === "usuario"
                ? "bg-[#DCF7C5] self-end ml-auto text-right prose-p:m-0"
                : "bg-[#B3E099] text-left prose-p:m-0"
              }`}
          >
            {msg.autor === "lumia" ? (
              <ReactMarkdown>{msg.texto}</ReactMarkdown>
            ) : (
              <span>{msg.texto}</span>
            )}
          </div>
        ))}

        {digitando && (
          <div className="bg-[#B3E099] p-2 rounded-lg w-24 text-center text-gray-700">
            digitando...
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="flex gap-2 p-2">
        <input
          className="flex-1 border rounded-lg p-2"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button
          className="bg-[#B3E099] px-4 py-2 rounded-lg font-semibold"
          onClick={enviar}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
