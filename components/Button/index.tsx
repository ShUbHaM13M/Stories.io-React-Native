import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import ThemedText from "../ThemedText";

interface ButtonProps extends PressableProps {
  color?: string;
  children: React.ReactNode;
  extraStyles?: StyleProp<ViewStyle>;
}

const Button = ({ children, color, extraStyles, ...props }: ButtonProps) => {
  const { currentTheme } = useTheme();
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  return (
    <Pressable
      onPressIn={() => setIsFocused(true)}
      onPressOut={() => setIsFocused(false)}
      style={({ pressed }) => [
        {
          borderColor: color || currentTheme.borderColor,
          backgroundColor: pressed
            ? color || currentTheme.borderColor
            : "transparent",
        },
        styles.container,
        extraStyles,
      ]}
      {...props}
    >
      <ThemedText
        styles={{
          fontSize: 16,
          fontFamily: "Montserrat-Medium",
          color: isFocused ? "#ffffff" : color || currentTheme.borderColor,
        }}
      >
        {children}
      </ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 2,
  },
});

export default Button;
