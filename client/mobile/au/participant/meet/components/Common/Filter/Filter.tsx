import { useRef } from "react";
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

interface FilterProps {
  keywordIndex: number;
  setKeywordIndex: React.Dispatch<React.SetStateAction<number>>;
}

const screenWidth = Dimensions.get("window").width;

const Filter: React.FC<FilterProps> = ({ keywordIndex, setKeywordIndex }) => {
  const scrollRef = useRef<ScrollView>(null);

  // 👉 每个 item 的 x 位置
  const positions = useRef<number[]>([]).current;

  // 👉 underline 位移动画（只用 translateX，稳定）
  const translateX = useRef(new Animated.Value(0)).current;

  const keyWordList = [
    { id: "21", name: "All Events" },
    { id: "22", name: "Social Activities" },
    { id: "2", name: "Hobbies" },
    { id: "3", name: "Sports" },
    { id: "4", name: "Travel" },
    { id: "5", name: "Business" },
    { id: "6", name: "Tech" },
    { id: "7", name: "Community" },
    { id: "8", name: "Identity & language" },
    { id: "9", name: "Games" },
    { id: "10", name: "Dancing" },
    { id: "11", name: "Support" },
    { id: "12", name: "Music" },
    { id: "13", name: "Health" },
    { id: "14", name: "Art" },
    { id: "15", name: "Education" },
    { id: "16", name: "Animals" },
    { id: "17", name: "Religion" },
    { id: "18", name: "Writing" },
    { id: "19", name: "Family" },
    { id: "20", name: "Politics" },
  ];

  // 👉 点击
  const handlePress = (index: number) => {
    setKeywordIndex(index);

    const x = positions[index] || 0;

    // ✅ 自动居中
    scrollRef.current?.scrollTo({
      x: x - screenWidth / 2 + 60,
      animated: true,
    });

    // ✅ underline 动画（只用 translateX）
    Animated.spring(translateX, {
      toValue: x,
      useNativeDriver: true,
    }).start();
  };

  // 👉 记录位置
  const handleLayout = (index: number, e: LayoutChangeEvent) => {
    const x = e.nativeEvent.layout.x;
    positions[index] = x;

    // 初始化 underline
    if (index === keywordIndex) {
      translateX.setValue(x);
    }
  };

  return (
    <View className="bg-white py-2">
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        <View className="flex-row items-center space-x-3">
          {keyWordList.map((item, index) => {
            const isActive = keywordIndex === index;

            return (
              <Pressable
                key={item.id}
                onPress={() => handlePress(index)}
                onLayout={(e) => handleLayout(index, e)}
                className={`px-4 py-2 rounded-full mr-2 ${
                  isActive ? "bg-black" : "bg-gray-100 border border-gray-200"
                }`}
                style={({ pressed }) => ({
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                })}
              >
                <Text
                  className={`text-sm ${
                    isActive ? "text-white font-semibold" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Filter;
