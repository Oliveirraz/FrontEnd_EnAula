import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../assets/css/CadastroMateriaStyle.css";

function Materia() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  const professorLogado = JSON.parse(
    localStorage.getItem("professorLogado")
  );

  useEffect(() => {
    if (!id) return;

    async function carregarMateria() {
      try {
        const response = await api.get(`/materias/${id}`);
        setNome(response.data.nome);
        setDescricao(response.data.descricao);
      } catch (error) {
        console.error(error);
      }
    }

    carregarMateria();
  }, [id]);

  async function handleCadastrar(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (!professorLogado) {
        alert("Professor não identificado.");
        return;
      }

      await api.post("/materias", {
        nome,
        descricao,
        professorId: professorLogado.id,
      });

      alert("Matéria cadastrada com sucesso!");
      navigate("/perfil-professor");
    } catch (error) {
      alert("Erro ao cadastrar matéria.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAtualizar(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/materias/${id}`, { nome, descricao });
      alert("Matéria atualizada com sucesso!");
      navigate("/perfil-professor");
    } catch (error) {
      alert("Erro ao atualizar matéria.");
    } finally {
      setLoading(false);
    }
  }

  async function handleExcluir() {
  const confirmacao = window.confirm(
    "Tem certeza que deseja excluir esta matéria?"
  );
  if (!confirmacao) return;

  try {
    if (!professorLogado) {
      alert("Professor não identificado.");
      return;
    }

    await api.delete(`/materias/${id}`, {
      data: {
        professorId: professorLogado.id,
      },
    });

    alert("Matéria excluída com sucesso!");
    navigate("/perfil-professor");
  } catch (error) {
    console.error(error);
    alert("Erro ao excluir matéria.");
  }
}


return (
  <div className="materia-containerperfil">
    <div className="materiaPerfil-card">

      {/* HEADER */}
      <div className="materia-header">
        <img
          src={
            professorLogado?.foto
              ? professorLogado.foto
              : "https://via.placeholder.com/150"
          }
          alt="Foto do professor"
          className="materia-avatar"
        />
      </div>

      {/* ===== CADASTRO ===== */}
      {!id && (
        <div className="materia-card-cadastro">
          <h3 className="materia-subtitulo">Cadastrar Matéria</h3>

          <form onSubmit={handleCadastrar}>
            <input
              className="materia-input"
              placeholder="Nome da matéria"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <textarea
              className="materia-textarea"
              placeholder="Descrição da matéria"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />

            <button
              className="materia-btn-salvar"
              type="submit"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Cadastrar"}
            </button>

            {/* 🔙 BOTÃO VOLTAR */}
            <button
              type="button"
              className="materia-btn-voltar"
              onClick={() => navigate("/perfil-professor")}
            >
              Voltar para o perfil
            </button>
          </form>
        </div>
      )}


      {/* ===== ATUALIZAÇÃO / EXCLUSÃO ===== */}
      {id && (
        <div className="materia-conteudo">

          {/* ESQUERDA */}
          <div className="materia-card-atualizar">
            <h3 className="materia-subtitulo">Atualizar Matéria</h3>

            <form onSubmit={handleAtualizar}>
              <input
                className="materia-input"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />

              <textarea
                className="materia-textarea"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />

              <button
                className="materia-btn-salvar"
                type="submit"
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar alterações"}
              </button>

              {/* 🔙 BOTÃO VOLTAR */}
              <button
                type="button"
                className="materia-btn-voltar"
                onClick={() => navigate("/perfil-professor")}
              >
                Voltar para o perfil
              </button>

            </form>
          </div>

          {/* DIREITA */}
          <div className="materia-direita">
            <div className="materia-card materia-card-danger">
              <h3 className="materia-subtitulo">Excluir Matéria</h3>
              <p>
                Esta ação <strong>não pode ser desfeita</strong>.
              </p>

              <button
                className="materia-btn-excluir"
                onClick={handleExcluir}
              >
                Excluir matéria
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  </div>
);

}

export default Materia;
