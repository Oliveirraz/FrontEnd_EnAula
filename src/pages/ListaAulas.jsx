import { useEffect, useState } from "react";
import "../assets/css/ListaAulas.css";
import { listarAulas, solicitarMatricula } from "../services/aulaService";

function ListaAulas() {
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [busca, setBusca] = useState("");
  const [termo, setTermo] = useState("");

  // 🆕 controla quais aulas já foram solicitadas nesta sessão
  const [solicitadas, setSolicitadas] = useState([]);

  useEffect(() => {
    async function carregarAulas() {
      setLoading(true);
      try {
        const pageData = await listarAulas(pagina, 12, termo);
        setAulas(pageData.content);
        setTotalPaginas(pageData.totalPages);
      } catch (error) {
        console.error("Erro ao listar aulas", error);
      } finally {
        setLoading(false);
      }
    }
    carregarAulas();
  }, [pagina, termo]);

  function handleBuscaChange(e) {
    setBusca(e.target.value);
  }

  function handleBuscaKeyPress(e) {
    if (e.key === "Enter") {
      setPagina(0);
      setTermo(busca);
    }
  }

  async function handleSolicitarMatricula(aulaId) {
    try {
      setLoading(true);
      const mensagem = await solicitarMatricula(aulaId);
      alert(mensagem || "Solicitação enviada! Aguarde a aprovação do professor.");
      setSolicitadas((prev) => [...prev, aulaId]);
    } catch (error) {
      console.error("Erro ao solicitar matrícula", error);
      alert(error.response?.data?.message || error.response?.data || "Erro ao solicitar matrícula.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Carregando aulas...</p>;

  return (
    <div className="lista-aulas-container">
      <h2>Aulas Disponíveis</h2>

      <input
        type="text"
        className="pesquisa-input"
        placeholder="Pesquisar por professor ou matéria..."
        value={busca}
        onChange={handleBuscaChange}
        onKeyPress={handleBuscaKeyPress}
      />

      {aulas.length === 0 && <p>Nenhuma aula encontrada.</p>}

      <div className="aulas-grid">
        {aulas.map((aula) => {
          const jaSolicitou = solicitadas.includes(aula.id);
          const aulaCheia = aula.vagasDisponiveis === 0;

          return (
            <div className="aula-card" key={aula.id}>
              <h3>{aula.nomeMateria}</h3>
              <p className="descricao">{aula.descricaoMateria}</p>
              <p><strong>Professor:</strong> {aula.nomeProfessor}</p>
              <p><strong>Valor/Hora:</strong> R$ {aula.valorHora ?? "Não informado"}</p>
              <p><strong>Data:</strong> {aula.data}</p>
              <p><strong>Horário:</strong> {aula.horaInicio} às {aula.horaFim}</p>
              <p><strong>Local:</strong> {aula.local}</p>
              <p className="vagas">
                <strong>Vagas disponíveis:</strong> {aula.vagasDisponiveis} / {aula.capacidadeMaxima}
              </p>
              <button
                disabled={aulaCheia || jaSolicitou}
                onClick={() => handleSolicitarMatricula(aula.id)}
              >
                {jaSolicitou
                  ? "Solicitação enviada ✔"
                  : aulaCheia
                  ? "Aula cheia"
                  : "Solicitar matrícula"}
              </button>
            </div>
          );
        })}
      </div>

      {totalPaginas > 1 && (
        <div className="paginacao">
          <button onClick={() => setPagina((p) => p - 1)} disabled={pagina === 0}>
            ◀ Anterior
          </button>
          <span>Página {pagina + 1} de {totalPaginas}</span>
          <button onClick={() => setPagina((p) => p + 1)} disabled={pagina === totalPaginas - 1}>
            Próxima ▶
          </button>
        </div>
      )}
    </div>
  );
}

export default ListaAulas;