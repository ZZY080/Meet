import MessageItem from "@components/Message/MessageItem/MessageItem";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MessageScreen = () => {
  const [data, setData] = useState<
    {
      id: number;
      avatar: string;
      title: string;
      time: string;
      msg: string;
      roomId: number;
    }[]
  >([
    {
      id: 1,
      avatar:
        "https://img2.baidu.com/it/u=3029837478,1144772205&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
      title: "Kenny",
      time: "2026/03/27",
      msg: "那就换一个服务",
      roomId: 1,
    },
  ]);

  // ✅ renderItem 用 useCallback 缓存
  const renderItem = useCallback(
    ({
      item,
    }: {
      item: {
        id: number;
        avatar: string;
        title: string;
        time: string;
        msg: string;
        roomId: number;
      };
    }) => {
      return <MessageItem message={item} />;
    },
    [],
  );

  // ✅ keyExtractor 正确写法
  const keyExtractor = useCallback(
    (item: {
      id: number;
      avatar: string;
      title: string;
      time: string;
      msg: string;
      roomId: number;
    }) => item.id.toString(),
    [],
  );
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f9f9f9" }}
      edges={["top"]}
    >
      <View className="flex-1">
        <StatusBar translucent={true} style="dark" />
        <View className="flex-1">
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10, flex: 1 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MessageScreen;
