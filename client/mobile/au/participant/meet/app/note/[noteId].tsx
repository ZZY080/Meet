import CustomIcon from "@components/Common/CustomIcon/CustomIcon";
import NavigateBack from "@components/Common/NavigateBack/NavigateBack";
import ImageList from "@components/Note/ImageList/ImageList";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NoteDetailScreen = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fcfcfd" }}
      edges={["top", "bottom"]}
    >
      <View className="flex-1 bg-[#fcfcfd]">
        {/* 顶部状态栏 */}
        <StatusBar translucent={true} style="dark" />
        <NavigateBack title="Event" />
        {/* 滚动内容 */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* 图片内容 */}
          <ImageList />
          {/* 标题 */}
          <Text className="mt-2.5 px-4 text-[18px] font-medium">
            Why do large companies tend to prioritize academic qualifications
            over actual ability when hiring?
          </Text>
          <Text className="mt-2.5 px-4 text-[15px] leading-7 pb-5 text-[#333]">
            In today’s competitive job market, it is often observed that large
            companies place significant emphasis on academic qualifications when
            selecting candidates. This practice has led to debates about whether
            degrees are valued more than real-world ability. While it may seem
            unfair at first glance, there are several practical reasons behind
            this phenomenon. First of all, efficiency plays a crucial role in
            large-scale recruitment. Big companies usually receive thousands,
            sometimes even tens of thousands, of applications for a single
            position. In such situations, it is nearly impossible for recruiters
            to carefully evaluate every candidate’s actual abilities in depth.
            Academic qualifications, especially degrees from well-known
            universities
          </Text>
          <View className="mt-2.5 px-4">
            <View className=" bg-white rounded-2xl p-4 shadow-md">
              {/* 时间 */}
              <View className="flex-row items-start mb-4 gap-4">
                <CustomIcon name="icon-location" color="#ff9150" size={30} />
                <Text className="text-[#232326] flex-1">
                  Saturday, Apr 4 · 7:00 PM to 9:00 PM PDT
                </Text>
                <Text></Text>
              </View>
              {/* 地点 */}
              <View className="flex-row items-start gap-4">
                <CustomIcon name="icon-calendar" color="#ff89af" size={30} />
                <Text className="text-[#232326] flex-1">
                  Secret Restaurant Location in Downtown/Yaletown/Eastside W
                  Georgia St, Vancouver, BC V6B 4P4, Canada · Vancouver, BC
                </Text>
                <Text></Text>
              </View>
            </View>
          </View>
          <View className="mt-2.5 flex-row items-center gap-1.5 px-4 pb-5">
            <Text className="text-[12px] text-[#33333399]">昨天</Text>
            <Text className="text-[12px] text-[#33333399]">12:30</Text>
            <Text className="text-[12px] text-[#33333399]">福建</Text>
          </View>
          <View className="px-4">
            <View className="h-[0.4px] bg-[#eee]"></View>
          </View>
        </ScrollView>
        {/* 底部内容 */}
        <View className="bg-white px-4.25 py-2 border-t-[0.4px] border-[#ebebeb]">
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 text-black bg-[#f7f7f7] h-10 text-[16px] rounded-2xl px-4"
              placeholderTextColor="#999"
              placeholder="请输入"
            />
            <View className="ml-5 flex-row items-center justify-center gap-4.25">
              <Pressable
                className="flex-row items-center"
                onPress={() => setIsLiked(!isLiked)}
              >
                <CustomIcon
                  name={isLiked ? "icon-heart-fill" : "icon-heart"}
                  size={25}
                  color={isLiked ? "red" : "gray"}
                />
                <Text className="ml-1.5 text-[10px]">100</Text>
              </Pressable>
              <Pressable
                className="flex-row items-center"
                onPress={() => setIsFavorited(!isFavorited)}
              >
                <CustomIcon
                  name={isFavorited ? "icon-favorite-fill" : "icon-favorite"}
                  size={isFavorited ? 26 : 26}
                  color={isFavorited ? "#ffb62f" : "gray"}
                />
                <Text className="ml-1.5 text-[10px]">100</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NoteDetailScreen;
