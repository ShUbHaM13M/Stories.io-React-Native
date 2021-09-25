import React from "react";
import {
  View,
  Text,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "../../context/ThemeContext";

interface IconButtonProps extends PressableProps {
  children?: React.ReactNode;
  isToggled: boolean;
  extraStyles?: StyleProp<ViewStyle>;
  onButtonPress: () => void;
}

const IconButton = ({
  children,
  onButtonPress,
  isToggled,
  extraStyles,
  ...props
}: IconButtonProps) => {
  const { currentTheme } = useTheme();

  const sharedValue = useSharedValue(isToggled ? 1 : 0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          sharedValue.value,
          [0, 0.5, 1],
          [1, 1.2, 1],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  return (
    <Pressable
      style={({ pressed }) => [
        {
          marginRight: 4,
          padding: 8,
          borderRadius: 50,
          backgroundColor: pressed
            ? `${currentTheme.borderColor}33`
            : "transparent",
        },
        extraStyles,
      ]}
      onPress={() => {
        sharedValue.value = withSpring(sharedValue.value == 1 ? 0 : 1);
        onButtonPress();
      }}
      {...props}
    >
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Pressable>
  );
};

export default IconButton;
