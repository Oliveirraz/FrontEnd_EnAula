import { useNavigate } from "react-router-dom";

export default function ProfessorMaterias({ materias }) {
  const navigate = useNavigate();

  return (
    <div className="professor-materias">
      <h3 className="professor-titulo">Minhas matérias</h3>

      <div className="professor-materias-lista">
        {materias.length > 0 ? (
          materias.map((m) => (
            <div
              key={m.id}
              className="professor-aula professor-aula-hover"
              onClick={() =>
                navigate(`/professor/materias/${m.id}`)
              }
            >
              ✏️ {m.nome}
            </div>
          ))
        ) : (
          <span>Nenhuma matéria cadastrada</span>
        )}
      </div>
    </div>
  );
}
