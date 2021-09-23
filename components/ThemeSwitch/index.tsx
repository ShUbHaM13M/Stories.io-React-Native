import React, { useEffect, useState } from "react";

import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolateColors,
  spring,
  useAnimatedStyle,
} from "react-native-reanimated";

interface ThemeIconProps {
  handleOnPress: (value: boolean) => void;
  activeTrackColor: string;
  inActiveTrackColor: string;
  value: boolean;
  thumbColor: string;
}

const RNSwitch = ({
  handleOnPress,
  activeTrackColor,
  inActiveTrackColor,
  thumbColor,
  value,
}: ThemeIconProps) => {
  const [switchTranslate] = useState(new Animated.Value(0));

  useEffect(() => {
    if (value) {
      spring(switchTranslate, {
        toValue: 21,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
      }).start();
    } else {
      spring(switchTranslate, {
        toValue: 0,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
      }).start();
    }
  }, [value, switchTranslate]);

  const interpolateBackgroundColor = {
    backgroundColor: interpolateColors(switchTranslate, {
      inputRange: [0, 22],
      outputColorRange: [inActiveTrackColor, activeTrackColor],
    }),
  };
  const memoizedOnSwitchPressCallback = React.useCallback(() => {
    handleOnPress(!value);
  }, [handleOnPress, value]);

  return (
    <Pressable onPress={memoizedOnSwitchPressCallback}>
      <Animated.View style={[styles.container, interpolateBackgroundColor]}>
        <Animated.View
          style={[
            styles.thumb,
            { backgroundColor: thumbColor },
            { transform: [{ translateX: switchTranslate }] },
            styles.shadow,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 2,
  },
  container: {
    width: 50,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 2,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

export default RNSwitch;
