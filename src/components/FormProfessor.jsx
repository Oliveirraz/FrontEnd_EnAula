// src/components/FormProfessor.jsx
import { useState } from "react";
import api from "../services/api";

function FormProfessor() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [foto, setFoto] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // PARTE "professor" (JSON compatível com ProfessorRequestDTO)
    formData.append(
      "professor",
      new Blob([JSON.stringify(form)], {
        type: "application/json",
      })
    );

    // PARTE "foto"
    if (foto) {
      formData.append("foto", foto);
    }

    try {
      await api.post("/professores", formData);
      alert("Professor cadastrado com sucesso!");

      // Resetar formulário
      setForm({
        nome: "",
        email: "",
        senha: "",
      });
      setFoto(null);
    } catch (error) {
      console.error("Erro ao cadastrar professor:", error);
      alert("Erro ao cadastrar professor");
    }
  };

  return (
    <form onSubmit={submit}>
      <label className="text-light">Nome</label>
      <input
        className="form-control mb-2"
        name="nome"
        value={form.nome}
        onChange={handleChange}
        required
      />

      <label className="text-light">E-mail</label>
      <input
        type="email"
        className="form-control mb-2"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <label className="text-light">Senha</label>
      <input
        type="password"
        className="form-control mb-3"
        name="senha"
        value={form.senha}
        onChange={handleChange}
        required
      />

      <label className="text-light">Foto</label>
      <input
        type="file"
        className="form-control mb-3"
        accept="image/*"
        onChange={(e) => setFoto(e.target.files[0])}
      />

      {/* Botão de salvar */}
      <button type="submit" className="btn btn-success w-100">
        Salvar
      </button>
    </form>
  );
}

export default FormProfessor;
