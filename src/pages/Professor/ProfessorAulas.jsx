import { useNavigate } from "react-router-dom";

export default function ProfessorAulas({ aulas }) {
  const navigate = useNavigate();

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
              📘 <strong>{aula.nomeMateria}</strong><br />
              📅 {aula.data}<br />
              ⏰ {aula.horaInicio} às {aula.horaFim}<br />
              👥 {aula.totalAlunos} aluno(s)<br />
              🪑 {aula.vagasDisponiveis} vaga(s)<br />
              💰 R$ {aula.valorHora}
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
