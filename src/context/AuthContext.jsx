import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [carregando, setCarregando] = useState(true); // 👈 novo

  // 🔄 Carrega token salvo (SE for válido)
  useEffect(() => {
    const tokenSalvo = localStorage.getItem("token");

    if (!tokenSalvo) {
      setCarregando(false); // 👈 nada salvo, libera a checagem
      return;
    }

    try {
      if (tokenSalvo.split(".").length !== 3) {
        throw new Error("Token inválido");
      }

      const decoded = jwtDecode(tokenSalvo);

      setToken(tokenSalvo);
      setUserRoles(decoded.roles || []);
    } catch (error) {
      console.warn("Token inválido no storage, removendo...");
      localStorage.removeItem("token");
    } finally {
      setCarregando(false); // 👈 sempre libera no final
    }
  }, []);

  // 🔐 Login
  const login = (tokenRecebido) => {
    try {
      if (
        !tokenRecebido ||
        typeof tokenRecebido !== "string" ||
        tokenRecebido.split(".").length !== 3
      ) {
        throw new Error("Token inválido recebido no login");
      }

      const decoded = jwtDecode(tokenRecebido);

      localStorage.setItem("token", tokenRecebido);
      setToken(tokenRecebido);
      setUserRoles(decoded.roles || []);
    } catch (error) {
      console.error("Token inválido recebido no login", tokenRecebido);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserRoles([]);
  };

  return (
    <AuthContext.Provider value={{ token, userRoles, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);