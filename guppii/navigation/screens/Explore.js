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
    {
      id: 1,
      url: require("guppii/assets/img1.jpg"),
      name: "Hamed Deres",
      about: "i like dogs",
    },
    {
      id: 2,
      url: require("guppii/assets/img2.jpg"),
      name: "Cathy Deifne",
      about: "i like cats",
    },
    {
      id: 3,
      url: require("guppii/assets/img3.jpg"),
      name: "Loel Kenzo",
      about: "i like cars",
    },
    {
      id: 4,
      url: require("guppii/assets/img4jpg"),
      name: "Chad Hui",
      about: "i like code",
    },
    {
      id: 5,
      url: require("guppii/assets/img5.jpg"),
      name: "Nick Cool",
      about: "i like beans",
    },
    {
      id: 6,
      url: require("guppii/assets/img6.jpg"),
      name: "Victor E. Bull",
      about: "i like pokemon",
    },
    {
      id: 7,
      url: require("guppii/assets/img7.jpg"),
      name: "Daniel Nava",
      about: "i like C sharp",
    },
    {
      id: 8,
      url: require("guppii/assets/img8.jpg"),
      name: "Cathy Ko",
      about: "i like pizza",
    },
    {
      id: 9,
      url: require("guppii/assets/img9.jpg"),
      name: "Alex Brands",
      about: "i like cheese",
    },
    {
      id: 10,
      url: require("guppii/assets/img10.jpg"),
      name: "Bobby Boe",
      about: "i like diamonds",
    },
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
          if (gestureState.dx > 120) {
            Animated.spring(position, {
              toValue: { x: screenWidth + 100, y: gestureState.dy },
              useNativeDriver: false,
            }).start(() => {
              setCurrentIndex(currentIndex + 1); // Update currentIndex using setCurrentIndex
              position.setValue({ x: 0, y: 0 });
            });
          } else if (gestureState.dx < -120) {
            Animated.spring(position, {
              toValue: { x: -screenWidth - 100, y: gestureState.dy },
              useNativeDriver: false,
            }).start(() => {
              setCurrentIndex(currentIndex + 1); // Update currentIndex using setCurrentIndex
              position.setValue({ x: 0, y: 0 });
            });
          }
        },
      }),
    [currentIndex, position, screenWidth]
  );

  const renderUsers = () => {
    return Users.map((item, i) => {
      if (i < currentIndex || i - currentIndex > 1) {
        return null;
      } else if (i == currentIndex) {
        return (
          <Animated.View
            {...panResponder.panHandlers}
            key={item.id}
            style={[
              { transform: position.getTranslateTransform() },
              {
                height: screenHeight - 250,
                width: screenWidth,
                padding: 10,
                position: "absolute",
              },
            ]}
          >
            <Animated.View
              style={{
                position: "absolute",
                top: 50,
                left: 40,
                zIndex: 1000,
              }}
            ></Animated.View>

            <Animated.View
              style={{
                position: "absolute",
                top: 50,
                left: 40,
                zIndex: 1000,
              }}
            ></Animated.View>

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
            <Text style={styles.cardText}>{item.name}</Text>
            <Text style={styles2.cardText}>{item.about}</Text>
          </Animated.View>
        );
      } else {
        return (
          <Animated.View
            key={item.id}
            style={[
              {
                height: screenHeight - 250,
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
            <Text style={styles.cardText}>{item.name}</Text>
            <Text style={styles2.cardText}>{item.about}</Text>
          </Animated.View>
        );
      }
    }).reverse();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 10 }}></View>
      <View style={{ flex: 1 }}>{renderUsers()}</View>
      <View style={{ height: 60 }}></View>

      <Text
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          color: "green",
          fontSize: 24,
          fontWeight: "800",
          padding: 10,
        }}
      >
        Recruit Him! &rarr;
      </Text>
      <Text
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          color: "red",
          fontSize: 24,
          fontWeight: "800",
          padding: 10,
        }}
      >
        &larr; Not Now
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    bottom: 100,
    left: 10,
    padding: 10,
  },
});

const styles2 = StyleSheet.create({
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    bottom: 50,
    left: 10,
    padding: 10,
  },
});
