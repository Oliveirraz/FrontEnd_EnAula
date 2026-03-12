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

// professorService.js

// Login do professor (usa o endpoint centralizado de auth)
export const loginProfessor = async (email, senha) => {
  const response = await api.post("/auth/login", { email, senha });
  return response.data.token; // ← garante que retorna string
};

//  Atualizar professor (JSON)
export const atualizarProfessor = async (dadosProfessor, foto) => {
  const formData = new FormData();

  formData.append(
    "professor",
    new Blob([JSON.stringify(dadosProfessor)], { type: "application/json" })
  );

  if (foto) {
    formData.append("foto", foto);
  }

  const response = await api.put("/professores/me", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

// Deletar professor
export const deletarProfessor = async (id) => {
  const response = await api.delete(`/professores/${id}`);
  return response.data;
};


// 🔹 BUSCAR MATÉRIAS DO PROFESSOR
export async function listarMateriasDoProfessor(professorId) {
  const response = await api.get(`/professores/${professorId}/materias`);
  return response.data;
}
