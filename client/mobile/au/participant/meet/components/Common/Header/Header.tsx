import { Pressable, StyleSheet, Text, View } from "react-native";
interface HeaderProps {
  tabBarIndexType: {
    index: number;
    type: string;
  };
  setTabBarIndexType: (data: { index: number; type: string }) => void;
}
const Header: React.FC<HeaderProps> = ({
  tabBarIndexType,
  setTabBarIndexType,
}) => {
  const tabBarList = [
    {
      id: "1",
      desc: "Following",
      type: "attention",
    },
    {
      id: "2",
      desc: "Discover",
      type: "find",
    },
    {
      id: "3",
      desc: "California",
      type: "city",
    },
  ];

  const handleTabBarIndex = (index: number, type: string) => {
    setTabBarIndexType({ index: index, type: type });
  };

  return (
    <View style={styles.HeaderWrapper}>
      <View style={styles.HeaderMain}>
        <View style={styles.TabBar}>
          {tabBarList.map((item, index) => {
            return (
              <Pressable
                style={styles.TabItem}
                key={item.id}
                onPress={() => handleTabBarIndex(index, item.type)}
              >
                <Text style={styles.Text}>{item.desc}</Text>
                <View
                  style={{
                    ...styles.Bar,
                    backgroundColor:
                      tabBarIndexType.index === index
                        ? "#409EFF"
                        : "transpaent",
                  }}
                ></View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // 头部搜索
  HeaderWrapper: {
    borderBottomWidth: 0.4,
    borderBottomColor: "#e5e5e5",
  },
  HeaderMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  More: {},
  TabBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 30,
    flex: 1,
  },
  TabItem: {
    display: "flex",
    flexDirection: "column",
  },
  Text: {
    fontSize: 15,
    fontWeight: 800,
  },
  Bar: {
    marginTop: 5,
    width: "100%",
    height: 2,
    borderRadius: 10,
  },
  Search: {},
});

export default Header;
