import React, { useEffect, useState, useContext, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import io, { Socket } from "socket.io-client";
import { API_URL } from "../global";
import { useAuth } from "./AuthContext";
import { useError } from "./ErrorContext";

interface DefaultProps {
  socket: Socket | undefined;
}

const SocketContext = React.createContext<DefaultProps>({ socket: undefined });

export function useSocket() {
  return useContext(SocketContext);
}

interface SocketProviderProps {
  children: React.ReactNode;
  id: string | undefined;
}

const SocketProvider = ({ children, id }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket>();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const { user } = useAuth();
  const { setError } = useError();

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChanged);
    return function cleanUp() {
      AppState.removeEventListener("change", _handleAppStateChanged);
    };
  }, []);

  const _handleAppStateChanged = (nextAppState: AppStateStatus) => {
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  function disconnectAndReconnectSocket(newSocket: Socket) {
    setSocket((prev) => {
      if (prev) prev.disconnect();
      return newSocket;
    });
  }

  function connectSocket() {
    let newSocket: Socket;
    if (user?.id) {
      newSocket = io(API_URL, {
        transports: ["websocket"],
        query: { id: user?.id },
      });
      disconnectAndReconnectSocket(newSocket);
    }
    if (socket) return;
    newSocket = io(API_URL, {
      transports: ["websocket"],
    });
    disconnectAndReconnectSocket(newSocket);
  }

  useEffect(() => {
    switch (appStateVisible) {
      case "active": {
        connectSocket();
        break;
      }
      case "inactive":
        setSocket((prev) => {
          if (prev) {
            prev.disconnect();
          }
          return undefined;
        });
        break;
    }
  }, [appStateVisible, user?.id]);

  useEffect(() => {
    if (!socket) return;
    socket.on("story-commented", ({ story, by }) => {
      setError({
        type: "success",
        message: `${by} commented on Your story: ${story}`,
      });
    });
    return () => {
      socket.off("story-commented");
    };
  }, [socket]);

  const value = { socket };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
