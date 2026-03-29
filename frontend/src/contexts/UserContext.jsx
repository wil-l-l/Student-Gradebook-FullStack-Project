import { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return <UserContext value={{ user, setUser }}>{children}</UserContext>;
}

export { UserProvider, UserContext };
