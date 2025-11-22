import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getColaboradores,
  getTestesPorColaborador,
  getFeedbacks,
  updateColaborador,
  deleteColaborador,
  gerarTesteIA, // ⭐ NOVO – usado no fluxo automático
} from "../services/adm";

import ChatLumIA from "../components/ChatLumIA";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function PerfilAdm() {

  const navigate = useNavigate();

  const [colaboradores, setColaboradores] = useState([]);
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState<any>(null);
  const [testes, setTestes] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  // MODAL DE GERAR TESTE IA
  const [modalGerarIA, setModalGerarIA] = useState(false);
  const [temaTeste, setTemaTeste] = useState("");
  const [quantidadeQuestoes, setQuantidadeQuestoes] = useState(5);
  const [carregandoIA, setCarregandoIA] = useState(false);

  // MODAL DE ATRELAR TESTE
const [modalAtrelar, setModalAtrelar] = useState(false);
const [listaTestes, setListaTestes] = useState([]);

// MODAL DE CRIAR COLABORADOR
const [modalCriar, setModalCriar] = useState(false);

const [novoColaborador, setNovoColaborador] = useState({
  nome: "",
  dataNascimento: "",
  cpf: "",
  email: "",
  numero: "",
  endereco: {
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    estado: "",
    regiao: "",
  }
});


  // Modal de edição do colaborador
  const [editando, setEditando] = useState(false);

  const [editNome, setEditNome] = useState("");
  const [editDataNasc, setEditDataNasc] = useState("");
  const [editCpf, setEditCpf] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editNumero, setEditNumero] = useState("");

  const [editEndereco, setEditEndereco] = useState({
    id: null,
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    estado: "",
    regiao: "",
  });

  // ================================
  // Carregar colaboradores
  // ================================
  useEffect(() => {
    carregarColaboradores();
  }, []);

  async function carregarColaboradores() {
    const lista = await getColaboradores();
    setColaboradores(lista);
  }

  // ================================
  // Selecionar colaborador
  // ================================
  useEffect(() => {
    if (!colaboradorSelecionado) return;

    setEditNome(colaboradorSelecionado.nome);
    setEditDataNasc(colaboradorSelecionado.dataNascimento);
    setEditCpf(colaboradorSelecionado.cpf);
    setEditEmail(colaboradorSelecionado.email);
    setEditNumero(colaboradorSelecionado.numero);

    setEditEndereco({
      id: colaboradorSelecionado.endereco.id,
      cep: colaboradorSelecionado.endereco.cep,
      logradouro: colaboradorSelecionado.endereco.logradouro,
      complemento: colaboradorSelecionado.endereco.complemento,
      bairro: colaboradorSelecionado.endereco.bairro,
      localidade: colaboradorSelecionado.endereco.localidade,
      estado: colaboradorSelecionado.endereco.estado,
      regiao: colaboradorSelecionado.endereco.regiao,
    });

    async function carregar() {
      const t = await getTestesPorColaborador(colaboradorSelecionado.id);
      const f = await getFeedbacks(colaboradorSelecionado.id);
      setTestes(t);
      setFeedbacks(f);
    }

    carregar();
  }, [colaboradorSelecionado]);

  // ================================
  // Gerar Teste pela IA
  // ================================
  async function gerarTesteautomatico() {
    if (!temaTeste.trim() || !quantidadeQuestoes) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      setCarregandoIA(true);

      await gerarTesteIA(temaTeste, quantidadeQuestoes);

      setTemaTeste("");
      setQuantidadeQuestoes(5);
      setModalGerarIA(false);

      const novos = await getTestesPorColaborador(colaboradorSelecionado.id);
      setTestes(novos);

    } catch (err) {
      console.error("Erro IA:", err);
      alert("Erro ao gerar teste pela IA");
    } finally {
      setCarregandoIA(false);
    }
  }

  // ================================
  // ViaCEP
  // ================================
  async function buscarCEP(cep: string) {
    if (cep.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setEditEndereco((prev) => ({
          ...prev,
          logradouro: data.logradouro || "",
          bairro: data.bairro || "",
          localidade: data.localidade || "",
          estado: data.uf || "",
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP", error);
    }
  }

  // ================================
  // Salvar edição
  // ================================
  async function salvarEdicao() {
    const atualizado = {
      id: colaboradorSelecionado.id,
      nome: editNome,
      dataNascimento: editDataNasc,
      cpf: editCpf,
      email: editEmail,
      numero: Number(editNumero),
      testesAtrelados: colaboradorSelecionado.testesAtrelados ?? "",
      endereco: { ...editEndereco },
    };

    try {
      await updateColaborador(atualizado.id, atualizado);
      setEditando(false);
      await carregarColaboradores();
    } catch (error) {
      console.error("Erro ao atualizar", error);
      alert("Erro ao salvar alterações");
    }
  }

  // ================================
  // Excluir colaborador
  // ================================
  async function excluir(c: any) {
    if (!confirm(`Tem certeza que deseja excluir ${c.nome}?`)) return;

    await deleteColaborador(c.id);
    carregarColaboradores();

    if (colaboradorSelecionado?.id === c.id) {
      setColaboradorSelecionado(null);
      setTestes([]);
      setFeedbacks([]);
    }
  }

  async function abrirModalAtrelar() {
  try {
    const r = await fetch("http://localhost:8080/testes"); // ou use getTodosTestes()
    const lista = await r.json();
    setListaTestes(lista);
    setModalAtrelar(true);
  } catch (err) {
    console.error("Erro ao carregar testes", err);
    alert("Erro ao carregar testes");
  }
}

async function atribuirTeste(idTeste: number) {
  if (!colaboradorSelecionado) return;

  try {
    const url = `http://localhost:8080/colaboradores/${colaboradorSelecionado.id}/teste/${idTeste}`;

    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    if (!resp.ok) {
      throw new Error("Erro ao atrelar teste");
    }

    alert("Teste atribuído com sucesso!");
    setModalAtrelar(false);

    // recarrega testes REAIS do BD
    const novos = await getTestesPorColaborador(colaboradorSelecionado.id);
    setTestes(novos);

  } catch (err) {
    console.error(err);
    alert("Erro ao atrelar teste");
  }
}


  // ================================
  // JSX
  // ================================

  return (
    <div className="min-h-screen bg-[#FFFDD0] flex flex-col">
      <Navbar />

      {/* ================ MODAL DE EDITAR COLABORADOR ================ */}
{editando && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
    <div className="bg-white p-6 rounded-xl shadow-xl w-[450px] max-h-[90vh] overflow-y-auto">

      <h2 className="text-xl font-semibold mb-4 text-center text-[#5a6e4f]">
        Editar Colaborador
      </h2>

      {/* Nome */}
      <label className="font-medium">Nome</label>
      <input
        className="border p-2 rounded w-full mb-3"
        value={editNome}
        onChange={(e) => setEditNome(e.target.value)}
      />

      {/* Data nascimento */}
      <label className="font-medium">Data de Nascimento</label>
      <input
        className="border p-2 rounded w-full mb-3"
        value={editDataNasc}
        onChange={(e) => setEditDataNasc(e.target.value)}
      />

      {/* Email */}
      <label className="font-medium">Email</label>
      <input
        className="border p-2 rounded w-full mb-3"
        value={editEmail}
        onChange={(e) => setEditEmail(e.target.value)}
      />

      {/* Número */}
      <label className="font-medium">Número residencial</label>
      <input
        className="border p-2 rounded w-full mb-3"
        value={editNumero}
        onChange={(e) => setEditNumero(e.target.value)}
      />

      {/* Endereço */}
      <h3 className="font-semibold mt-4 mb-2 text-[#5a6e4f]">Endereço</h3>

      <input
      className="border p-2 rounded w-full mb-3"
      value={editEndereco.cep}
      onChange={(e) => {
         const v = e.target.value.replace(/\D/g, "");
         setEditEndereco({ ...editEndereco, cep: v });
         if (v.length === 8) {
          buscarCEP(v);
         }
      }}
      />

      {["logradouro", "complemento", "bairro", "localidade", "estado", "regiao"].map((campo) => (
        <div key={campo} className="mb-3">
          <label className="font-medium capitalize">{campo}</label>
          <input
            className="border p-2 rounded w-full"
            value={(editEndereco as any)[campo]}
            onChange={(e) =>
              setEditEndereco({ ...editEndereco, [campo]: e.target.value })
            }
          />
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-[#c9c9c9] rounded text-black hover:bg-[#b6b6b6]"
          onClick={() => setEditando(false)}
        >
          Cancelar
        </button>

        <button
          className="px-4 py-2 bg-[#789c63] text-white rounded hover:bg-[#6c8a58]"
          onClick={salvarEdicao}
        >
          Salvar
        </button>
      </div>

    </div>
  </div>
)}

  {modalAtrelar && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
    <div className="bg-white p-6 rounded-xl shadow-xl w-[500px] max-h-[80vh] overflow-y-auto">

      <h2 className="text-xl font-semibold text-[#5a6e4f] mb-4 text-center">
        Selecionar Teste para Atrelar
      </h2>

      {listaTestes.length === 0 ? (
        <p className="text-gray-600">Nenhum teste disponível.</p>
      ) : (
        <ul className="space-y-3">
          {listaTestes.map((t: any) => (
            <li
              key={t.id}
              className="p-3 border rounded-xl bg-[#f0f5e9] shadow flex justify-between items-center"
            >
              <span className="font-medium">{t.titulo}</span>

              <button
                className="px-3 py-1 bg-[#789c63] text-white rounded hover:bg-[#6c8a58]"
                onClick={() => atribuirTeste(t.id)}

              >
                Atrelar
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 w-full"
        onClick={() => setModalAtrelar(false)}
      >
        Cancelar
      </button>

    </div>
  </div>
)}
      {/* ================= MODAL IA ================= */}
      {modalGerarIA && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[500px]">
            <h2 className="text-xl font-semibold text-[#5a6e4f] mb-4 text-center">
              Gerar Teste pela IA
            </h2>

            <label className="font-medium">Tema do teste</label>
            <input
              className="border p-2 rounded w-full mb-3"
              value={temaTeste}
              onChange={(e) => setTemaTeste(e.target.value)}
            />

            <label className="font-medium">Quantidade de questões</label>
            <input
              type="number"
              min="1"
              max="20"
              className="border p-2 rounded w-full mb-3"
              value={quantidadeQuestoes}
              onChange={(e) => setQuantidadeQuestoes(Number(e.target.value))}
            />

            <div className="flex justify-between mt-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setModalGerarIA(false)}
              >
                Cancelar
              </button>

              <button
                disabled={carregandoIA}
                className="px-4 py-2 bg-[#789c63] text-white rounded hover:bg-[#6c8a58]"
                onClick={gerarTesteautomatico}
              >
                {carregandoIA ? "Gerando..." : "Gerar Teste IA"}
              </button>

              <button 
              onClick={() => navigate("/listaTestes")}
              className="px-4 py-2 bg-[#789c63] text-white rounded-lg hover:bg-[#6c8a58]">
                Ver todos os testes
                </button>

            </div>
          </div>
        </div>
      )}

{/* =============== MODAL CRIAR COLABORADOR =============== */}
{modalCriar && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
    <div className="bg-white p-6 rounded-xl shadow-xl w-[450px] max-h-[90vh] overflow-y-auto">

      <h2 className="text-xl font-semibold mb-4 text-center text-[#5a6e4f]">
        Novo Colaborador
      </h2>

      {/* Nome */}
      <label className="font-medium">Nome</label>
      <input
        className="border p-2 rounded w-full mb-3"
        value={novoColaborador.nome}
        onChange={(e) =>
          setNovoColaborador({ ...novoColaborador, nome: e.target.value })
        }
      />

      {/* Data */}
      <label className="font-medium">Data de Nascimento</label>
      <input
        className="border p-2 rounded w-full mb-3"
        value={novoColaborador.dataNascimento}
        onChange={(e) =>
          setNovoColaborador({
            ...novoColaborador,
            dataNascimento: e.target.value,
          })
        }
      />

      {/* CPF */}
      <label className="font-medium">CPF</label>
      <input
        className="border p-2 rounded w-full mb-3"
        value={novoColaborador.cpf}
        onChange={(e) =>
          setNovoColaborador({ ...novoColaborador, cpf: e.target.value })
        }
      />

      {/* Email */}
      <label className="font-medium">Email</label>
      <input
        className="border p-2 rounded w-full mb-3"
        value={novoColaborador.email}
        onChange={(e) =>
          setNovoColaborador({ ...novoColaborador, email: e.target.value })
        }
      />

      {/* Número */}
      <label className="font-medium">Telefone</label>
      <input
        className="border p-2 rounded w-full mb-3"
        value={novoColaborador.numero}
        onChange={(e) =>
          setNovoColaborador({ ...novoColaborador, numero: e.target.value })
        }
      />

      {/* ENDEREÇO */}
      <h3 className="font-semibold text-[#5a6e4f] mt-4 mb-2">Endereço</h3>

      {/* CEP COM BUSCA AUTOMÁTICA */}
      <label className="font-medium">CEP</label>
      <input
        className="border p-2 rounded w-full mb-3"
        value={novoColaborador.endereco.cep}
        onChange={async (e) => {
          const v = e.target.value.replace(/\D/g, "");
          const novo = { ...novoColaborador };
          novo.endereco.cep = v;
          setNovoColaborador(novo);

          // 🔥 QUANDO O CEP FICAR COMPLETO (8 dígitos)
          if (v.length === 8) {
            try {
              const res = await fetch(`https://viacep.com.br/ws/${v}/json/`);
              const data = await res.json();

              if (!data.erro) {
                setNovoColaborador((prev) => ({
                  ...prev,
                  endereco: {
                    ...prev.endereco,
                    logradouro: data.logradouro || "",
                    bairro: data.bairro || "",
                    localidade: data.localidade || "",
                    estado: data.uf || "",
                  },
                }));
              }
            } catch (error) {
              console.error("Erro ao buscar CEP", error);
            }
          }
        }}
      />

      {/* Campos preenchidos automaticamente */}
      <label className="font-medium">Logradouro</label>
      <input
        className="border p-2 rounded w-full mb-3"
        value={novoColaborador.endereco.logradouro}
        onChange={(e) => {
          const novo = { ...novoColaborador };
          novo.endereco.logradouro = e.target.value;
          setNovoColaborador(novo);
        }}
      />

      <label className="font-medium">Complemento</label>
      <input
        className="border p-2 rounded w-full mb-3"
        value={novoColaborador.endereco.complemento}
        onChange={(e) => {
          const novo = { ...novoColaborador };
          novo.endereco.complemento = e.target.value;
          setNovoColaborador(novo);
        }}
      />

      <label className="font-medium">Bairro</label>
      <input
        className="border p-2 rounded w-full mb-3"
        value={novoColaborador.endereco.bairro}
        onChange={(e) => {
          const novo = { ...novoColaborador };
          novo.endereco.bairro = e.target.value;
          setNovoColaborador(novo);
        }}
      />

      <label className="font-medium">Cidade</label>
      <input
        className="border p-2 rounded w-full mb-3"
        value={novoColaborador.endereco.localidade}
        onChange={(e) => {
          const novo = { ...novoColaborador };
          novo.endereco.localidade = e.target.value;
          setNovoColaborador(novo);
        }}
      />

      <label className="font-medium">Estado</label>
      <input
        className="border p-2 rounded w-full mb-3"
        value={novoColaborador.endereco.estado}
        onChange={(e) => {
          const novo = { ...novoColaborador };
          novo.endereco.estado = e.target.value;
          setNovoColaborador(novo);
        }}
      />

      <label className="font-medium">Região</label>
      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="(opcional)"
        value={novoColaborador.endereco.regiao}
        onChange={(e) => {
          const novo = { ...novoColaborador };
          novo.endereco.regiao = e.target.value;
          setNovoColaborador(novo);
        }}
      />

      {/* BOTÕES */}
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-[#c9c9c9] rounded hover:bg-[#b6b6b6]"
          onClick={() => setModalCriar(false)}
        >
          Cancelar
        </button>

        <button
          className="px-4 py-2 bg-[#789c63] text-white rounded hover:bg-[#6c8a58]"
          onClick={async () => {
            try {
              const res = await fetch("http://localhost:8080/colaboradores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...novoColaborador,
                  numero: Number(novoColaborador.numero), 
                }),

              });

              if (!res.ok) {
                alert("Erro ao criar colaborador");
                return;
              }

              await carregarColaboradores();
              setModalCriar(false);

              setNovoColaborador({
                nome: "",
                dataNascimento: "",
                cpf: "",
                email: "",
                numero: "",
                endereco: {
                  cep: "",
                  logradouro: "",
                  complemento: "",
                  bairro: "",
                  localidade: "",
                  estado: "",
                  regiao: "",
                },
              });

              alert("Colaborador criado com sucesso!");
            } catch (e) {
              console.error(e);
              alert("Erro inesperado.");
            }
          }}
        >
          Salvar
        </button>
      </div>
    </div>
  </div>
)}

      {/* ================= LISTA / TESTES / FEEDBACKS ================= */}
      <main className="flex flex-col lg:flex-row gap-8 p-8 max-w-7xl mx-auto w-full">

        {/* Coluna 1 — Colaboradores */}
        <div className="w-full lg:w-1/3 bg-white shadow rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
  <h2 className="text-lg font-semibold text-[#5a6e4f]">Colaboradores</h2>

  <button
    onClick={() => setModalCriar(true)}
    className="px-3 py-1 bg-[#789c63] text-white rounded-lg text-sm hover:bg-[#6c8a58]"
  >
    + Adicionar
  </button>
</div>


          <ul className="space-y-3">
            {colaboradores.map((c: any) => (
              <li key={c.id}
                className={`p-3 rounded-xl flex items-center justify-between border shadow-sm cursor-pointer
                ${colaboradorSelecionado?.id === c.id ? "bg-[#B3E099]" : "bg-[#f0f5e9]"}`}
              >
                <span onClick={() => setColaboradorSelecionado(c)}
                  className="font-medium">
                  {c.nome}
                </span>

                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 text-sm rounded-md bg-[#789c63] text-white hover:bg-[#6c8a58]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setColaboradorSelecionado(c);
                      setEditando(true);
                    }}
                  >
                    Editar
                  </button>

                  <button
                    className="px-3 py-1 text-sm rounded-md bg-[#b65c5c] text-white hover:bg-[#9e4f4f]"
                    onClick={(e) => {
                      e.stopPropagation();
                      excluir(c);
                    }}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna 2 — Testes + Feedbacks */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">

{/* Testes */}
<div className="bg-white shadow rounded-xl p-4">
  <div className="flex gap-3 mb-10">
    <button
      className="px-4 py-2 bg-[#789c63] text-white rounded-lg hover:bg-[#6c8a58]"
      onClick={() => setModalGerarIA(true)}
    >
      + Gerar Teste IA
    </button>

    {colaboradorSelecionado && (
      <button
        className="px-4 py-2 bg-[#4d6a3c] text-white rounded-lg hover:bg-[#3d572d]"
        onClick={abrirModalAtrelar}
      >
        + Atrelar Teste
      </button>
    )}
  </div>

  {!colaboradorSelecionado ? (
    <p className="text-gray-500">Selecione um colaborador...</p>
  ) : testes.length === 0 ? (
    <p className="text-gray-500">Nenhum teste atribuído</p>
  ) : (
    <ul className="space-y-3">

      {/* ⭐ REMOVE DUPLICADOS AQUI ⭐ */}
      {testes
        .filter(
          (t: any, index: number, self: any[]) =>
            index === self.findIndex((x) => x.id === t.id)
        )
        .map((t: any) => (
          <li
            key={t.id}
            className="p-3 rounded-xl bg-[#B3E099] shadow"
          >
            <p className="font-semibold">{t.titulo}</p>
          </li>
        ))}

    </ul>
  )}
</div>


          {/* Feedbacks */}
          <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4 text-[#5a6e4f]">Feedbacks</h2>

            {!colaboradorSelecionado ? (
              <p className="text-gray-500">Selecione um colaborador...</p>
            ) : feedbacks.length === 0 ? (
              <p className="text-gray-500">Nenhum feedback disponível</p>
            ) : (
              <ul className="space-y-3">
                {feedbacks.map((f: any) => (
                  <li key={f.id} className="p-3 rounded-xl bg-[#f0f5e9] shadow">
                    <p className="font-semibold">Teste #{f.idTeste}</p>
                    <p>{f.feedback}</p>
                    <p className="text-xs text-gray-500 mt-1">{f.data}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* CHAT – abaixo de tudo */}
          <div className="bg-white shadow rounded-xl p-4">
            <ChatLumIA />
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
