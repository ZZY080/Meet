import { useEffect, useState } from "react";
import { Dimensions, Image, View } from "react-native";
interface NoteCarouselItemProps {
  url: string;
  isActive: boolean;
}
const NoteCarouselItem: React.FC<NoteCarouselItemProps> = ({
  url,
  isActive,
}) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    Image.getSize(
      url,
      (width, height) => {
        setImageSize({
          width: width,
          height: height,
        });
      },
      (error) => {
        console.log("error:", error);
      },
    );
  }, []);
  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight * 0.64,
      }}
    >
      <Image
        src={url}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "scale-down",
          backgroundColor: "#f3f3f7",
        }}
      />
    </View>
  );
};

export default NoteCarouselItem;
