import api from "./api";

export async function criarAula(dados) {
  const response = await api.post("/aulas/professor/me", dados);
  return response.data;
}

export async function listarAulas(page = 0, size = 12, termo = "") {
  const response = await api.get("/aulas", {
    params: { page, size, termo: termo || undefined },
  });
  return response.data;
}

export async function listarAulasProfessorLogado(page = 0, size = 20) {
  const response = await api.get("/aulas/professor/me", { params: { page, size } });
  return response.data;
}

export async function buscarAulaPorId(id) {
  const response = await api.get(`/aulas/professor/me/${id}`);
  return response.data;
}

export async function atualizarAula(id, dados) {
  const response = await api.put(`/aulas/professor/me/${id}`, dados);
  return response.data;
}

export async function deletarAula(id) {
  await api.delete(`/aulas/professor/me/${id}`);
}

export async function matricularAluno(aulaId) {
  const response = await api.post(`/aulas/${aulaId}/matricular`);
  return response.data;
}