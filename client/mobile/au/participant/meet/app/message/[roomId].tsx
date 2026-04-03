import CustomIcon from "@/components/Common/CustomIcon/CustomIcon";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  Keyboard,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const currentUserId = "u1";

/** =======================
 * Mock 数据
 ======================= */
const initialMessages = [
  {
    id: "1",
    text: "在干嘛呢，有没有在想我呀",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:01",
  },
  {
    id: "2",
    text: "刚忙完，正准备找你",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:02",
  },
  {
    id: "3",
    text: "真的假的呀，是不是又在敷衍我",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:03",
  },
  {
    id: "4",
    text: "怎么可能，我一直在等你消息",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:04",
  },
  {
    id: "5",
    text: "那你有没有想我一点点",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:05",
  },
  {
    id: "6",
    text: "不止一点点，是很多很多",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:06",
  },
  {
    id: "7",
    text: "那你今天有没有乖乖的",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:07",
  },
  {
    id: "8",
    text: "没有你监督，我有点不太乖",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:08",
  },
  {
    id: "9",
    text: "那我要好好管你了",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:09",
  },
  {
    id: "10",
    text: "我等你管我呀",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:10",
  },
  {
    id: "11",
    text: "你今天是不是又熬夜了",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:11",
  },
  {
    id: "12",
    text: "有一点点，不过是因为在想你",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:12",
  },
  {
    id: "13",
    text: "嘴这么甜，是不是偷偷练过",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:13",
  },
  {
    id: "14",
    text: "只对你一个人这样",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:14",
  },
  {
    id: "15",
    text: "那我是不是有点特别",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:15",
  },
  {
    id: "16",
    text: "是我最特别的那一个",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:16",
  },
  {
    id: "17",
    text: "今天有点累，但看到你消息就好了",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:17",
  },
  {
    id: "18",
    text: "那我每天都来陪你聊天",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:18",
  },
  {
    id: "19",
    text: "你是不是有点太会哄人了",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:19",
  },
  {
    id: "20",
    text: "只对你有耐心",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:20",
  },
  {
    id: "21",
    text: "那你现在在想什么",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:21",
  },
  {
    id: "22",
    text: "在想什么时候能见到你",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:22",
  },
  {
    id: "23",
    text: "那你要快点安排",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:23",
  },
  {
    id: "24",
    text: "我已经在计划了",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:24",
  },
  {
    id: "25",
    text: "那我就等你啦",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:25",
  },
  {
    id: "26",
    text: "一定不会让你等太久",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:26",
  },
  {
    id: "27",
    text: "你今天有想我几次",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:27",
  },
  {
    id: "28",
    text: "数不清了，每一刻都有",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:28",
  },
  {
    id: "29",
    text: "你这样说我会当真的",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:29",
  },
  {
    id: "30",
    text: "那就当真吧",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:30",
  },
  {
    id: "31",
    text: "你今天心情好吗",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:31",
  },
  {
    id: "32",
    text: "因为有你，所以很好",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:32",
  },
  {
    id: "33",
    text: "你是不是越来越会说话了",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:33",
  },
  {
    id: "34",
    text: "因为是和你聊天",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:34",
  },
  {
    id: "35",
    text: "那你今晚会早点睡吗",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:35",
  },
  {
    id: "36",
    text: "如果你陪我聊一会，我就早点睡",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:36",
  },
  {
    id: "37",
    text: "那我陪你",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:37",
  },
  {
    id: "38",
    text: "有你在就不孤单",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:38",
  },
  {
    id: "39",
    text: "晚点一起睡个好觉吧",
    userId: "u1",
    avatar:
      "https://img2.baidu.com/it/u=4218304489,1218556120&fm=253&fmt=auto&app=138&f=JPEG?w=518&h=500",
    time: "21:39",
  },
  {
    id: "40",
    text: "嗯，等你说晚安",
    userId: "u2",
    avatar:
      "https://img2.baidu.com/it/u=2243626577,2675605533&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
    time: "21:40",
  },
];

/** =======================
 * 消息 Item（性能优化：memo）
 ======================= */
const MessageItem = React.memo(({ item }) => {
  const isMe = item.userId === currentUserId;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: isMe ? "row-reverse" : "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        columnGap: 8,
        marginBottom: 10,
        paddingHorizontal: 12,
      }}
    >
      {/* 头像 */}
      <Image
        style={{ width: 32, height: 32, borderRadius: 16 }}
        source={{
          uri: item.avatar,
        }}
      />
      <View
        style={{
          maxWidth: "75%",
          padding: 10,
          borderRadius: 12,
          backgroundColor: isMe ? "#007AFF" : "#eee",
        }}
      >
        <Text style={{ color: isMe ? "#fff" : "#000" }}>{item.text}</Text>

        <Text
          style={{
            fontSize: 10,
            marginTop: 4,
            color: isMe ? "#aaa" : "#666",
            textAlign: isMe ? "right" : "left",
          }}
        >
          {item.time}
        </Text>
      </View>
    </View>
  );
});

const MessageDetailScreen = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const router = useRouter();

  const flatListRef = useRef(null);
  const handleBack = () => {
    router.back();
  };

  // 键盘高度
  const keyboardHeight = useRef(new Animated.Value(0)).current;

  /** =======================
   * 滚动到底部
   ======================= */
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    });
  }, []);

  /** =======================
   * 发送消息
   ======================= */
  const sendMessage = useCallback(() => {
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      text: input,
      userId: currentUserId,
      time: new Date().toLocaleTimeString().slice(0, 5),
      avatar:
        currentUserId === "u1"
          ? "https://img2.baidu.com/it/u=3029837478,1144772205&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500"
          : "https://reactnative.dev/img/tiny_logo.png",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    requestAnimationFrame(() => {
      scrollToBottom();
    });
  }, [input, scrollToBottom]);

  /** =======================
   * 键盘监听
   ======================= */
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      Animated.timing(keyboardHeight, {
        toValue: e.endCoordinates.height,
        duration: 250,
        useNativeDriver: false,
      }).start();

      requestAnimationFrame(() => {
        scrollToBottom();
      });
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [keyboardHeight, scrollToBottom]);

  /** =======================
   * 首次进入滚动到底部
   ======================= */
  useEffect(() => {
    requestAnimationFrame(() => {
      scrollToBottom();
    });
  }, [scrollToBottom]);

  /** =======================
   * renderItem（useCallback 优化）
   ======================= */
  const renderItem = useCallback(({ item }) => {
    return <MessageItem item={item} />;
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      edges={["top", "bottom"]}
    >
      <StatusBar style="dark" />

      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 6,
            paddingVertical: 6,
            borderBottomWidth: 1,
            borderColor: "#eee",
          }}
        >
          <View className="flex-row items-center">
            <Pressable onPress={handleBack}>
              <CustomIcon name="icon-back" color="#000" size={30} />
            </Pressable>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://hellorfimg.zcool.cn/provider_image/large/hi2246794331.jpg?x-image-process=image/format,webp",
              }}
            />
            <Text className="text-[16px] ml-1.5">美玉</Text>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingVertical: 10,
          }}
          // ✅ 性能优化参数
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews
          onLayout={() => {
            scrollToBottom();
          }}
        />

        {/* Input */}
        <Animated.View
          style={{
            marginBottom: keyboardHeight,
            borderTopWidth: 1,
            borderColor: "#eee",
            padding: 8,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
            paddingBottom: Platform.OS === "ios" ? 8 : 8,
          }}
        >
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="输入消息..."
            style={{
              flex: 1,
              backgroundColor: "#f2f2f2",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              marginRight: 8,
            }}
          />

          <TouchableOpacity
            onPress={sendMessage}
            style={{
              backgroundColor: "#007AFF",
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#fff" }}>发送</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default MessageDetailScreen;
