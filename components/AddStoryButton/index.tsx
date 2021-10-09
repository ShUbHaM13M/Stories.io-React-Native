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
import { Ionicons } from "@expo/vector-icons";

const BUTTON_SIZE = 65;
const PADDING = 16;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AddStoryButton = ({
  onPress,
  animated,
}: {
  onPress: () => void;
  animated: Animated.SharedValue<number>;
}) => {
  const { currentTheme } = useTheme();
  const inputRange = [0, 1];
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: `${interpolate(animated.value, inputRange, [0, -45])}deg`,
      },
    ],
    backgroundColor: interpolateColor(animated.value, inputRange, [
      currentTheme.borderColor,
      "#ff3e3e",
    ]),
  }));

  return (
    <AnimatedPressable
      onPress={() => {
        animated.value = withSpring(animated.value == 0 ? 1 : 0);
        onPress();
      }}
      style={[styles.button, animatedStyles]}
    >
      <Ionicons name="ios-add" size={24} color="white" />
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
