import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

import Filter from "@components/Common/Filter/Filter";
import HeaderSearch from "@components/Common/HeaderSearch/HeaderSearch";
import NoteItem from "@components/Note/NoteItem/NoteItem";
import { Note } from "@type/Note/Note";
import { SafeAreaView } from "react-native-safe-area-context";

const IndexScreen = () => {
  // 屏幕宽度
  const windowWidth = Dimensions.get("window").width;
  const [tabBarIndexType, setTabBarIndexType] = useState<{
    index: number;
    type: string;
  }>({
    index: 1,
    type: "find",
  });
  const [keywordIndex, setKeywordIndex] = useState<number>(0);
  const [listData, setListData] = useState<Note[]>([
    {
      id: "1",
      cover: {
        url: "https://secure.meetupstatic.com/photos/event/5/c/5/b/highres_517583643.jpeg",
        width: 600,
        height: 338,
      },
      brand: "徒步",
      title: "🍹🌇 Afterwork: Sips & Social Evening Meetup",
      price: 40,
      type: "short_video",
      user: {
        user_id: "123232",
        avatar:
          "https://img2.baidu.com/it/u=3585077795,3954743940&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800",
        name: "kenny",
      },

      likes: 1231,
      isLiked: false,
      sold: 10000,
    },
    {
      id: "2",
      cover: {
        url: "https://secure-content.meetupstatic.com/images/classic-events/502420899/600x324.jpg?w=600?w=640",
        width: 600,
        height: 324,
      },
      brand: "Psychology",
      title: "Asianati: Cincinnati Asian Food and Culture Meetup Group",
      price: 236,
      type: "image_text",
      user: {
        user_id: "123232",
        avatar:
          "https://img2.baidu.com/it/u=3585077795,3954743940&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800",
        name: "Koji Sado ",
      },
      likes: 8923,
      isLiked: false,
      sold: 3890,
    },
    {
      id: "3",
      cover: {
        url: "https://secure.meetupstatic.com/photos/event/5/d/6/e/highres_531623918.jpeg",
        width: 1920,
        height: 1080,
      },
      brand: "Psychology",
      title:
        "Asianati Meetup: All About Green Tea, From Whole Leaves to Matcha",
      price: 600,
      type: "image_text",
      user: {
        user_id: "123232",
        avatar:
          "https://img2.baidu.com/it/u=3585077795,3954743940&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800",
        name: "kenny",
      },
      likes: 5123,
      isLiked: false,
      sold: 7689,
    },
    {
      id: "4",
      cover: {
        url: "https://secure.meetupstatic.com/photos/event/a/7/6/c/highres_530982860.jpeg",
        width: 1920,
        height: 1080,
      },
      brand: "Psychology",
      title: "Asianati Meetup: Food Truck Pop-Up, Mixer and Theatre",
      price: 8790,
      type: "image_text",
      user: {
        user_id: "123232",
        avatar:
          "https://img2.baidu.com/it/u=3585077795,3954743940&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800",
        name: "kenny",
      },
      likes: 1243,
      isLiked: false,
      sold: 1232,
    },
    {
      id: "5",
      cover: {
        url: "https://secure.meetupstatic.com/photos/event/7/a/7/5/highres_532471349.jpeg",
        width: 2000,
        height: 1125,
      },
      brand: "Psychology",
      title: "Life Skills No One Taught Us: The Essentials Part 2",
      price: 2000,
      type: "image_text",
      user: {
        user_id: "123232",
        avatar:
          "https://img2.baidu.com/it/u=3585077795,3954743940&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800",
        name: "kenny",
      },
      likes: 978,
      isLiked: false,
      sold: 13420,
    },
    {
      id: "6",
      cover: {
        url: "https://secure.meetupstatic.com/photos/event/a/f/a/f/highres_531164975.jpeg",
        width: 280,
        height: 158,
      },
      brand: "Psychology",
      title: "“Just Want to Talk with Someone?” — Phone/Zoom by Joe Mohammed",
      price: 70,
      type: "image_text",
      user: {
        user_id: "123232",
        avatar:
          "https://img2.baidu.com/it/u=3585077795,3954743940&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800",
        name: "kenny",
      },
      likes: 14523,
      isLiked: false,
      sold: 8909,
    },
    {
      id: "7",
      cover: {
        url: "https://secure.meetupstatic.com/photos/event/6/8/6/7/highres_527546727.jpeg",
        width: 1140,
        height: 810,
      },
      brand: "Psychology",
      title: "Business Owners Best Practices",
      price: 70,
      type: "image_text",
      user: {
        user_id: "123232",
        avatar:
          "https://img2.baidu.com/it/u=3585077795,3954743940&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800",
        name: "kenny",
      },
      likes: 14323,
      isLiked: false,
      sold: 8909,
    },
    {
      id: "8",
      cover: {
        url: "https://secure.meetupstatic.com/photos/event/d/7/d/c/highres_518815260.webp?w=640",
        width: 473,
        height: 266,
      },
      brand: "Psychology",
      title:
        "“Free Income Tax & Accounting Help Hour-Phone Consultation Only with Joe Mohammed",
      price: 70,
      type: "image_text",
      user: {
        user_id: "123232",
        avatar:
          "https://img2.baidu.com/it/u=3585077795,3954743940&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800",
        name: "kenny",
      },
      likes: 65123,
      isLiked: false,
      sold: 8909,
    },
    {
      id: "45",
      cover: {
        url: "https://secure.meetupstatic.com/photos/event/3/6/4/1/clean_532813889.webp",
        width: 1024,
        height: 576,
      },
      brand: "Psychology",
      title:
        "“Free Income Tax & Accounting Help Hour-Phone Consultation Only with Joe Mohammed",
      price: 70,
      type: "image_text",
      user: {
        user_id: "123232",
        avatar:
          "https://img2.baidu.com/it/u=3585077795,3954743940&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800",
        name: "kenny",
      },
      likes: 65123,
      isLiked: false,
      sold: 8909,
    },
  ]);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [q, setQ] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false); // 是否刷新
  const [hasMore, setHasMore] = useState<boolean>(true);
  const onRefresh = () => {
    setRefreshing(true);
    setHasMore(true);
    setPage(1);
  };
  const onEndReached = () => {
    if (hasMore) {
      setPage(page + 1);
      setLoadingMore(true);
    }
  };
  // 渲染加载指示器
  const renderFooter = () => {
    if (loadingMore) {
      return <ActivityIndicator size="small" color="#FC274B" />;
    }
    if (!hasMore) {
      return (
        <Text style={{ textAlign: "center", paddingVertical: 15 }}>
          没有更多数据
        </Text>
      );
    }
    return null;
  };
  // 获得文档
  // const getDocumentList = async () => {
  //   setLoading(true);
  //   try {
  //     let url = `${DOCUMENT}?page=${page}&perPage=${pageSize}`;
  //     if (q.trim().length > 0) {
  //       url += `&q=${q}`;
  //     }
  //     if (serviceCategoryId.length > 0) {
  //       url += `&serviceCategoryId=${serviceCategoryId}`;
  //     }
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "accept-language": LOCALES_MAP[lang],
  //         ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}),
  //       },
  //     });
  //     const json = await response.json();
  //     if (response.ok) {
  //       const items = json.payload.items;
  //       setDocumentList(items);
  //     }
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // 下拉刷新数据
  // const onRefreshDocumentList = async () => {
  //   try {
  //     let url = `${DOCUMENT}?page=${page}&perPage=${pageSize}`;
  //     if (q.trim().length > 0) {
  //       url += `&q=${q}`;
  //     }
  //     if (serviceCategoryId.length > 0) {
  //       url += `&serviceCategoryId=${serviceCategoryId}`;
  //     }
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "accept-language": LOCALES_MAP[lang],
  //         ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}),
  //       },
  //     });
  //     const json = await response.json();
  //     if (response.ok) {
  //       const items = json.payload.items;
  //       setDocumentList(items);
  //     }
  //   } catch (error) {
  //   } finally {
  //     setRefreshing(false);
  //   }
  // };
  // // 上拉加载数据
  // const onEndReachedDocumentList = async () => {
  //   try {
  //     let url = `${DOCUMENT}?page=${page}&perPage=${pageSize}`;
  //     if (q.trim().length > 0) {
  //       url += `&q=${q}`;
  //     }
  //     if (serviceCategoryId.length > 0) {
  //       url += `&serviceCategoryId=${serviceCategoryId}`;
  //     }
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "accept-language": LOCALES_MAP[lang],
  //         ...(accessToken ? { Authorization: "Bearer " + accessToken } : {}),
  //       },
  //     });
  //     const json = await response.json();
  //     if (response.ok) {
  //       const items = json.payload.items;
  //       // 如果数据不足,说明没有更多数据了
  //       if (items.length < pageSize) {
  //         setHasMore(false);
  //       }
  //       setDocumentList((preData) => {
  //         return [...preData, ...items];
  //       });
  //     }
  //   } catch (error) {
  //   } finally {
  //     setLoadingMore(false);
  //   }
  // };
  useEffect(() => {
    // getCategoryList();
  }, []);
  // useEffect(() => {
  //   if (page === 1 && hasMore) {
  //     // getDocumentList();
  //   }
  // }, [q, serviceCategoryId, page, hasMore]);
  useEffect(() => {
    if (refreshing && page === 1) {
      // onRefreshDocumentList();
    }
  }, [refreshing, page, hasMore]);
  useEffect(() => {
    if (page > 1 && loadingMore) {
      // onEndReachedDocumentList();
    }
  }, [page, loadingMore]);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#feffff" }}
      edges={["top"]}
    >
      {/* 顶部状态栏 */}
      <StatusBar translucent={true} style="dark" />
      <View className="flex-1">
        {/* 头部 */}
        <HeaderSearch />
        {/* 筛选 */}
        <Filter keywordIndex={keywordIndex} setKeywordIndex={setKeywordIndex} />
        {/* 滚动内容 */}
        {/* 瀑布流 */}
        <FlatList
          contentContainerStyle={{
            // flex: 1,
            flexGrow: 1,
            paddingHorizontal: 5,
          }}
          data={listData}
          keyExtractor={(item) => item.id}
          renderItem={useCallback(({ item }: { item: Note }) => {
            return <NoteItem note={item} />;
          }, [])}
          numColumns={1}
          // 性能核心
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          removeClippedSubviews
          // 滚动
          onEndReached={onEndReached} //触底时触发
          onEndReachedThreshold={0.1} // 触发时机为到达底部10%时
          // 下拉刷新
          refreshing={refreshing}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#FC274B"]}
              progressBackgroundColor="#ffffff" // 背景色
            />
          }
          // UI
          ItemSeparatorComponent={() => {
            return <View className="w-full h-2.5"></View>;
          }}
          ListEmptyComponent={() => {
            return <View>Empty</View>;
          }}
          ListFooterComponent={renderFooter} // 底部加载组件
        />
      </View>
    </SafeAreaView>
  );
};

export default IndexScreen;
