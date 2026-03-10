import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/CriarAulaStyle.css";
import api from "../services/api";
import { criarAula } from "../services/aulaService";
import CriarAulaForm from "../components/CriarAulaForm";

function CriarAula() {
  const navigate = useNavigate();
  const [professor, setProfessor] = useState(null);
  const [materias, setMaterias] = useState([]);

  const [form, setForm] = useState({
  data: "",
  horaInicio: "",
  horaFim: "",
  local: "",
  idMateria: "",
  alunosIds: [],
  capacidadeMaxima: "",
  valorHora: professor?.valorHoraAula || ""  // pré-preenche se tiver
});

  useEffect(() => {
    async function carregarDados() {
      try {
        // Busca professor logado via token (não usa localStorage)
        const profResp = await api.get("/professores/me");
        setProfessor(profResp.data);

        // Busca matérias do professor logado
        const matResp = await api.get("/materias/professor/me");
        setMaterias(matResp.data);
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    }
    carregarDados();
  }, [navigate]);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!professor) return;

    try {
      await criarAula({
      data: form.data,
      horaInicio: form.horaInicio,
      horaFim: form.horaFim,
      local: form.local,
      idMateria: Number(form.idMateria),
      alunosIds: [],
      capacidadeMaxima: Number(form.capacidadeMaxima),
      valorHora: Number(form.valorHora),  // ← adicionar
    });

      alert("Aula criada com sucesso!");
      navigate("/perfil-professor", { replace: true });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Erro ao criar aula.");
    }
  }

  if (!professor) return null;

  return (
    <div className="criar-aula-container">
      <div className="criar-aula-card">
        <div className="professor-mini-topo">
          <img
            src={professor.foto || "https://via.placeholder.com/60"}
            alt="Professor"
            className="professor-foto"
          />
          <span>{professor.nome}</span>
        </div>

        <h2>Criar Aula</h2>

        <CriarAulaForm
          form={form}
          materias={materias}
          professor={professor}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancelar={() => navigate("/perfil-professor")}
        />
      </div>
    </div>
  );
}

export default CriarAula;