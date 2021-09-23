import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const boxSize = 35;

interface Loading {
  offsetY?: number;
  offsetX?: number;
}

const Loading = ({ offsetY = 0, offsetX = 0 }: Loading) => {
  const containerLeft = WIDTH * 0.5 - boxSize - offsetX;
  const containerTop = HEIGHT * 0.5 - boxSize - offsetY;

  const sharedValueBox1 = useSharedValue(0);
  const sharedValueBox2 = useSharedValue(0);

  const inputRange = [0, 0.25, 0.5, 0.75, 1];
  const outputRangeY = [0, 180, 180, 0, 0];
  const outputRangeX = [0, 0, 180, 180, 0];

  const animatedStyleBox1 = useAnimatedStyle(() => ({
    transform: [
      { translateX: boxSize * 0.5 },
      { translateY: boxSize * 0.5 },
      {
        rotateY: `${interpolate(
          sharedValueBox1.value,
          inputRange,
          outputRangeY
        )}deg`,
      },
      {
        rotateX: `${interpolate(
          sharedValueBox1.value,
          inputRange,
          outputRangeX
        )}deg`,
      },
      { translateX: -1 * (boxSize * 0.5) },
      { translateY: -1 * (boxSize * 0.5) },
    ],
  }));
  const animatedStyleBox2 = useAnimatedStyle(() => ({
    transform: [
      { translateX: boxSize * 0.5 },
      { translateY: boxSize * 0.5 },
      {
        rotateY: `${interpolate(
          sharedValueBox2.value,
          inputRange,
          outputRangeY
        )}deg`,
      },
      {
        rotateX: `${interpolate(
          sharedValueBox2.value,
          inputRange,
          outputRangeX
        )}deg`,
      },
      { translateX: -1 * (boxSize * 0.5) },
      { translateY: -1 * (boxSize * 0.5) },
    ],
  }));

  useEffect(() => {
    sharedValueBox1.value = withRepeat(
      withTiming(sharedValueBox1.value == 0 ? 1 : 0, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1
    );
    sharedValueBox2.value = withRepeat(
      withDelay(
        1000,
        withTiming(sharedValueBox2.value == 0 ? 1 : 0, {
          duration: 2000,
          easing: Easing.linear,
        })
      ),
      -1
    );
  }, []);

  return (
    <View
      style={[styles.container, { left: containerLeft, top: containerTop }]}
    >
      <Animated.View style={[styles.box, animatedStyleBox1]} />
      <Animated.View
        style={[styles.box, animatedStyleBox2, { opacity: 0.6 }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: boxSize * 2,
    width: boxSize * 2,
    position: "relative",
  },
  box: {
    position: "absolute",
    top: 0,
    backgroundColor: "black",
    height: boxSize,
    width: boxSize,
    transform: [],
  },
});

export default Loading;
