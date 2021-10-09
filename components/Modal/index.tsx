import React from "react";
import {
  StyleSheet,
  Dimensions,
  ViewProps,
  StyleProp,
  ViewStyle,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface ModalProps extends ViewProps {
  animated: Animated.SharedValue<number>;
  children: React.ReactNode;
  extraStyles?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
}

const { width: sWidth, height: sHeight } = Dimensions.get("window");

const Modal = ({
  animated,
  children,
  extraStyles,
  width,
  height,
  ...props
}: ModalProps) => {
  const MODAL_WIDTH = width || sWidth;
  const MODAL_HEIGHT = height || sHeight * 0.8;
  const animatedStyles = useAnimatedStyle(() => {
    const transform = [
      {
        translateX: interpolate(
          animated.value,
          [0, 1],
          [-sWidth, sWidth * 0.5 - MODAL_WIDTH * 0.5]
        ),
      },
    ];
    return {
      transform,
    };
  });

  return (
    <Animated.View
      style={[
        styles.modalBack,
        animatedStyles,
        extraStyles,
        { width: MODAL_WIDTH, height: MODAL_HEIGHT },
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalBack: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});

export default Modal;
