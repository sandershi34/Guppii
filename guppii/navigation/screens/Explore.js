import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  PanResponder,
} from "react-native";
import Swiper from "react-native-swiper";

export default function Explore({ navigation }) {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const Users = [
    { id: 1, url: require("guppii/assets/img1.jpg") },
    { id: 2, url: require("guppii/assets/img2.jpg") },
    { id: 3, url: require("guppii/assets/img3.jpg") },
    // Add more cards as needed
  ];

  const position = new Animated.ValueXY();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
          position.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderRelease: (evt, gestureState) => {
          // Handle release logic here
        },
      }),
    []
  );

  const renderUsers = () => {
    return Users.map((item, i) => {
      return (
        <Animated.View
          {...panResponder.panHandlers}
          key={item.id}
          style={[
            { transform: position.getTranslateTransform() },
            {
              height: screenHeight - 200,
              width: screenWidth,
              padding: 10,
              position: "absolute",
            },
          ]}
        >
          <Image
            style={{
              flex: 1,
              height: null,
              width: null,
              resizeMode: "cover",
              borderRadius: 20,
            }}
            source={item.url}
          />
        </Animated.View>
      );
    }).reverse();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 10 }}></View>
      <View style={{ flex: 1 }}>{renderUsers()}</View>
      <View style={{ height: 60 }}></View>
    </View>
  );
}
