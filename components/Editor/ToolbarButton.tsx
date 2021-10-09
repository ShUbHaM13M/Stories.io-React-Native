import React from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import IconButton from "../IconButton";

interface ToolbarButtonProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  onLongPress: () => void;
}

const ToolbarButton = ({
  children,
  onLongPress,
  onPress,
  style,
}: ToolbarButtonProps) => {
  return (
    <IconButton
      onButtonPress={onPress}
      onLongPress={onLongPress}
      extraStyles={style}
    >
      {children}
    </IconButton>
  );
};

export default ToolbarButton;
