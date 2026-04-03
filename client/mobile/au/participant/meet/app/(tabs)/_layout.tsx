import CustomIcon from "@components/Common/CustomIcon/CustomIcon";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FC274B", // 激活颜色
        tabBarInactiveTintColor: "#A1A1AA", // 默认颜色
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <CustomIcon size={28} name="home-fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: "Post",
          tabBarIcon: ({ color }) => (
            <CustomIcon size={28} name="post-fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: "Message",
          tabBarIcon: ({ color }) => (
            <CustomIcon size={28} name="message-fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: "My",
          tabBarIcon: ({ color }) => (
            <CustomIcon size={28} name="my-fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
