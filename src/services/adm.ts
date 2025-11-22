const API = "https://lume-backend-34oq.onrender.com";

// =============================================
// 📌 LISTAR COLABORADORES
// =============================================
export async function getColaboradores() {
  const res = await fetch(`${API}/colaboradores`);
  if (!res.ok) throw new Error("Erro ao buscar colaboradores");
  return res.json();
}

// =============================================
// 📌 LISTAR TESTES ATRIBUÍDOS AO COLABORADOR
// (endpoint correto do backend)
// =============================================
export async function getTestesPorColaborador(id: number) {
  const res = await fetch(`${API}/colaboradores/testes/${id}`);

  if (!res.ok) throw new Error("Erro ao buscar testes atribuídos");
  
  return res.json();
}


// =============================================
// 📌 LISTAR FEEDBACKS DO COLABORADOR
// =============================================
export async function getFeedbacks(idColaborador: number) {
  const res = await fetch(`${API}/feedbacks/colaborador/${idColaborador}`);
  if (!res.ok) throw new Error("Erro ao buscar feedbacks");
  return res.json();
}

// =============================================
// 📌 ATUALIZAR COLABORADOR
// =============================================
export async function updateColaborador(id: number, dados: any) {
  const res = await fetch(`${API}/colaboradores/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!res.ok) throw new Error("Erro ao atualizar colaborador");

  try {
    return await res.json(); 
  } catch {
    return await res.text();
  }
}

// =============================================
// 📌 DELETAR COLABORADOR
// =============================================
export async function deleteColaborador(id: number) {
  const res = await fetch(`${API}/colaboradores/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao deletar colaborador");

  try {
    return await res.json();
  } catch {
    return await res.text();
  }
}

// =============================================
// 📌 CRIAR COLABORADOR
// =============================================
export async function createColaborador(dados: any) {
  const res = await fetch(`${API}/colaboradores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!res.ok) throw new Error("Erro ao criar colaborador");
  return res.json();
}

// =============================================
// 📌 CRIAR TESTE MANUAL
// =============================================
export async function createTeste(dados: {
  idColaborador: number;
  titulo: string;
  conteudo: string;
}) {
  const res = await fetch(`${API}/testes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!res.ok) throw new Error("Erro ao criar teste");
  return res.json();
}

// =============================================
// 📌 GERAR TESTE USANDO IA
// =============================================
export async function gerarTesteIA(tema: string, quantidade: number) {
  const res = await fetch(`${API}/testes/gerar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tema, quantidade }),
  });

  if (!res.ok) throw new Error("Erro ao gerar teste pela IA");
  return res.json();
}

// =============================================
// 📌 LISTAR TODOS OS TESTES
// =============================================
export async function getTodosTestes() {
  const res = await fetch(`${API}/testes`);
  if (!res.ok) throw new Error("Erro ao buscar testes");
  return res.json();
}

// =============================================
// 📌 GET TESTE POR ID
// (corrigido: backend usa /testes/{id})
// =============================================
export async function getTestePorId(id: number) {
  const res = await fetch(`${API}/testes/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar teste");
  return res.json();
}

// =============================================
// 📌 ATRIBUIR TESTE AO COLABORADOR (ENDPOINT CORRETO!)
// =============================================
export async function atribuirTeste(colaboradorId: number, testeId: number) {
  const res = await fetch(`${API}/admin/testes/atribuir`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idColaborador: colaboradorId,
      idTeste: testeId
    })
  });

  if (!res.ok) throw new Error("Erro ao atribuir teste");

  try {
    return await res.json();
  } catch {
    return await res.text();
  }
}
