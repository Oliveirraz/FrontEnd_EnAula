/*Componente principal da minha aplicação*/
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import CadastroProfessor from "./pages/CadastroProfessor";
import CadastroAluno from "./pages/CadastroAluno";
import "./assets/css/styles.css";

function App() {
  return (
    <BrowserRouter>
      {" "}
      {/*Meu sistema de rotas*/}
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/cadastro" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CreateUser />} />
          <Route path="/cadastro-professor" element={<CadastroProfessor />} />
                    <Route path="/cadastro-aluno" element={<CadastroAluno />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
