import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/MateriaStyle.css";

function Materias() {
  const [aulas] = useState([
    {
      id: 1,
      materia: "Matemática",
      professor: "Professor João",
      valor: 50,
      tempo: "1h",
      descricao: "Figuras geométricas e operações básicas",
    },
    {
      id: 2,
      materia: "Português",
      professor: "Professora Maria",
      valor: 45,
      tempo: "1h30",
      descricao: "Interpretação de texto e gramática",
    },
    {
      id: 3,
      materia: "Física",
      professor: "Professor Carlos",
      valor: 60,
      tempo: "2h",
      descricao: "Movimento uniforme e leis de Newton",
    },
  ]);

  function cadastrarAula(aula) {
    alert(
      `Você se cadastrou na aula de ${aula.materia} com ${aula.professor}`
    );
  }

  return (
    <div className="materias-container">
      <h2 className="materias-titulo">Aulas disponíveis</h2>

      <div className="materias-grid">
        {aulas.map((aula) => (
          <div key={aula.id} className="materia-card">
            <h3>{aula.materia}</h3>

            <p>
              <strong>Professor:</strong>{" "}
              <Link to="/perfil-professor/1" className="materia-professor-link">
                {aula.professor}
              </Link>
            </p>

            <p>💰 R$ {aula.valor} / aula</p>
            <p>⏱️ {aula.tempo}</p>

            <p className="materia-descricao">{aula.descricao}</p>

            <button
              className="materia-btn"
              onClick={() => cadastrarAula(aula)}
            >
              Quero essa aula
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Materias;
