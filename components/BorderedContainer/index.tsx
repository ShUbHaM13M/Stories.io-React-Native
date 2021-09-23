import React from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const MARGIN = 16;
const PADDING = 16;

interface BorderedContainerProps extends ViewProps {
  children: React.ReactNode;
  height?: number;
  extraStyles?: StyleProp<ViewStyle>;
}

export default function ({
  children,
  height,
  extraStyles,
  ...props
}: BorderedContainerProps) {
  const { currentTheme } = useTheme();

  const styles: StyleProp<ViewStyle> = {
    marginHorizontal: MARGIN,
    padding: PADDING,
    marginVertical: MARGIN * 0.5,
    borderWidth: 2,
    borderColor: currentTheme.borderColor,
  };

  return (
    <View {...props} style={[styles, extraStyles]}>
      {children}
    </View>
  );
}
