import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAluno } from "../services/alunoservice";
import { loginProfessor } from "../services/professorService";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import loginTela from "../assets/imagens/loginTela.png";
import "../assets/css/LoginStyle.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

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
    let token;

    if (tipo === "aluno") {
      token = await loginAluno(form.email, form.senha);
    } else {
      token = await loginProfessor(form.email, form.senha);
    }

    login(token); // salva token no AuthContext/localStorage

    if (tipo === "aluno") {
      // busca dados do aluno e salva
      const resp = await api.get("/alunos/me");
      localStorage.setItem("alunoLogado", JSON.stringify(resp.data));
      navigate("/perfil-aluno");
    } else {
      // busca dados do professor e salva
      const resp = await api.get("/professores/me");
      localStorage.setItem("professorLogado", JSON.stringify(resp.data));
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
