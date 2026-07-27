import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "../../assets/css/Aluno/PerfilAlunoStyle.css";

export default function PerfilProfessorPublico() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [professor, setProfessor] = useState(null);
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const profResp = await api.get(`/professores/${id}`);
        setProfessor(profResp.data);

        const aulasResp = await api.get("/aulas", {
          params: { termo: profResp.data.nome, page: 0, size: 20 },
        });
        setAulas(aulasResp.data.content ?? []);
      } catch (error) {
        console.error("Erro ao carregar perfil do professor:", error);
        navigate(-1);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, [id, navigate]);

  if (loading) return <p style={{ textAlign: "center" }}>Carregando...</p>;
  if (!professor) return null;

  return (
    <div className="aluno-container">
      <div className="alunoPerfil-card">

        <button className="aluno-btn-logout" onClick={() => navigate(-1)}>✕</button>

        {/* FOTO */}
        <img
          src={professor.foto || "https://via.placeholder.com/130"}
          alt="Foto do professor"
          className="aluno-foto"
        />

        <div className="aluno-conteudo">

          {/* COLUNA ESQUERDA — DADOS */}
          <div className="aluno-perfil">
            <h3 style={{ marginBottom: "12px" }}>{professor.nome}</h3>

            <p><strong>Email:</strong> {professor.email}</p>

            <p style={{ marginTop: "8px" }}>
              <strong>Valor/hora:</strong>{" "}
              {professor.valorHoraAula
                ? `R$ ${professor.valorHoraAula}`
                : "Não informado"}
            </p>
          </div>

          {/* COLUNA DIREITA — AULAS */}
          <div className="aluno-materias">
            <h4 className="aluno-titulo">Aulas disponíveis</h4>
            <div className="aluno-materias-lista">
              {aulas.length === 0 ? (
                <p className="aluno-sem-materias">
                  Nenhuma aula cadastrada.
                </p>
              ) : (
                aulas.map((aula) => (
                  <div className="aluno-aula" key={aula.id}>
                    <strong>📘 {aula.nomeMateria}</strong>
                    <p>📅 {aula.data} | ⏰ {aula.horaInicio} - {aula.horaFim}</p>
                    <p>📍 {aula.local}</p>
                    <p>💰 R$ {aula.valorHora ?? "—"} | 🪑 {aula.vagasDisponiveis} vaga(s)</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}