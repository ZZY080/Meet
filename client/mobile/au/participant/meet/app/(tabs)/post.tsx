import { StyleSheet, Text, View } from "react-native";

export default function PostScreen() {
  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
