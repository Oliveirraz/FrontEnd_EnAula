import api from "./api";

/* =========================
   👤 ALUNO
========================= */

// ➕ Cadastro de aluno (público)
export const adicionarAluno = async (dadosAluno) => {
  const response = await api.post("/alunos", dadosAluno);
  return response.data;
};

// 🔐 Login do aluno (JWT centralizado)
export const loginAluno = async (email, senha) => {
  const response = await api.post("/auth/login", {
    email,
    senha,
  });

  // 🔴 RETORNA SOMENTE O TOKEN (string)
  return response.data.token;
};

// ✏️ Atualizar aluno LOGADO (rota /me)
export const atualizarAluno = async (alunoAtualizado, fotoFile) => {
  const formData = new FormData();

  // parte JSON
  formData.append(
    "aluno",
    new Blob([JSON.stringify(alunoAtualizado)], {
      type: "application/json",
    })
  );

  // parte FILE
  if (fotoFile) {
    formData.append("foto", fotoFile);
  }

  const response = await api.put("/alunos/me", formData);

  return response.data;
};

export const deletarAluno = async () => {
  await api.delete("/alunos/me");
};
