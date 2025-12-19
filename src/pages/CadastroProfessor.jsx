// src/pages/CadastroProfessor.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarProfessor } from "../services/professorService";
import professorTela from "../assets/imagens/cadastroProfessorTela.png";
import "../assets/css/ProfessorStyle.css"; // Reaplicando o CSS do aluno

function CadastroProfessor() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [foto, setFoto] = useState(null);

  async function handleCadastrar(e) {
    e.preventDefault();

    try {
      const professorDTO = {
        nome,
        email,
        senha,
        perfil: "Professor",
      };

      const formData = new FormData();
      formData.append(
        "professor",
        new Blob([JSON.stringify(professorDTO)], { type: "application/json" })
      );

      if (foto) {
        formData.append("foto", foto);
      }

      const professorCriado = await cadastrarProfessor(formData);
      localStorage.setItem("professorLogado", JSON.stringify(professorCriado));

      alert("Professor cadastrado com sucesso!");
      navigate("/perfil-professor");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar professor");
    }
  }

  return (
    <div
      className="professor-container" // mudado para reaplicar estilo do aluno
      style={{ backgroundImage: `url(${professorTela})` }}
    >
      <div className="prof-card"> 
        <h2 className="aluno-title text-center">Cadastro do Professor</h2>

        <form onSubmit={handleCadastrar}>
          <input
            className="form-control mb-2"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            className="form-control mb-2"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="form-control mb-3"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <input
            className="form-control mb-3"
            type="file"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files[0])}
          />

          <button className="btn btn-success w-100" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroProfessor;
