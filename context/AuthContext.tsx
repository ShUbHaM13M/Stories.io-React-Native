import React, { useState, useEffect, useContext, useCallback } from "react";
import { API_URL } from "../global";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const USER_STORAGE_KEY = "@currentUser";

interface DefaultProps {
  user: User | undefined | null;
  loginUser: (username: string, password: string) => void;
  logoutUser: () => void;
  isLoggedin: boolean;
}

const AuthContext = React.createContext<DefaultProps>({
  user: undefined,
  loginUser: (username, password) => {},
  logoutUser: () => {},
  isLoggedin: false,
});

export type User = {
  email: string;
  username: string;
  avatar: string;
  id: string;
};

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>();
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const {
    getItem: getUserFromStorage,
    setItem: saveUserInStorage,
    removeItem: removeUserFromStorage,
  } = useAsyncStorage(USER_STORAGE_KEY);

  const loginUser = useCallback(async (username: string, password: string) => {
    try {
      const result = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      const value = await result.json();
      if (result.ok) {
        setUser(value.user);
        return;
      }
      setUser(undefined);
    } catch (err) {
      console.error(err);
      setUser(undefined);
    }
    // saving the user in the memory storage
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getUserFromStorage();
      if (data) setUser(JSON.parse(data));
    })();
    setLoading(false);
  }, []);

  async function logoutUser() {
    setUser(undefined);
    setIsLoggedin(false);
    removeUserFromStorage();
  }

  useEffect(() => {
    if (user) {
      setIsLoggedin(true);
      saveUserInStorage(JSON.stringify(user));
      return;
    }
    logoutUser();
  }, [user]);

  const value = { user, loginUser, logoutUser, isLoggedin };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
