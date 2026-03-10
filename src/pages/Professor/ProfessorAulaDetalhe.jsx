import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "../../assets/css/ProfessorAulaDetalheStyle.css";
import { atualizarAula, deletarAula } from "../../services/aulaService";

export default function ProfessorAulaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [aula, setAula] = useState(null);
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        // ✅ rota correta
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

        // ✅ carrega matérias para o select
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
        alunosIds: [],
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

        </div>

        <div className="professor-aula-acoes">
          <button className="voltar" onClick={() => navigate("/perfil-professor")}>
            ⬅ Voltar
          </button>
        </div>

      </div>
    </div>
  );
}