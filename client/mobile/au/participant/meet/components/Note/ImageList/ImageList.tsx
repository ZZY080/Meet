import ImageListItem from "@components/Note/ImageListItem/ImageListItem";
import { memo, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

const ImageList = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  // 图片内容
  const [imageList, setImageList] = useState<
    {
      id: string;
      url: string;
    }[]
  >([
    {
      id: "1",
      url: "https://secure.meetupstatic.com/photos/event/e/0/5/6/highres_532917430.webp?w=640",
    },
    {
      id: "2",
      url: "https://sns-webpic-qc.xhscdn.com/202603301109/f90c525f8026959f26026ac2344dd1fa/spectrum/1040g0k031u22sgrkgs005nnsdpj08rd1180hqeo!nc_n_webp_mw_1",
    },
    {
      id: "3",
      url: "https://sns-webpic-qc.xhscdn.com/202603301109/c3b69705148f86b67f46a016de633ca9/notes_pre_post/1040g3k031u4eubqa2i1g48rmolbf0263a9g3u90!nc_n_webp_mw_1",
    },
    {
      id: "4",
      url: "https://sns-webpic-qc.xhscdn.com/202603301109/06a33f5de9b66cd2ece8568b3e86dcb1/1040g00831t737fqnm2004bun0938p4sq1c0t110!nc_n_webp_mw_1",
    },
  ]);
  // 当前播放的页面索引
  const [currentIndex, setCurrentIndex] = useState(0);
  // 页面切换事件
  const onPageSelected = (e: { nativeEvent: { position: number } }) => {
    const newIndex: number = e.nativeEvent.position;
    setCurrentIndex(newIndex);
  };
  return (
    <View style={styles.ImageListWrapper}>
      <View style={styles.ImageListMain}>
        <PagerView
          style={{
            width: windowWidth,
            height: windowHeight * 0.64,
          }}
          orientation={"horizontal"}
          onPageSelected={onPageSelected}
        >
          {imageList.map((item, index) => {
            return (
              <ImageListItem
                key={item.id}
                url={item.url}
                isActive={index === currentIndex}
              />
            );
          })}
        </PagerView>
        <View style={styles.CountWrapper}>
          <Text style={styles.CountMain}>
            {currentIndex + 1}/{imageList.length}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ImageListWrapper: {
    marginTop: 0,
  },
  ImageListMain: {
    position: "relative",
  },
  CountWrapper: {
    position: "absolute",
    top: 5,
    right: 10,
    zIndex: 10,
  },
  CountMain: {
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 10,
    color: "white",
  },
});

export default memo<typeof ImageList>(ImageList);
