import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAluno } from "../services/AlunoService";
import { loginProfessor } from "../services/professorService";
import loginTela from "../assets/imagens/loginTela.png";
import "../assets/css/LoginStyle.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const [tipo, setTipo] = useState("aluno");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let usuario;

      if (tipo === "aluno") {
        usuario = await loginAluno(form.email, form.senha);
        localStorage.setItem("alunoLogado", JSON.stringify(usuario));
        navigate("/perfil-aluno");
      } else {
        usuario = await loginProfessor(form.email, form.senha);
        localStorage.setItem("professorLogado", JSON.stringify(usuario));
        navigate("/perfil-professor");
      }

    } catch (error) {
      alert("Email ou senha inválidos");
    }
  }

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${loginTela})` }}
    >
      <div className="p-4 rounded shadow login-card">
        <h2 className="text-center login-title">Login</h2>

        <form onSubmit={handleSubmit}>

          <label className="text-light">Entrar como</label>
          <select
            className="form-control mb-3 login-input"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="aluno">Aluno</option>
            <option value="professor">Professor</option>
          </select>

          <label className="text-light">Email</label>
          <input
            type="email"
            name="email"
            className="form-control mb-3 login-input"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label className="text-light">Senha</label>
          <input
            type="password"
            name="senha"
            className="form-control mb-3 login-input"
            value={form.senha}
            onChange={handleChange}
            required
          />

          <button type="submit" className="login-button mt-2">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
