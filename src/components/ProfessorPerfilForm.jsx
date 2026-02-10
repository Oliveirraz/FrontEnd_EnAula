import { useState } from "react";

export default function ProfessorPerfilForm({ professor, onSalvar, onExcluir }) {
  const [dados, setDados] = useState(professor);
  const [senha, setSenha] = useState("");

  function salvar() {
    onSalvar({
      nome: dados.nome,
      email: dados.email,
      ...(senha && { senha }),
    });

    setSenha("");
  }

  return (
    <div className="professor-perfil">
      {/* INPUTS */}
      <input
        className="professor-input"
        value={dados.nome || ""}
        onChange={(e) => setDados({ ...dados, nome: e.target.value })}
        placeholder="Nome"
      />

      <input
        className="professor-input"
        value={dados.email || ""}
        onChange={(e) => setDados({ ...dados, email: e.target.value })}
        placeholder="Email"
      />

      <input
        className="professor-input"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Nova senha"
      />

      {/* BOTÕES */}
      <div className="professor-acoes-grid">
        <button className="acao salvar" onClick={salvar}>
          💾 <span>Salvar</span>
        </button>

        <button className="acao excluir" onClick={onExcluir}>
          🗑️ <span>Excluir</span>
        </button>
      </div>
    </div>
  );
}
