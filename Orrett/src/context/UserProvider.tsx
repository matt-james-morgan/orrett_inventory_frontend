import type { ReactNode } from "react";
import { useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");

  const login = (name: string) => {
    setAuth(true);
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
