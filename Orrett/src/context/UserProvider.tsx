import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");

  const previousLogin = sessionStorage.getItem("loggedIn");
  useEffect(() => {
    if (previousLogin == "true") {
      setAuth(true);
    }
  }, []);

  const login = (name: string) => {
    setAuth(true);
    sessionStorage.setItem("loggedIn", "true");
    setUsername(name);
  };

  const logout = () => {
    setAuth(false);
    setUsername("");
  };
  return (
    <UserContext.Provider value={{ auth, username, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
