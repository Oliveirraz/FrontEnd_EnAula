import "../assets/css/AlunoStyle.css";
import alunoTela from "../assets/imagens/cadastroAlunoTela.png";
import FormUser from "../components/FormUser";

function CadastroAluno() {
  return (
    <div
      className="aluno-container"
      style={{ backgroundImage: `url(${alunoTela})` }}
    >
      <div className="aluno-card">
        <h2 className="aluno-title">Cadastro do Aluno</h2>

        <FormUser />
      </div>
    </div>
  );
}

export default CadastroAluno;
