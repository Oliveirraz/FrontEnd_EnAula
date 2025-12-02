import { useState } from "react";
import professorTela from "../assets/imagens/cadastroProfessorTela.png";
import "../assets/css/ProfessorStyle.css";

function CadastroProfessor() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    materia: "",
    descricao: "",
    horarios: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    console.log("Dados cadastrados:", form);
    alert("Professor cadastrado com sucesso!");
  };

  return (
    <div
      className="prof-container"
      style={{ backgroundImage: `url(${professorTela})` }}
    >
      <div className="p-4 rounded shadow prof-card text-light">
        <h2 className="mb-3 text-center">Cadastro do Professor</h2>

        <form onSubmit={submit}>
          <input
            name="name"
            className="form-control mb-2 prof-input"
            placeholder="Nome"
            onChange={handleChange}
          />

          <input
            name="email"
            className="form-control mb-2 prof-input"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            className="form-control mb-2 prof-input"
            placeholder="Senha"
            onChange={handleChange}
          />

          <input
            name="materia"
            className="form-control mb-2 prof-input"
            placeholder="Matéria que deseja lecionar"
            onChange={handleChange}
          />

          <textarea
            name="descricao"
            className="form-control mb-2 prof-textarea"
            placeholder="Descrição da matéria"
            onChange={handleChange}
          />

          <input
            name="horarios"
            className="form-control mb-3 prof-input"
            placeholder="Horários disponíveis"
            onChange={handleChange}
          />

          <button className="btn btn-success w-100">Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default CadastroProfessor;
