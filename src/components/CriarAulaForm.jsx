function CriarAulaForm({
  form,
  materias,
  professor,
  onChange,
  onSubmit,
  onCancelar
}) {
  return (
    <form className="criar-aula-form" onSubmit={onSubmit}>

      <label>
        Matéria
        <select
          name="idMateria"
          value={form.idMateria}
          onChange={onChange}
          required
        >
          <option value="">Selecione a matéria</option>
          {materias.map(m => (
            <option key={m.id} value={m.id}>
              {m.nome}
            </option>
          ))}
        </select>
      </label>

      <label>
        Valor da aula (R$/hora)
        <input
          type="number"
          step="0.01"
          name="valorHoraAula"
          value={form.valorHoraAula}
          onChange={onChange}
          required
        />
      </label>

      <label>
        Quantidade máxima de alunos
        <input
          type="number"
          min="1"
          name="capacidadeMaxima"
          value={form.capacidadeMaxima}
          onChange={onChange}
          required
        />
      </label>

      <label>
        Data
        <input
          type="date"
          name="data"
          value={form.data}
          onChange={onChange}
          required
        />
      </label>

      <div className="linha">
        <label>
          Hora início
          <input
            type="time"
            name="horaInicio"
            value={form.horaInicio}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Hora fim
          <input
            type="time"
            name="horaFim"
            value={form.horaFim}
            onChange={onChange}
            required
          />
        </label>
      </div>

      <label>
        Local
        <input
          type="text"
          name="local"
          value={form.local}
          onChange={onChange}
          required
        />
      </label>

      <div className="criar-aula-acoes">
        <button type="submit" className="btn-publicar">
          Publicar Aula
        </button>

        <button
          type="button"
          className="btn-cancelar"
          onClick={onCancelar}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default CriarAulaForm;
