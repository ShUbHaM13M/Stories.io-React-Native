import React from "react";
import { Pressable, PressableProps } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import Svg, { Path } from "react-native-svg";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import IconButton from "../IconButton";

interface LikeButtonProps extends PressableProps {
  isLiked: boolean;
  onButtonPress: () => void;
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const LikeButton = ({ isLiked, onButtonPress, ...props }: LikeButtonProps) => {
  const { currentTheme } = useTheme();

  return (
    <IconButton isToggled={isLiked} onButtonPress={onButtonPress}>
      <Svg
        width={29}
        height={30}
        fill={isLiked ? currentTheme.borderColor : "transparent"}
        fillOpacity={0.55}
      >
        <Path
          d="M8.333 13.666l5.334-12a4 4 0 014 4V11h7.546a2.667 2.667 0 012.667 3.066l-1.84 12a2.666 2.666 0 01-2.667 2.267H8.333m0-14.666v14.666m0-14.666h-4a2.667 2.667 0 00-2.666 2.666v9.334a2.667 2.667 0 002.666 2.666h4"
          stroke={currentTheme.borderColor}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </IconButton>
  );
};

export default LikeButton;
