import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/PerfilProfessorStyle.css";
import {
  atualizarProfessor,
  deletarProfessor,
} from "../services/professorService";

/* Converte imagem para Base64 */
function converterParaBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function PerfilProfessor() {
  const navigate = useNavigate();

  const [professor, setProfessor] = useState(null);
  const [foto, setFoto] = useState(null);
  const [fotoBase64, setFotoBase64] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    const professorSalvo = localStorage.getItem("professorLogado");

    if (!professorSalvo) {
      const professorFake = {
        id: 1,
        nome: "Professor Exemplo",
        email: "professor@email.com",
        foto: null,
      };

      setProfessor(professorFake);
      setNome(professorFake.nome);
      setEmail(professorFake.email);
      setSenha("");
      setFoto(null);
      return;
    }

    const professorParseado = JSON.parse(professorSalvo);
    setProfessor(professorParseado);
    setNome(professorParseado.nome);
    setEmail(professorParseado.email);
    setSenha("");
    setFoto(professorParseado.foto || null);
  }, []);

  async function handleFotoUpload(e) {
    const arquivo = e.target.files[0];
    if (!arquivo) return;

    const preview = URL.createObjectURL(arquivo);
    setFoto(preview);

    const base64 = await converterParaBase64(arquivo);
    setFotoBase64(base64);
  }

  async function handleSalvar() {
    try {
      const professorAtualizado = {};

      if (nome !== professor.nome) professorAtualizado.nome = nome;
      if (email !== professor.email) professorAtualizado.email = email;
      if (senha) professorAtualizado.senha = senha;
      if (fotoBase64) professorAtualizado.foto = fotoBase64;

      if (Object.keys(professorAtualizado).length === 0) {
        alert("Nenhuma alteração foi feita.");
        return;
      }

      const dadosAtualizados = await atualizarProfessor(
        professor.id,
        professorAtualizado
      );

      setProfessor(dadosAtualizados);
      setNome(dadosAtualizados.nome);
      setEmail(dadosAtualizados.email);
      setSenha("");
      setFoto(dadosAtualizados.foto || foto);
      setFotoBase64(null);

      localStorage.setItem(
        "professorLogado",
        JSON.stringify(dadosAtualizados)
      );

      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar dados.");
    }
  }

  async function handleExcluir() {
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita."
    );

    if (!confirmacao) return;

    try {
      await deletarProfessor(professor.id);
      localStorage.removeItem("professorLogado");
      alert("Conta excluída com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir conta.");
    }
  }

  function handleLogout() {
    localStorage.removeItem("professorLogado");
    navigate("/login");
  }

  if (!professor) return null;

  return (
  <div className="professor-containerPerfil">
    <div className="professorPerfil-card">

      {/* LOGOUT */}
      <button
        className="professor-btn-logout"
        onClick={handleLogout}
        title="Sair"
      >
        ⎋
      </button>

      {/* FOTO */}
      <img
        src={foto || "https://via.placeholder.com/140"}
        alt="Foto do professor"
        className="professor-foto"
      />

      <label className="professor-upload">
        Alterar foto
        <input type="file" hidden onChange={handleFotoUpload} />
      </label>

      {/* CONTEÚDO */}
      <div className="professor-conteudo">

        {/* PERFIL */}
        <div className="professor-perfil">
          <input
            className="professor-input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
          />

          <input
            className="professor-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            className="professor-input"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
          />

          <button
            className="professor-btn-salvar"
            onClick={handleSalvar}
          >
            Salvar alterações
          </button>

          <button
            className="professor-btn-materias"
            onClick={() => navigate("/professor/materias")}
          >
            Adicionar matérias
          </button>

          <button
            className="professor-btn-excluir"
            onClick={handleExcluir}
          >
            Excluir conta
          </button>
        </div>

        {/* DIREITA */}
        <div className="professor-direita">

          {/* MATÉRIAS */}
          <div className="professor-materias">
            <h3 className="professor-titulo">Minhas matérias</h3>

            <div className="professor-materias-lista">
              <div className="professor-aula">Matemática</div>
              <div className="professor-aula">Física</div>
            </div>
          </div>

          {/* AULAS */}
          <div className="professor-materias">
            <h3 className="professor-titulo">Minhas aulas</h3>

            <div className="professor-materias-lista">
              <div className="professor-aula">
                Matemática • Seg • 08:00
              </div>

              <div className="professor-aula">
                Física • Qua • 10:00
              </div>

              <div className="professor-aula">
                Matemática • Sex • 09:30
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
);
}

export default PerfilProfessor;
