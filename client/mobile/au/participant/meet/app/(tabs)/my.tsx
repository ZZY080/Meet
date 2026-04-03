import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyScreen() {
  const [location, setLocation] = useState<any>(null);
  const [address, setAddress] = useState<any>(null);

  useEffect(() => {
    (async () => {
      // 1️⃣ 请求权限
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("没有定位权限");
        return;
      }

      // 2️⃣ 获取位置
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      const { latitude, longitude } = loc.coords;

      // 3️⃣ 反向地理编码（获取地址）
      const geo = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log("反向地理编码结果:", geo);

      setAddress(geo[0]);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Text style={styles.title}>📍 定位信息</Text>

        {location ? (
          <>
            <Text>纬度: {location.coords.latitude}</Text>
            <Text>经度: {location.coords.longitude}</Text>
          </>
        ) : (
          <Text>正在获取定位...</Text>
        )}

        {address && (
          <View style={{ marginTop: 10 }}>
            <Text>国家: {address.country}</Text>
            <Text>城市: {address.city}</Text>
            <Text>区/县: {address.district}</Text>
            <Text>街道: {address.street}</Text>
            <Text>邮编: {address.postalCode}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
