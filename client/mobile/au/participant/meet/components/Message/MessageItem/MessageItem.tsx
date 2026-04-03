import { useRouter } from "expo-router";
import { memo, useCallback } from "react";
import { Image, Pressable, Text, View } from "react-native";

interface MessageItemProps {
  message: {
    id: number;
    avatar: string;
    title: string;
    time: string;
    msg: string;
    roomId: number;
  };
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const router = useRouter();

  // ✅ 跳转函数缓存
  const handleDetail = useCallback(
    (roomId: number) => {
      router.push({
        pathname: "/message/[roomId]",
        params: { roomId },
      });
    },
    [message.roomId],
  );
  return (
    <Pressable
      onPress={() => handleDetail(message.roomId)}
      className="px-[4px] mb-[2px]"
    >
      <View className="flex-row  rounded-[10px] px-[10px] py-[5px]">
        {/* Avatar */}
        <Image
          source={{
            uri: "https://img2.baidu.com/it/u=3029837478,1144772205&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
          }}
          className="w-12.5 h-12.5 rounded-full mr-1.25"
        />

        {/* Info */}
        <View className="flex-1">
          {/* Name + Time */}
          <View className="flex-row">
            <Text className="flex-1 text-[14px]">{message.title}</Text>
            <Text className="text-[10px]">{message.time}</Text>
          </View>

          {/* Message + Count */}
          <View className="flex-row mt-2.5">
            <Text className="flex-1">{message.msg}</Text>
            <Text>1</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default memo<typeof MessageItem>(MessageItem);
