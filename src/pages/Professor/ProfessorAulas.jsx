import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JitsiMeet from "../../components/JitsiMeet";

export default function ProfessorAulas({ aulas, professorNome }) {
  const navigate = useNavigate();
  const [aulaAtiva, setAulaAtiva] = useState(null);

  return (
    <div className="professor-materias">
      <h3 className="professor-titulo">Minhas Aulas</h3>

      <div className="professor-materias-lista">
        {aulas.length > 0 ? (
          aulas.map((aula) => (
            <div
              key={aula.id}
              className="professor-aula professor-aula-hover"
              onClick={() => navigate(`/professor/aulas/${aula.id}`)}
            >
              <strong>📘 {aula.nomeMateria}</strong>

              <p>📅 {aula.data}</p>

              <p>⏰ {aula.horaInicio} às {aula.horaFim}</p>

              <p>👥 {aula.totalAlunos} aluno(s)</p>

              <p>🪑 {aula.vagasDisponiveis} vaga(s)</p>

              <p>💰 R$ {aula.valorHora}</p>

              {aulaAtiva === aula.id ? (
                <div onClick={(e) => e.stopPropagation()}>
                  <JitsiMeet
                    aulaId={aula.id}
                    userName={professorNome}
                    onClose={() => setAulaAtiva(null)}
                  />
                </div>
              ) : (
                <button
                  className="acao aula"
                  onClick={(e) => {
                    e.stopPropagation(); // impede a navegação
                    setAulaAtiva(aula.id);
                  }}
                >
                  🎥 Iniciar Aula
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="professor-sem-materias">
            Nenhuma aula cadastrada
          </div>
        )}
      </div>
    </div>
  );
}
