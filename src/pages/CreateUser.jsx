import FormUser from "../components/FormUser";
import Cadastro from "../assets/imagens/Cadastro.png";
import "../assets/css/CreateUserStyle.css";

/*Minha função de salvar da tela de criação*/ 
function CreateUser() {
  const salvar = (dados) => {
    console.log("Usuário criado:", dados);
  };


  return (
    <div
    /*(createuser-card) -> minha personalização*/
    /*(d-flex justify-content-center align-items-center) -> Personalizações do BootStrap (display, justify-content, align-items)*/
      className="createuser-container d-flex justify-content-center align-items-center"
      style={{ backgroundImage: `url(${Cadastro})` }}
    >
      <div className="p-4 text-light shadow createuser-card">
        <h2 className="text-center mb-3">Cadastrar Usuário</h2>

        <FormUser onSubmit={salvar} />
      </div>
    </div>
  );
}

export default CreateUser;
