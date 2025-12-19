import api from "./api";

// Cadastrar professor 
export async function cadastrarProfessor(formData) {
  const response = await api.post("/professores", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

// Login do professor
export const loginProfessor = async (email, senha) => {
  const response = await api.post("/professores/login", {
    email,
    senha,
  });
  return response.data;
};

//  Atualizar professor (JSON)
export const atualizarProfessor = async (id, dadosProfessor) => {
  const response = await api.put(`/professores/${id}`, dadosProfessor);
  return response.data;
};

// Deletar professor
export const deletarProfessor = async (id) => {
  const response = await api.delete(`/professores/${id}`);
  return response.data;
};
