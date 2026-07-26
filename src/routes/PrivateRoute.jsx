import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { token, carregando } = useAuth();

  // 👇 Enquanto ainda está checando o localStorage, não decide nada
  if (carregando) {
    return null; // ou um spinner/loading, se quiser
  }

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;