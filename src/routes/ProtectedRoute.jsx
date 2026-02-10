import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const { userRoles } = useAuth();

  // Se ainda não carregou as roles
  if (!userRoles) {
    return <Navigate to="/login" />;
  }

  // Verifica se o usuário tem alguma das roles exigidas
  if (!roles.some((role) => userRoles.includes(role))) {
    return <h1>Acesso Negado</h1>;
  }

  return children;
};

export default ProtectedRoute;
