{/* Meus imports*/}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginTela from "../assets/imagens/loginTela.png";
import "../assets/css/LoginStyle.css";

function Login() {
  const navigate = useNavigate(); {/*Pega a função do navigate, posso mudar de pagina via codigo*/}
  const [form, setForm] = useState({ login: "", password: "" }); {/*Guarda o que o usuário esta digitando*/}

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault(); {/*Evito a pagina de recarregar*/}
    console.log("Tentando login:", form); {/*mostra no console os dados digitados*/}
    navigate("/"); {/*Redireciona o usuário para minha pagina raiz no caso a de Cadastro*/}
  };

  return (
    <div
    /*Minha imagem de Fundo com a personalização do css*/
      className="login-container"
      style={{ backgroundImage: `url(${loginTela})` }}
    >
      <div className="p-4 rounded shadow login-card">
        <h2 className="text-center login-title">Login</h2>

        {/*Meu formulario de Login*/}
        <form onSubmit={handleSubmit}> {/*Controla o que acontece quando o usuário clicar em entrar*/}
          <label className="text-light">Usuário</label>
          <input
            name="login"
            className="form-control mb-3 login-input"
            onChange={handleChange}
          /> {/* handleChange -> Captura o que o usuário esta digitando nos inputs*/}

          <label className="text-light">Senha</label>
          <input
            type="password"
            name="password"
            className="form-control mb-3 login-input"
            onChange={handleChange}
          />

          <button className="login-button mt-2">Entrar</button>
        </form>
        {/*Fim do meu formulário*/}
      </div>
    </div>
  );
}

export default Login;
