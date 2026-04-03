import { ManagerOptions, SocketOptions } from "socket.io-client";

// 基础url
export const SOCKET_URL: string =
  process.env.EXPO_PUBLIC_SOCKRT_URL || "http://localhost:3000";

// 参数配置
export const params: Partial<ManagerOptions & SocketOptions> = {
  reconnection: true,
  timeout: 5000,
  transports: ["websocket"],
};
