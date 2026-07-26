import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const { userRoles, carregando } = useAuth();

  if (carregando) {
    return null;
  }

  if (!userRoles || userRoles.length === 0) {
    return <Navigate to="/login" />;
  }

  if (!roles.some((role) => userRoles.includes(role))) {
    return <h1>Acesso Negado</h1>;
  }

  return children;
};

export default ProtectedRoute;