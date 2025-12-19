import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/PerfilAlunoStyle.css";
import {
  atualizarAluno,
  deletarAluno,
} from "../services/alunoservice";

/* Converte imagem para Base64 */
function converterParaBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function PerfilAluno() {
  const navigate = useNavigate();

  const [aluno, setAluno] = useState(null);
  const [foto, setFoto] = useState(null);
  const [fotoBase64, setFotoBase64] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    const alunoSalvo = localStorage.getItem("alunoLogado");

    if (!alunoSalvo) {
      navigate("/login");
      return;
    }

    const alunoParseado = JSON.parse(alunoSalvo);
    setAluno(alunoParseado);
    setNome(alunoParseado.nome);
    setEmail(alunoParseado.email);
    setSenha("");
    setFoto(alunoParseado.foto || null);
  }, [navigate]);

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
      const alunoAtualizado = {};

      if (nome !== aluno.nome) alunoAtualizado.nome = nome;
      if (email !== aluno.email) alunoAtualizado.email = email;
      if (senha) alunoAtualizado.senha = senha;
      if (fotoBase64) alunoAtualizado.foto = fotoBase64;

      if (Object.keys(alunoAtualizado).length === 0) {
        alert("Nenhuma alteração foi feita.");
        return;
      }

      const dadosAtualizados = await atualizarAluno(aluno.id, alunoAtualizado);

      setAluno(dadosAtualizados);
      setNome(dadosAtualizados.nome);
      setEmail(dadosAtualizados.email);
      setSenha("");
      setFoto(dadosAtualizados.foto || foto);
      setFotoBase64(null);

      localStorage.setItem("alunoLogado", JSON.stringify(dadosAtualizados));

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
      await deletarAluno(aluno.id);
      localStorage.removeItem("alunoLogado");
      alert("Conta excluída com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir conta.");
    }
  }

  function handleLogout() {
    localStorage.removeItem("alunoLogado");
    navigate("/login");
  }

  if (!aluno) return null;

  return (
    <div className="aluno-container">
      <div className="alunoPerfil-card">

        {/* BOTÃO SAIR (LOGOUT) */}
        <button
          className="aluno-btn-logout"
          onClick={handleLogout}
          title="Sair"
        >
          ⎋
        </button>

        {/* FOTO CENTRAL */}
        <img
          src={foto || "https://via.placeholder.com/120"}
          alt="Foto do aluno"
          className="aluno-foto"
        />

        <label className="aluno-upload">
          Alterar foto
          <input type="file" hidden onChange={handleFotoUpload} />
        </label>

        {/* CONTEÚDO */}
        <div className="aluno-conteudo">

          {/* PERFIL */}
          <div className="aluno-perfil">
            <input
              className="aluno-input"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
            />

            <input
              className="aluno-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <input
              className="aluno-input"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
            />

            <button className="aluno-btn-salvar" onClick={handleSalvar}>
              Salvar alterações
            </button>

            <button className="aluno-btn-excluir" onClick={handleExcluir}>
              Excluir conta
            </button>

            <button
              className="aluno-btn-materias"
              onClick={() => navigate("/materias")}
            >
              Buscar matérias
            </button>
          </div>

          {/* MATÉRIAS */}
          <div className="aluno-materias">
            <h3 className="aluno-titulo">Minhas matérias</h3>

            <div className="aluno-materias-lista">
              {aluno.materias?.length > 0 ? (
                aluno.materias.map((materia) => (
                  <div className="aluno-aula" key={materia.id}>
                    <strong>{materia.nome}</strong>
                    <p>
                      Professor:{" "}
                      <Link
                        to={`/perfil-professor/${materia.professorId}`}
                        className="aluno-professor"
                      >
                        Ver professor
                      </Link>
                    </p>
                  </div>
                ))
              ) : (
                <p className="aluno-sem-materias">
                  Você ainda não adicionou matérias.
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PerfilAluno;
