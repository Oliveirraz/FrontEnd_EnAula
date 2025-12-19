import api from "./api";

//  Adicionar aluno
export const adicionarAluno = async (dadosAluno) => {
  const response = await api.post("/alunos", dadosAluno);
  return response.data;
};

//  Atualizar aluno
export const atualizarAluno = async (id, dadosAluno) => {
  const response = await api.put(`/alunos/${id}`, dadosAluno);
  return response.data;
};

//  Login do aluno
export const loginAluno = async (email, senha) => {
  const response = await api.post("/alunos/login", {
    email,
    senha,
  });
  return response.data;
};

//  Deletar aluno
export const deletarAluno = async (id) => {
  await api.delete(`/alunos/${id}`);
};
