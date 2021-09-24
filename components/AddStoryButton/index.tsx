import React, { useEffect, useState } from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "../../context/ThemeContext";

const BUTTON_SIZE = 65;
const PADDING = 16;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AddStoryButton = ({ onPress }: { onPress: () => void }) => {
  const { currentTheme } = useTheme();
  const sharedValue = useSharedValue(0);
  const inputRange = [0, 1];
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: `${interpolate(sharedValue.value, inputRange, [0, -45])}deg`,
      },
    ],
    backgroundColor: interpolateColor(sharedValue.value, inputRange, [
      currentTheme.borderColor,
      "#ff3e3e",
    ]),
  }));

  return (
    <AnimatedPressable
      onPress={() => {
        sharedValue.value = withSpring(sharedValue.value == 0 ? 1 : 0);
        onPress();
      }}
      style={[styles.button, animatedStyles]}
    >
      <Text style={{ fontSize: 32, color: "white" }}>+</Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    elevation: 2,
    right: PADDING,
    bottom: PADDING,
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
    backgroundColor: "red",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddStoryButton;
