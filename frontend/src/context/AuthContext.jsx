import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const user = Cookies.get("userName");
    const role = Cookies.get("role");
    const id = Cookies.get("id");

    if (token && user && id) {
      setUserName(user);
      setRole(role);
      setId(id);
    } else {
      setUserName(null);
      setRole(null);
      setId(null);
    }
  }, []);

  const login = ({ token, name, role, id }) => {
    Cookies.set("token", token);
    Cookies.set("userName", name);
    Cookies.set("role", role);
    Cookies.set("id", id);

    setUserName(name);
    setRole(role);
    setId(id);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("userName");
    Cookies.remove("role");
    Cookies.remove("id");

    setUserName(null);
    setRole(null);
    setId(null);
  };

  return (
    <AuthContext.Provider value={{ userName, role, id, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};