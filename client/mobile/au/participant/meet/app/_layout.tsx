import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { SocketProvider } from "@/contexts/SocketProvider";
import { useColorScheme } from "@/hooks/use-color-scheme";
import "../global.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  console.log("当前环境:", process.env.EXPO_PUBLIC_ENV);
  console.log("ENV:", process.env.EXPO_PUBLIC_ENV);
  console.log("NODE_ENV:", process.env.NODE_ENV);

  return (
    <SocketProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,

            // ✅ iOS 风格转场
            animation: "slide_from_right",

            // ✅ 手势返回（iOS 核心体验）
            gestureEnabled: true,
            gestureDirection: "horizontal",

            // ✅ 页面从右进入的动画更自然
            fullScreenGestureEnabled: true,

            // ✅ 动画细节（更接近原生）
            animationDuration: 250,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="note/[noteId]" options={{ headerShown: false }} />
          <Stack.Screen
            name="message/[roomId]"
            options={{ headerShown: false }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SocketProvider>
  );
}
