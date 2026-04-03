import { Note } from "@/type/Note/Note";
import CustomIcon from "@components/Common/CustomIcon/CustomIcon";
import { useRouter } from "expo-router";
import { memo, useCallback } from "react";
import { Image, Pressable, Text, View } from "react-native";

interface NoteItemProps {
  note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const router = useRouter();

  // 跳转到详情页
  const handleDetail = useCallback((productType: string) => {
    if (productType === "short_video" || productType === "image_text") {
      router.push({
        pathname: "/note/[noteId]",
        params: { noteId: "1" },
      });
    }
  }, []);
  // 点赞状态切换
  const handleLikeToggle = useCallback((itemOuter: any) => {
    // setItemData((preData: any) => {
    //   return {
    //     ...preData,
    //     likes: preData.isLiked ? preData.likes - 1 : preData.likes + 1,
    //     isLiked: !preData.isLiked,
    //   };
    // });
    // 异步更新到后端
    // updateLikeStatus(item.id, !item.isLiked, item.type);
  }, []);
  return (
    <View
      style={{
        overflow: "hidden",
        backgroundColor: "#ffffff",
        paddingBottom: 10,
        borderRadius: 10,
      }}
    >
      {/* 封面 */}
      <Pressable
        onPress={() => handleDetail(note.type)}
        className="relative w-full rounded-t-md overflow-hidden"
        style={{
          height: 160,
        }}
      >
        <Image className="w-full h-full" src={note.cover.url} />
        <Text className="absolute top-1.25 left-1.25 bg-black/40 px-1.25 py-1.25 rounded-[10px] text-white text-[9px]">
          北京大学
        </Text>
        {note.type === "short_video" && (
          <View className="absolute top-2.5 right-2.5 bg-black/40 w-5 h-5 items-center justify-center rounded-[10px]">
            <CustomIcon name="icon-play-fill" size={12} color="white" />
          </View>
        )}
        <Text className="absolute bottom-1.25 right-1.25 bg-black/40 px-1.25 py-0.5 rounded-[10px] text-white text-[9px]">
          03:14
        </Text>
      </Pressable>
      {/* 标题 */}
      <Text
        className="mt-2.5 px-1 text-[12px]"
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {note.title}
      </Text>
      {/* 用户 点赞 */}
      <View className="w-full mt-2.5 flex-row items-center px-1">
        {/* 用户 */}
        <View className="flex-1 flex-row items-center">
          <Image
            className="w-5 h-5 rounded-[10px] mr-1.25"
            src="https://q3.itc.cn/q_70/images03/20250110/1e71eecf56b34344bcae6a5b85c0bec2.jpeg"
          />
          <Text className="">{note.user.name}</Text>
        </View>
        {/* 点赞 */}
        <Pressable
          className="flex-row items-center gap-0.75"
          onPress={() => handleLikeToggle(note)}
        >
          <CustomIcon
            name={note.isLiked ? "icon-heart-fill" : "icon-heart"}
            size={16}
            color={note.isLiked ? "red" : "gray"}
          />
          <Text className="text-[10px]">{note.likes}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default memo<typeof NoteItem>(NoteItem);
