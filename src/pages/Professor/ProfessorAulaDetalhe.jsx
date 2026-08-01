import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "../../assets/css/ProfessorAulaDetalheStyle.css";
import {
  atualizarAula,
  deletarAula,
  cancelarAula,
  listarAlunosDaAula,
  removerAlunoDaAula,
} from "../../services/aulaService";
import { buscarAlunoPorId } from "../../services/alunoservice";

export default function ProfessorAulaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [aula, setAula] = useState(null);
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🆕 ALUNOS MATRICULADOS
  const [alunos, setAlunos] = useState([]);
  const [loadingAlunos, setLoadingAlunos] = useState(true);

  // 🆕 PERFIL DO ALUNO (modal)
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [loadingPerfil, setLoadingPerfil] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        //  rota correta
        const aulaResp = await api.get(`/aulas/professor/me/${id}`);
        const data = aulaResp.data;

        setAula({
          id: data.id,
          data: data.data,
          horaInicio: data.horaInicio,
          horaFim: data.horaFim,
          local: data.local,
          valorHora: data.valorHora,
          capacidadeMaxima: data.capacidadeMaxima,
          totalAlunos: data.totalAlunos,
          vagasDisponiveis: data.vagasDisponiveis,
          idMateria: data.idMateria,
          nomeMateria: data.nomeMateria,
          descricaoMateria: data.descricaoMateria,
        });

        // carrega matérias para o select
        const matResp = await api.get("/materias/professor/me");
        setMaterias(matResp.data);
      } catch (error) {
        console.error("Erro ao carregar aula:", error);
        alert("Erro ao carregar a aula.");
        navigate("/perfil-professor");
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, [id, navigate]);

  // 🆕 CARREGAR ALUNOS MATRICULADOS
  useEffect(() => {
    async function carregarAlunos() {
      try {
        const data = await listarAlunosDaAula(id);
        setAlunos(data);
      } catch (error) {
        console.error("Erro ao carregar alunos da aula:", error);
      } finally {
        setLoadingAlunos(false);
      }
    }
    carregarAlunos();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    let val = value;
    if (["valorHora", "capacidadeMaxima"].includes(name)) val = Number(value);
    setAula((prev) => ({ ...prev, [name]: val }));
  }

  async function handleSalvar() {
  try {
    await atualizarAula(aula.id, {
      data: aula.data,
      horaInicio: aula.horaInicio,
      horaFim: aula.horaFim,
      local: aula.local || "Não informado",
      valorHora: aula.valorHora,
      capacidadeMaxima: aula.capacidadeMaxima,
      idMateria: aula.idMateria,
    });
    alert("Aula atualizada com sucesso!");
    navigate("/perfil-professor");
  } catch (error) {
    console.error("Erro ao atualizar:", error.response?.data || error.message);
    alert("Erro ao atualizar aula.");
  }
}

  async function handleExcluir() {
    if (!window.confirm("Deseja realmente excluir esta aula?")) return;
    try {
      await deletarAula(aula.id);
      alert("Aula excluída com sucesso!");
      navigate("/perfil-professor");
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Erro ao excluir aula.");
    }
  }

  async function handleCancelarAula() {
  const confirmacao = window.confirm(
    "Deseja cancelar esta aula? Os alunos matriculados serão notificados por e-mail."
  );
  if (!confirmacao) return;

  try {
    await cancelarAula(aula.id);
    alert("Aula cancelada com sucesso! Os alunos foram notificados por e-mail.");
    navigate("/perfil-professor");
  } catch (error) {
    console.error("Erro ao cancelar aula:", error);
    alert(error.response?.data?.message || "Erro ao cancelar aula.");
  }
}

  // 🆕 VER PERFIL DO ALUNO
  async function handleVerPerfil(alunoId) {
    setLoadingPerfil(true);
    try {
      const perfil = await buscarAlunoPorId(alunoId);
      setAlunoSelecionado(perfil);
    } catch (error) {
      console.error("Erro ao buscar perfil do aluno:", error);
      alert("Erro ao carregar perfil do aluno.");
    } finally {
      setLoadingPerfil(false);
    }
  }

  function handleFecharPerfil() {
    setAlunoSelecionado(null);
  }

  // 🆕 REMOVER ALUNO DA AULA
  async function handleRemoverAluno(alunoId, alunoNome) {
    const confirmacao = window.confirm(
      `Deseja remover ${alunoNome} desta aula? O aluno será notificado por e-mail.`
    );
    if (!confirmacao) return;

    try {
      await removerAlunoDaAula(aula.id, alunoId);
      alert("Aluno removido com sucesso!");

      // atualiza a lista local sem precisar recarregar tudo
      setAlunos((prev) => prev.filter((a) => a.id !== alunoId));

      // se o perfil removido estava aberto no modal, fecha
      if (alunoSelecionado?.id === alunoId) {
        setAlunoSelecionado(null);
      }
    } catch (error) {
      console.error("Erro ao remover aluno:", error);
      alert(error.response?.data?.message || "Erro ao remover aluno.");
    }
  }

  if (loading) return <p style={{ textAlign: "center" }}>Carregando...</p>;
  if (!aula) return null;

  return (
    <div className="professor-containerPerfil">
      <div className="professorPerfil-card professor-aula-detalhe">
        <h2>Detalhes da Aula</h2>

        <div className="professor-aula-info">
          <p><strong>Matéria:</strong> {aula.nomeMateria}</p>
          <p><strong>Descrição:</strong> {aula.descricaoMateria}</p>
          <p><strong>Alunos matriculados:</strong> {aula.totalAlunos} | <strong>Vagas disponíveis:</strong> {aula.vagasDisponiveis}</p>
        </div>

        <div className="professor-aula-form">

          {/* SELECT de matéria */}
          <div className="full">
            <label>Matéria</label>
            <select name="idMateria" value={aula.idMateria || ""} onChange={handleChange}>
              {materias.map((m) => (
                <option key={m.id} value={m.id}>{m.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Data da aula</label>
            <input type="date" name="data" value={aula.data || ""} onChange={handleChange} />
          </div>

          <div>
            <label>Horário de início</label>
            <input type="time" name="horaInicio" value={aula.horaInicio || ""} onChange={handleChange} />
          </div>

          <div>
            <label>Horário de fim</label>
            <input type="time" name="horaFim" value={aula.horaFim || ""} onChange={handleChange} />
          </div>

          <div>
            <label>Local</label>
            <input type="text" name="local" value={aula.local || ""} onChange={handleChange} placeholder="Ex: Google Meet, Sala 12" />
          </div>

          <div>
            <label>Valor/hora (R$)</label>
            <input type="number" step="0.01" min="0" name="valorHora" value={aula.valorHora || ""} onChange={handleChange} />
          </div>

          <div>
            <label>Capacidade máxima</label>
            <input type="number" min="1" name="capacidadeMaxima" value={aula.capacidadeMaxima || ""} onChange={handleChange} />
          </div>

          <button className="salvar full" onClick={handleSalvar}>
            💾 Salvar alterações
          </button>

          <button className="excluir full" onClick={handleExcluir}>
            🗑 Excluir Aula
          </button>

          <button className="excluir full" onClick={handleCancelarAula} style={{ marginTop: "8px" }}>
            📣 Cancelar Aula (notifica alunos)
          </button>

        </div>

        {/* 🆕 ALUNOS MATRICULADOS */}
        <div className="professor-alunos-secao">
          <h3>Alunos matriculados</h3>

          {loadingAlunos ? (
            <p>Carregando alunos...</p>
          ) : alunos.length === 0 ? (
            <p className="professor-sem-materias">Nenhum aluno matriculado nesta aula.</p>
          ) : (
            <div className="professor-alunos-lista">
              {alunos.map((aluno) => (
                <div className="professor-aluno-item" key={aluno.id}>
                  <img
                    src={aluno.foto || "https://via.placeholder.com/48"}
                    alt={aluno.nome}
                    className="professor-aluno-foto"
                  />

                  <div className="professor-aluno-dados">
                    <strong>{aluno.nome}</strong>
                    <span>{aluno.email}</span>
                  </div>

                  <div className="professor-aluno-acoes">
                    <button
                      className="ver-perfil"
                      onClick={() => handleVerPerfil(aluno.id)}
                    >
                      👁 Ver perfil
                    </button>

                    <button
                      className="remover"
                      onClick={() => handleRemoverAluno(aluno.id, aluno.nome)}
                    >
                      ❌ Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="professor-aula-acoes">
          <button className="voltar" onClick={() => navigate("/perfil-professor")}>
            ⬅ Voltar
          </button>
        </div>

      </div>

      {/* 🆕 MODAL DE PERFIL DO ALUNO */}
      {(alunoSelecionado || loadingPerfil) && (
        <div className="aluno-perfil-modal-overlay" onClick={handleFecharPerfil}>
          <div className="aluno-perfil-modal" onClick={(e) => e.stopPropagation()}>
            <button className="aluno-perfil-modal-fechar" onClick={handleFecharPerfil}>✕</button>

            {loadingPerfil ? (
              <p>Carregando perfil...</p>
            ) : (
              <>
                <img
                  src={alunoSelecionado.foto || "https://via.placeholder.com/100"}
                  alt={alunoSelecionado.nome}
                  className="aluno-perfil-modal-foto"
                />
                <h3>{alunoSelecionado.nome}</h3>
                <p>{alunoSelecionado.email}</p>

                <button
                  className="excluir"
                  onClick={() =>
                    handleRemoverAluno(alunoSelecionado.id, alunoSelecionado.nome)
                  }
                >
                  ❌ Remover da aula
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}