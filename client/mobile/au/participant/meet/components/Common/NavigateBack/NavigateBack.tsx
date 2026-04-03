import CustomIcon from "@components/Common/CustomIcon/CustomIcon";
import { useRouter } from "expo-router";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface NavigateBackProps {
  title?: string;
}

const NavigateBack: React.FC<NavigateBackProps> = ({ title = "Event" }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 返回按钮 */}
      <TouchableOpacity
        style={styles.roundButton}
        onPress={() => router.back()}
      >
        <CustomIcon name="icon-back" color="#333" size={28} />
      </TouchableOpacity>

      {/* 标题 */}
      <Text style={styles.title}>{title}</Text>

      {/* 右侧功能组 */}
      <View style={styles.rightGroup}>
        <TouchableOpacity>
          <CustomIcon name="icon-share" color="#333" size={16} />
        </TouchableOpacity>

        {/* 收藏按钮 (对应图片中的紫色书签) */}
        <TouchableOpacity>
          <CustomIcon name="icon-bookmark" color="#7B61FF" size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "transparent", // 如果需要和图片一样悬浮在图片上，设为透明
    position: "relative",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    zIndex: 0, // 确保标题在按钮下方
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    // 阴影设置
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
    zIndex: 1, // 确保按钮在标题上方
  },
  rightGroup: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 24,
    // 阴影设置
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default NavigateBack;
