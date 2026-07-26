import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import CadastroProfessor from "./pages/Professor/CadastroProfessor";
import CadastroAluno from "./pages/CadastroAluno";

// 🔹 PERFIS
import PerfilProfessor from "./pages/Professor/PerfilProfessor";
import PerfilAluno from "./pages/PerfilAluno";

// 🔹 PROFESSOR
import Materias from "./pages/Materias";
import CadastroMateria from "./pages/CadastroMateria";
import CriarAula from "./pages/CriarAula";
import ProfessorAulaDetalhe from "./pages/Professor/ProfessorAulaDetalhe";
import PerfilProfessorPublico from "./pages/PerfilProfessorPublico";

// 🔹 ALUNO
import ListaAulas from "./pages/ListaAulas";

import "./assets/css/styles.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />

        <div className="container mt-4">
          <Routes>

            {/* REDIRECT PADRÃO */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* ROTAS PÚBLICAS */}
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<CreateUser />} />
            <Route path="/cadastro-professor" element={<CadastroProfessor />} />
            <Route path="/cadastro-aluno" element={<CadastroAluno />} />
            

            {/* ROTAS PROTEGIDAS (LOGIN) */}
            <Route element={<PrivateRoute />}>

              {/* PERFIS */}
              <Route
                path="/perfil-professor"
                element={
                  <ProtectedRoute roles={["ROLE_PROFESSOR"]}>
                    <PerfilProfessor />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/perfil-aluno"
                element={
                  <ProtectedRoute roles={["ROLE_ALUNO"]}>
                    <PerfilAluno />
                  </ProtectedRoute>
                }
              />

              {/* PROFESSOR */}
              <Route
                path="/materias"
                element={
                  <ProtectedRoute roles={["ROLE_PROFESSOR"]}>
                    <Materias />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/professor/materias"
                element={
                  <ProtectedRoute roles={["ROLE_PROFESSOR"]}>
                    <CadastroMateria />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/professor/materias/:id"
                element={
                  <ProtectedRoute roles={["ROLE_PROFESSOR"]}>
                    <CadastroMateria />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/professor/aulas/nova"
                element={
                  <ProtectedRoute roles={["ROLE_PROFESSOR"]}>
                    <CriarAula />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/professor/aulas/:id"
                element={
                  <ProtectedRoute roles={["ROLE_PROFESSOR"]}>
                    <ProfessorAulaDetalhe />
                  </ProtectedRoute>
                }
              />

              {/* ALUNO */}
              <Route
                path="/aulas"
                element={
                  <ProtectedRoute roles={["ROLE_ALUNO"]}>
                    <ListaAulas />
                  </ProtectedRoute>
                }
              />

              // dentro do bloco de rotas protegidas do aluno:
              <Route
                path="/professor/:id"
                element={
                  <ProtectedRoute roles={["ROLE_ALUNO"]}>
                    <PerfilProfessorPublico />
                  </ProtectedRoute>
                }
              />

            </Route>

            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/login" />} />

          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
