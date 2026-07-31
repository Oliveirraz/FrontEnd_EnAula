import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/Aluno/PerfilAlunoStyle.css";
import {
  atualizarAluno,
  deletarAluno,
} from "../../services/alunoservice";
import { cancelarMatricula } from "../../services/aulaService";
import api from "../../services/api";
import JitsiMeet from "../../components/JitsiMeet";

function PerfilAluno() {
  const navigate = useNavigate();

  const [aluno, setAluno] = useState(null);
  const [foto, setFoto] = useState(null);        // preview / base64 vinda do backend
  const [fotoFile, setFotoFile] = useState(null); //  arquivo REAL
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  //  AULAS DO ALUNO
  const [aulas, setAulas] = useState([]);
  const [loadingAulas, setLoadingAulas] = useState(true);
  const [aulaAtiva, setAulaAtiva] = useState(null);

  /* =========================
      BUSCAR ALUNO LOGADO
  ========================= */
  useEffect(() => {
    buscarAlunoLogado();
  }, []);

  async function buscarAlunoLogado() {
    try {
      const response = await api.get("/alunos/me");

      const alunoLogado = response.data;

      setAluno(alunoLogado);
      setNome(alunoLogado.nome);
      setEmail(alunoLogado.email);
      setSenha("");
      setFoto(alunoLogado.foto || null);

      buscarAulasDoAluno();
    } catch (error) {
      console.error("Erro ao buscar aluno logado", error);
      navigate("/login");
    }
  }

  /* =========================
      CANCELAR MATRÍCULA
  ========================= */
  async function handleCancelarMatricula(aulaId) {
    const confirmacao = window.confirm(
      "Tem certeza que deseja cancelar sua matrícula nesta aula? O professor será notificado por e-mail."
    );
    if (!confirmacao) return;

    try {
      await cancelarMatricula(aulaId);
      alert("Matrícula cancelada com sucesso!");
      buscarAulasDoAluno(); // atualiza a lista, removendo a aula cancelada
    } catch (error) {
      console.error("Erro ao cancelar matrícula", error);
      alert(error.response?.data?.message || error.response?.data || "Erro ao cancelar matrícula.");
    }
  }

  /* =========================
      AULAS DO ALUNO
  ========================= */
  async function buscarAulasDoAluno() {
    try {
      const response = await api.get("/aulas/aluno");
      setAulas(response.data);
    } catch (error) {
      console.error("Erro ao buscar aulas do aluno", error);
    } finally {
      setLoadingAulas(false);
    }
  }

  /* =========================
      FOTO (ARQUIVO REAL)
  ========================= */
  function handleFotoUpload(e) {
    const arquivo = e.target.files[0];
    if (!arquivo) return;

    setFotoFile(arquivo); //  importante
    setFoto(URL.createObjectURL(arquivo)); // preview
  }

  /* =========================
      SALVAR DADOS
  ========================= */
  async function handleSalvar() {
    try {
      const alunoAtualizado = {};

      if (nome !== aluno.nome) alunoAtualizado.nome = nome;
      if (email !== aluno.email) alunoAtualizado.email = email;
      if (senha) alunoAtualizado.senha = senha;

      if (
        Object.keys(alunoAtualizado).length === 0 &&
        !fotoFile
      ) {
        alert("Nenhuma alteração foi feita.");
        return;
      }

      const dadosAtualizados = await atualizarAluno(
        alunoAtualizado,
        fotoFile
      );

      setAluno(dadosAtualizados);
      setNome(dadosAtualizados.nome);
      setEmail(dadosAtualizados.email);
      setSenha("");
      setFoto(dadosAtualizados.foto || foto);
      setFotoFile(null);

      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar dados.");
    }
  }

  /* =========================
      EXCLUIR CONTA
  ========================= */
  async function handleExcluir() {
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita."
    );

    if (!confirmacao) return;

    try {
      await deletarAluno();
      localStorage.removeItem("token");
      alert("Conta excluída com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir conta.");
    }
  }

  /* =========================
      LOGOUT
  ========================= */
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  if (!aluno) return null;

  return (
    <div className="aluno-container">
      <div className="alunoPerfil-card">

       {/* LOGOUT */}
<button
  className="aluno-btn-logout"
  onClick={handleLogout}
  title="Sair"
  aria-label="Logout"
>
  ⎋
</button>


        {/* FOTO */}
        <img
          src={foto || "https://via.placeholder.com/120"}
          alt="Foto do aluno"
          className="aluno-foto"
        />

        <label className="aluno-upload">
          Alterar foto
          <input type="file" hidden onChange={handleFotoUpload} />
        </label>

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
              onClick={() => navigate("/aulas")}
            >
              Buscar Aulas
            </button>
          </div>

          {/* 📚 AULAS */}
          <div className="aluno-materias">
            <h3 className="aluno-titulo">Minhas Aulas</h3>

            <div className="aluno-materias-lista">
              {loadingAulas ? (
                <p>Carregando aulas...</p>
              ) : aulas.length > 0 ? (
                aulas.map((aula) => (
                  <div className="aluno-aula" key={aula.id}>
                    <strong>{aula.nomeMateria}</strong>

                    {aula.descricaoMateria && (
                      <p className="aluno-assunto">
                        📘 Assunto: {aula.descricaoMateria}
                      </p>
                    )}

                    <p>
                      Professor:{" "}
                      <Link
                        to={`/professor/${aula.idProfessor}`}
                        className="aluno-professor"
                      >
                        {aula.nomeProfessor}
                      </Link>
                    </p>

                    <p>
                      📅 {aula.data} | ⏰ {aula.horaInicio} - {aula.horaFim}
                    </p>

                    <p>📍 {aula.local}</p>

                    {aulaAtiva === aula.id ? (
                      <JitsiMeet
                        aulaId={aula.id}
                        userName={aluno.nome}
                        onClose={() => setAulaAtiva(null)}
                      />
                    ) : (
                      <button
                        className="aluno-btn-materias"
                        onClick={() => setAulaAtiva(aula.id)}
                      >
                        📹 Entrar na Aula
                      </button>
                    )}

                    <button
                      className="aluno-btn-excluir"
                      style={{ marginTop: "6px" }}
                      onClick={() => handleCancelarMatricula(aula.id)}
                    >
                      ❌ Cancelar Matrícula
                    </button>
                  </div>
                ))
              ) : (
                <p className="aluno-sem-materias">
                  Você ainda não está matriculado em nenhuma aula.
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