// socketContext.tsx
import { params, SOCKET_URL } from "@configs/socket.config";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// 定义 SocketContext 类型
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean; // 添加连接状态
  accessToken: string;
}

// 创建 Context
const SocketContext = createContext<SocketContextType | undefined>(undefined);

// 创建 Context Provider
export const SocketProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  // 初始化连接状态
  const [isConnected, setIsConnected] = useState(false);
  // 获取用户token
  const { data } = {
    data: { accessToken: "21212" },
  };
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    const initializeSocket = (token: string) => {
      // 如果存在旧的socket则关闭它
      if (socket) {
        socket.close(); // 关闭旧的 socket 连接
      }
      const newSocket = io(`${SOCKET_URL}/message`, {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
        ...params,
      });

      newSocket.on("connect", () => {
        console.log("连接成功");
        setIsConnected(true);
      });

      newSocket.on("disconnect", () => {
        console.log("断开连接");
        setIsConnected(false);
      });

      // 保存新的 socket 实例
      setSocket(newSocket);
    };

    // 初始化socket连接，依赖于 data.accessToken
    if (data?.accessToken) {
      setAccessToken(data.accessToken);
      initializeSocket(data.accessToken);
    }

    // 组件卸载时关闭连接
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [data?.accessToken]);
  return (
    <SocketContext.Provider value={{ socket, isConnected, accessToken }}>
      {children}
    </SocketContext.Provider>
  );
};

// 自定义 Hook 方便访问 Socket
export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context; // 返回整个上下文
};
