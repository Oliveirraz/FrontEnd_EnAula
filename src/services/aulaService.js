// services/aulaService.js
import api from "./api";

// ================== CRIAR AULA ==================
export async function criarAula(dados) {
  const response = await api.post("/aulas", dados);
  return response.data;
}

// ================== LISTAR AULAS (PAGINADO + BUSCA) ==================
export async function listarAulas(page = 0, size = 12, termo = "") {
  const response = await api.get("/aulas", {
    params: {
      page,
      size,
      termo: termo || undefined,
    },
  });

  return response.data;
}

// ================== LISTAR AULAS POR PROFESSOR ==================
export async function listarAulasPorProfessor(
  professorId,
  page = 0,
  size = 12
) {
  const response = await api.get("/aulas", {
    params: {
      professorId,
      page,
      size,
    },
  });

  return response.data;
  /*
    Retorna Page:
    {
      content,
      totalPages,
      totalElements,
      number,
      size,
      first,
      last
    }
  */
}

// ================== BUSCAR AULA POR ID ==================
export async function buscarAulaPorId(id) {
  const response = await api.get(`/aulas/${id}`);
  return response.data;
}

// ================== ATUALIZAR AULA ==================
// services/aulaService.js
export async function atualizarAula(id, dados) {
  const response = await api.put(`/aulas/${id}`, {
    data: dados.data,
    horaInicio: dados.horaInicio,
    horaFim: dados.horaFim,
    local: dados.local,
    valorHora: dados.valorHora,
    capacidadeMaxima: dados.capacidadeMaxima,
    idMateria: dados.idMateria,
    idProfessor: dados.idProfessor,
    alunosIds: dados.alunosIds ?? []
  });

  return response.data;
}



// ================== DELETAR AULA ==================
export async function deletarAula(id) {
  await api.delete(`/aulas/${id}`);
}

// ================== MATRICULAR ALUNO ==================
export async function matricularAluno(aulaId, alunoId) {
  if (!alunoId) {
    throw new Error("ID do aluno não fornecido");
  }

  const response = await api.post(
    `/aulas/${aulaId}/matricular/${alunoId}`
  );

  return response.data;
}
