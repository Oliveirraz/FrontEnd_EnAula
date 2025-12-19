import { useNavigate } from "react-router-dom";
import Cadastro from "../assets/imagens/Cadastro.png";
import "../assets/css/CreateUserStyle.css";

function CreateUser() {
  const navigate = useNavigate();

  return (
    <div
      className="createuser-container d-flex justify-content-center align-items-center"
      style={{ backgroundImage: `url(${Cadastro})` }}
    >
      <div className="p-4 text-light shadow createuser-card text-center">
        <h2 className="mb-4">Como deseja se cadastrar?</h2>

        <div className="d-flex flex-column gap-3">

          {/* Botão Aluno */}
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
            onClick={() => navigate("/cadastro-aluno")}
          >
            <i className="bi bi-mortarboard"></i>
            Sou Aluno
          </button>

          {/* Botão Professor */}
          <button
            className="btn btn-success d-flex align-items-center justify-content-center gap-2"
            onClick={() => navigate("/cadastro-professor")}
          >
            <i className="bi bi-person-badge"></i>
            Sou Professor
          </button>

        </div>
      </div>
    </div>
  );
}

export default CreateUser;
