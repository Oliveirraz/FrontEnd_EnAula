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

// SUBSTITUI o antigo matricularAluno (matrícula imediata)
// Agora apenas SOLICITA a matrícula — o professor precisa aceitar por e-mail
export async function solicitarMatricula(aulaId) {
  const response = await api.post(`/matriculas/aulas/${aulaId}/solicitar`);
  return response.data;
}

export async function cancelarMatricula(aulaId) {
  const response = await api.delete(`/matriculas/aulas/${aulaId}/cancelar`);
  return response.data;
}

export async function cancelarAula(id) {
  await api.delete(`/aulas/professor/me/${id}/cancelar`);
}

export async function listarAlunosDaAula(aulaId) {
  const response = await api.get(`/aulas/professor/me/${aulaId}/alunos`);
  return response.data;
}

export async function removerAlunoDaAula(aulaId, alunoId) {
  await api.delete(`/aulas/professor/me/${aulaId}/alunos/${alunoId}`);
}