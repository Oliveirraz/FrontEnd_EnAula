import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import CadastroProfessor from "./pages/CadastroProfessor";
import CadastroAluno from "./pages/CadastroAluno";
import PerfilProfessor from "./pages/PerfilProfessor";
import PerfilAluno from "./pages/PerfilAluno";
import Materias from "./pages/Materias";
import CadastroMateria from "./pages/CadastroMateria";

import "./assets/css/styles.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/cadastro" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CreateUser />} />
          <Route path="/cadastro-professor" element={<CadastroProfessor />} />
          <Route path="/cadastro-aluno" element={<CadastroAluno />} />

          {/* ✅ ROTA DO PERFIL DO PROFESSOR */}
          <Route path="/perfil-professor" element={<PerfilProfessor />} />
          <Route path="/perfil-aluno" element={<PerfilAluno />} />
          <Route path="/materias" element={<Materias />} />
          <Route path="/professor/materias" element={<CadastroMateria />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
