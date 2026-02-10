import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/CriarAulaStyle.css";

import api from "../services/api";
import { criarAula } from "../services/aulaService";
import { atualizarProfessor } from "../services/professorService";

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
    valorHoraAula: "",
    capacidadeMaxima: ""
  });

  useEffect(() => {
    async function carregarDados() {
      const professorSalvo = JSON.parse(
        localStorage.getItem("professorLogado")
      );

      if (!professorSalvo) {
        navigate("/login");
        return;
      }

      try {
        setProfessor(professorSalvo);

        const respMaterias = await api.get(
          `/professores/${professorSalvo.id}/materias`
        );
        setMaterias(respMaterias.data);

        setForm(prev => ({
          ...prev,
          valorHoraAula: professorSalvo.valorHoraAula || ""
        }));

      } catch (error) {
        console.error(error);
        alert("Erro ao carregar dados do professor.");
      }
    }

    carregarDados();
  }, [navigate]);

  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!professor) {
      alert("Professor não carregado.");
      return;
    }

    try {
      // 🔹 Atualiza valor da hora do professor
      const professorAtualizado = await atualizarProfessor(
        professor.id,
        {
          valorHoraAula: Number(form.valorHoraAula)
        }
      );

      setProfessor(professorAtualizado);
      localStorage.setItem(
        "professorLogado",
        JSON.stringify(professorAtualizado)
      );

      // 🔹 Cria aula
      await criarAula({
        data: form.data,
        horaInicio: form.horaInicio,
        horaFim: form.horaFim,
        local: form.local,
        idMateria: Number(form.idMateria),
        idProfessor: professor.id,
        alunosIds: form.alunosIds,
        capacidadeMaxima: Number(form.capacidadeMaxima),
        valorHora: Number(form.valorHoraAula)
      });

      alert("Aula criada com sucesso!");
      navigate("/perfil-professor", { replace: true });

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Erro ao criar aula."
      );
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
