import { useState } from "react";

/*estado inicial vazio, e guarda o estado no (form)*/
function FormUser({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value }); /*Atualiza o campo que mudou, e. target.value (pega o valor digitado)*/

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    /*Meu formulário*/
    <form onSubmit={submit}>
      <label className="text-light">Nome</label>
      <input
        className="form-control mb-2"
        name="name"
        onChange={handleChange}
      />

      <label className="text-light">E-mail</label>
      <input
        className="form-control mb-2"
        name="email"
        onChange={handleChange}
      />

      <label className="text-light">Senha</label>
      <input
        type="password"
        className="form-control mb-3"
        name="password"
        onChange={handleChange}
      />

      <button className="btn btn-success w-100">Salvar</button>
    </form>
  );
}

export default FormUser;
