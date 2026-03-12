import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/PerfilProfessorStyle.css";
import api from "../../services/api";
import {
  atualizarProfessor,
  deletarProfessor,
} from "../../services/professorService";

import ProfessorPerfilForm from "../../components/ProfessorPerfilForm";
import ProfessorMaterias from "./ProfessorMaterias";
import ProfessorAulas from "./ProfessorAulas";



function PerfilProfessor() {
  const navigate = useNavigate();

  const [professor, setProfessor] = useState(null);
  const [materias, setMaterias] = useState([]);
  const [aulas, setAulas] = useState([]);

  useEffect(() => {
  async function carregarDados() {
    try {
      // Busca professor logado via token JWT
      const resp = await api.get("/professores/me");
      const prof = resp.data;
      setProfessor(prof);

      // Matérias do professor logado
      const materiasResp = await api.get("/materias/professor/me");
      setMaterias(materiasResp.data);

      // Aulas do professor logado
      const aulasResp = await api.get("/aulas/professor/me");
      setAulas(aulasResp.data.content);

    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  }
  carregarDados();
}, [navigate]);

  async function handleSalvar(dadosAtualizados) {
  try {
    const professorAtualizado = await atualizarProfessor(dadosAtualizados, null);
    setProfessor(professorAtualizado);
    alert("Dados atualizados com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar:", error.response?.data || error.message);
    alert("Erro ao atualizar dados.");
  }
}

  async function handleExcluir() {
    if (!window.confirm("Tem certeza que deseja excluir sua conta?")) return;

    await deletarProfessor(professor.id);
    localStorage.removeItem("professorLogado");
    navigate("/login");
  }

  function handleLogout() {
    localStorage.removeItem("professorLogado");
    navigate("/login");
  }

  if (!professor) return null;

return (
  <div className="professor-containerPerfil">
    <div className="professorPerfil-card">

      {/* BOTÃO SAIR */}
      <button className="professor-btn-logout" onClick={handleLogout}>
        ⎋
      </button>

      {/* FOTO CENTRAL NO TOPO DO CARD */}
      <div className="professor-foto-topo">
        <img
          src={professor.foto || "https://via.placeholder.com/140"}
          alt="Foto do professor"
          className="professor-foto"
        />

        <label className="professor-upload">
          Alterar foto
          <input type="file" hidden />
        </label>
      </div>

      {/* CONTEÚDO */}
      <div className="professor-conteudo">

        {/* COLUNA ESQUERDA */}
        <div className="professor-perfil">
          <ProfessorPerfilForm
            professor={professor}
            onSalvar={handleSalvar}
            onExcluir={handleExcluir}
          />

          {/* BOTÕES DE AÇÃO */}
          <div className="professor-acoes-grid">
            <button
              className="acao materias"
              onClick={() => navigate("/professor/materias")}
            >
              📘 <span>Matéria</span>
            </button>

            <button
              className="acao aula"
              onClick={() => navigate("/professor/aulas/nova")}
            >
              🎓 <span>Aula</span>
            </button>
          </div>
        </div>

        {/* COLUNA DIREITA */}
        <div className="professor-direita">
          <ProfessorMaterias materias={materias} />
          <ProfessorAulas aulas={aulas} />
        </div>

      </div>
    </div>
  </div>
);


}

export default PerfilProfessor;
