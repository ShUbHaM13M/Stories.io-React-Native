import React, { useEffect } from "react";
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
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
import { useTheme } from "../../context/ThemeContext";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const boxSize = 35;

interface Loading {
  offsetY?: number;
  offsetX?: number;
  styles?: StyleProp<ViewStyle>;
}

const Loading = ({ offsetY = 0, offsetX = 0, styles }: Loading) => {
  const containerLeft = WIDTH * 0.5 - boxSize - offsetX;
  const containerTop = HEIGHT * 0.5 - boxSize - offsetY;

  const { currentTheme } = useTheme();
  const backgroundColor = currentTheme.text;

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
    setTimeout(() => {
      sharedValueBox2.value = withRepeat(
        withTiming(sharedValueBox2.value == 0 ? 1 : 0, {
          duration: 2000,
          easing: Easing.linear,
        }),
        -1
      );
    }, 1000);
  }, []);

  return (
    <View style={[style.container, styles]}>
      <View
        style={{
          position: "absolute",
          left: containerLeft,
          top: containerTop,
        }}
      >
        <Animated.View
          style={[style.box, animatedStyleBox1, { backgroundColor }]}
        />
        <Animated.View
          style={[
            style.box,
            animatedStyleBox2,
            { opacity: 0.6, backgroundColor },
          ]}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  box: {
    position: "absolute",
    top: 0,
    height: boxSize,
    width: boxSize,
    transform: [],
  },
});

export default Loading;
