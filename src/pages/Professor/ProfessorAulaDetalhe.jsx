import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "../../assets/css/ProfessorAulaDetalheStyle.css";
import { atualizarAula, deletarAula } from "../../services/aulaService";

export default function ProfessorAulaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [aula, setAula] = useState(null);

 useEffect(() => {
  async function carregarAula() {
    try {
      const response = await api.get(`/aulas/${id}`);
      const data = response.data;

      // Mapear para DTO do frontend
    setAula({
  id: data.id,
  data: data.data,
  horaInicio: data.horaInicio,
  horaFim: data.horaFim,
  local: data.local,
  valorHora: data.valorHora,
  vagasDisponiveis: data.capacidadeMaxima,
  totalAlunos: data.totalAlunos,
  idProfessor: data.idProfessor,
  idMateria: data.idMateria,
  nomeMateria: data.nomeMateria,
  descricaoMateria: data.descricaoMateria,
});

    } catch (error) {
      console.error("Erro ao carregar aula:", error);
      alert("Erro ao carregar a aula. Verifique o console.");
    }
  }

  carregarAula();
}, [id]);


  function handleChange(e) {
    const { name, value } = e.target;

    // Para números, garantir que seja convertido
    let val = value;
    if (["valorHora", "vagasDisponiveis"].includes(name)) {
      val = Number(value);
    }

    setAula({ ...aula, [name]: val });
  }

async function handleSalvar() {
  try {
    if (!aula.idProfessor || !aula.idMateria) {
      alert("ID do professor ou da matéria está inválido.");
      return;
    }

    const dto = {
      data: aula.data,
      horaInicio: aula.horaInicio,
      horaFim: aula.horaFim,
      local: aula.local || "Não informado",
      valorHora: aula.valorHora,
      capacidadeMaxima: aula.vagasDisponiveis,
      idProfessor: aula.idProfessor,
      idMateria: aula.idMateria,
      alunosIds: [],
    };

    console.log("DTO enviado:", dto);

    await atualizarAula(aula.id, dto);
    alert("Aula atualizada com sucesso!");
    navigate("/perfil-professor");

  } catch (error) {
    console.error(
      "Erro ao atualizar aula:",
      error.response?.data || error.message
    );
    alert("Erro ao atualizar aula");
  }
}


  async function handleExcluir() {
    if (!window.confirm("Deseja realmente excluir esta aula?")) return;

    try {
      await deletarAula(aula.id);
      alert("Aula excluída com sucesso!");
      navigate("/perfil-professor");
    } catch (error) {
      console.error("Erro ao excluir aula:", error);
      alert("Erro ao excluir aula.");
    }
  }

  if (!aula) {
    return <p style={{ textAlign: "center" }}>Carregando aula...</p>;
  }

  return (
    <div className="professor-containerPerfil">
      <div className="professorPerfil-card professor-aula-detalhe">
        <h2>Detalhes da Aula</h2>

        {/* INFO FIXA */}
        <div className="professor-aula-info">
          <p><strong>Matéria:</strong> {aula.nomeMateria}</p>
          <p><strong>Descrição da matéria:</strong> {aula.descricaoMateria}</p>
          <p><strong>Alunos cadastrados:</strong> {aula.totalAlunos}</p>
        </div>

      {/* FORMULÁRIO */}
        <div className="professor-aula-form">
          <div>
            <label>Dia da aula</label>
            <input
              type="date"
              name="data"
              value={aula.data}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Horário de início</label>
            <input
              type="time"
              name="horaInicio"
              value={aula.horaInicio || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Horário de fim</label>
            <input
              type="time"
              name="horaFim"
              value={aula.horaFim || ""}
              onChange={handleChange}
            />
          </div>

          {/* 🔥 NOVO CAMPO LOCAL */}
          <div>
            <label>Local da aula</label>
            <input
              type="text"
              name="local"
              value={aula.local || ""}
              onChange={handleChange}
              placeholder="Ex: Google Meet, Sala 12, Zoom"
            />
          </div>

          <div>
            <label>Valor da aula</label>
            <input
              type="number"
              name="valorHora"
              value={aula.valorHora || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Vagas disponíveis</label>
            <input
              type="number"
              name="vagasDisponiveis"
              value={aula.vagasDisponiveis || 0}
              onChange={handleChange}
            />
          </div>

          <div className="botao-salvar-container">
            <button className="salvar" onClick={handleSalvar}>
              💾 Salvar
            </button>
          </div>

          <button className="excluir" onClick={handleExcluir}>
            🗑 Excluir Aula
          </button>

        </div>

        {/* AÇÕES */}
        <div className="professor-acoes-grid professor-aula-acoes">
          <button className="voltar" onClick={() => navigate("/perfil-professor")}>
            ⬅ Voltar
          </button>

          
        </div>
      </div>
    </div>
  );
}
