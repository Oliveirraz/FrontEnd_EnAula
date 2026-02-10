import api from "./api";

// 🔹 Cadastrar uma nova disponibilidade
export const cadastrarDisponibilidade = async (disponibilidade) => {
  const response = await api.post("/api/disponibilidades", disponibilidade);
  return response.data;
};

// 🔹 Listar disponibilidades do professor (filtrando corretamente)
export const listarDisponibilidadesDoProfessor = async (professorId) => {
  const response = await api.get("/api/disponibilidades");

  // ✅ Correção principal aqui
  return response.data.filter(
    d => d.idProfessor === professorId
  );
};

// 🔹 Atualizar uma disponibilidade
export const atualizarDisponibilidade = async (id, disponibilidade) => {
  const response = await api.put(`/api/disponibilidades/${id}`, disponibilidade);
  return response.data;
};

// 🔹 Deletar uma disponibilidade
export const deletarDisponibilidade = async (id) => {
  await api.delete(`/api/disponibilidades/${id}`);
};
