import CustomIcon from "@components/Common/CustomIcon/CustomIcon";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const HeaderSearch: React.FC = () => {
  return (
    <View style={styles.headerWrapper}>
      {/* 左侧搜索框 */}
      <View style={styles.searchContainer}>
        <CustomIcon name="icon-search" size={20} color="#8e8e93" />
        <TextInput
          placeholder="Search events or groups..."
          placeholderTextColor="#8e8e93"
          style={styles.input}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff", // 浅灰色背景
    borderRadius: 25,
    height: 44,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  searchIcon: {},
  input: {
    marginLeft: 12,
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  filterButton: {
    marginLeft: 6,
    position: "relative",
    padding: 5,
  },
});

export default HeaderSearch;
