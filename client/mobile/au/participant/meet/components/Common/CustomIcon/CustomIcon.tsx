import createIconSet from "@expo/vector-icons/createIconSet";
export const glyphMap = {
  // tab
  "home-fill": 58999,
  "post-fill": 58902,
  "message-fill": 58884,
  "my-fill": 58911,

  // 其他
  "icon-play": 59002,
  "icon-play-fill": 59215,
  "icon-heart": 59143,
  "icon-heart-fill": 59037,
  "icon-eye": 59137,
  "icon-back": 58988,
  "icon-share": 58919,
  "icon-favorite": 58890,
  "icon-favorite-fill": 58992,
  "icon-bookmark": 58921,
  "icon-bookmark-fill": 59057,
  "icon-search": 60016,
  "icon-filter": 58986,
  "icon-location": 59280,
  "icon-calendar": 58923,
};
interface CustomIconProps {
  name?: keyof typeof glyphMap;
  size?: number;
  color?: string;
}
const CustomIcon: React.FC<CustomIconProps> = ({
  name = "home-fill",
  size = 20,
  color = "white",
}) => {
  const CustomIcon = createIconSet(
    glyphMap,
    "iconfont",
    require("@assets/fonts/iconfont.ttf"),
  );
  return <CustomIcon name={name} size={size} color={color} />;
};

export default CustomIcon;
