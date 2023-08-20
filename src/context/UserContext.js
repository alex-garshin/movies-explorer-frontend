import React, { createContext, useEffect, useState } from "react";
export const UserContext = createContext({});

export const UserContextProvider = ({ setIsLoading, children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setIsLoading(true);
    fetch("", {}).then((user) => {
      if (user) {
        setUser(user);
      }
    });
    setIsLoading(false);
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
