import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { token } = useAuth();

  // Se estiver autenticado, libera as rotas filhas
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
