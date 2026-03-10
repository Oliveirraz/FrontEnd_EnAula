import api from "./api";

// CRIAR aula (professor logado)
export async function criarAula(dados) {
  const response = await api.post("/aulas/professor/me", dados);
  return response.data;
}

// LISTAR aulas para alunos (paginado + busca por matéria ou professor)
export async function listarAulas(page = 0, size = 12, termo = "") {
  const response = await api.get("/aulas", {
    params: { page, size, termo: termo || undefined },
  });
  return response.data;
}

// LISTAR aulas do professor logado (paginado)
export async function listarAulasProfessorLogado(page = 0, size = 12) {
  const response = await api.get("/aulas/professor/me", { params: { page, size } });
  return response.data;
}

// BUSCAR aula por ID (professor logado)
export async function buscarAulaPorId(id) {
  const response = await api.get(`/aulas/professor/me/${id}`);
  return response.data;
}

// ATUALIZAR aula (professor logado)
export async function atualizarAula(id, dados) {
  const response = await api.put(`/aulas/professor/me/${id}`, dados);
  return response.data;
}

// DELETAR aula (professor logado)
export async function deletarAula(id) {
  await api.delete(`/aulas/professor/me/${id}`);
}

// MATRICULAR aluno em uma aula
export async function matricularAluno(aulaId, alunoId) {
  if (!alunoId) throw new Error("ID do aluno não fornecido");
  const response = await api.post(`/aulas/${aulaId}/matricular/${alunoId}`);
  return response.data;
}