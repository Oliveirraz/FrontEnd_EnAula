import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../assets/css/CadastroMateriaStyle.css";

function CadastroMateria() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCadastrar(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/materias", {
        nome,
        descricao,
      });

      alert("Matéria cadastrada com sucesso!");
      navigate("/perfil-professor"); // volta para o perfil
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar matéria.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="materiaCadastro-container">
      <div className="materiaCadastro-card">
        <h2>Cadastrar nova matéria</h2>

        <form onSubmit={handleCadastrar}>
          <input
            type="text"
            placeholder="Nome da matéria"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <textarea
            placeholder="Descrição da matéria"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />

          <div className="cadastro-materia-botoes">
            <button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Cadastrar"}
            </button>

            <button
              type="button"
              className="btn-voltar"
              onClick={() => navigate(-1)}
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastroMateria;
