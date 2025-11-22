import { useState } from "react";

interface ModalProps {
  colaborador: any;
  onClose: () => void;
  onSave: (dados: any) => void;
}

export default function EditarColaborador({ colaborador, onClose, onSave }: ModalProps) {

  const [form, setForm] = useState({ ...colaborador });

  function atualizarCampo(campo: string, valor: any) {
    setForm((prev: any) => ({ ...prev, [campo]: valor }));
  }

  function atualizarEndereco(campo: string, valor: any) {
    setForm((prev: any) => ({
      ...prev,
      endereco: { ...prev.endereco, [campo]: valor }
    }));
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg space-y-4">

        <h2 className="text-xl font-semibold">Editar Colaborador</h2>

        {/* NOME */}
        <input
          className="w-full p-2 border rounded"
          value={form.nome}
          onChange={(e) => atualizarCampo("nome", e.target.value)}
          placeholder="Nome"
        />

        {/* DATA */}
        <input
          className="w-full p-2 border rounded"
          type="date"
          value={form.dataNascimento}
          onChange={(e) => atualizarCampo("dataNascimento", e.target.value)}
        />

        {/* CPF */}
        <input
          className="w-full p-2 border rounded"
          value={form.cpf}
          onChange={(e) => atualizarCampo("cpf", e.target.value)}
          placeholder="CPF"
        />

        {/* EMAIL */}
        <input
          className="w-full p-2 border rounded"
          value={form.email}
          onChange={(e) => atualizarCampo("email", e.target.value)}
          placeholder="E-mail"
        />

        {/* NUMERO */}
        <input
          className="w-full p-2 border rounded"
          value={form.numero}
          onChange={(e) => atualizarCampo("numero", e.target.value)}
          placeholder="Número"
        />

        {/* TESTES */}
        <input
          className="w-full p-2 border rounded"
          value={form.testesAtrelados}
          onChange={(e) => atualizarCampo("testesAtrelados", e.target.value)}
          placeholder="Testes atrelados"
        />

        <h3 className="font-semibold mt-4">Endereço</h3>

        {/* ENDEREÇO */}
        <input className="w-full p-2 border rounded" value={form.endereco.cep} onChange={(e) => atualizarEndereco("cep", e.target.value)} placeholder="CEP" />
        <input className="w-full p-2 border rounded" value={form.endereco.logradouro} onChange={(e) => atualizarEndereco("logradouro", e.target.value)} placeholder="Logradouro" />
        <input className="w-full p-2 border rounded" value={form.endereco.complemento} onChange={(e) => atualizarEndereco("complemento", e.target.value)} placeholder="Complemento" />
        <input className="w-full p-2 border rounded" value={form.endereco.bairro} onChange={(e) => atualizarEndereco("bairro", e.target.value)} placeholder="Bairro" />
        <input className="w-full p-2 border rounded" value={form.endereco.localidade} onChange={(e) => atualizarEndereco("localidade", e.target.value)} placeholder="Localidade" />
        <input className="w-full p-2 border rounded" value={form.endereco.estado} onChange={(e) => atualizarEndereco("estado", e.target.value)} placeholder="Estado" />
        <input className="w-full p-2 border rounded" value={form.endereco.regiao} onChange={(e) => atualizarEndereco("regiao", e.target.value)} placeholder="Região" />

        <div className="flex justify-end gap-3 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancelar</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => onSave(form)}
          >Salvar</button>
        </div>

      </div>
    </div>
  );
}
