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
  children: React.ReactNode;
  extraStyles?: StyleProp<ViewStyle>;
}

const Button = ({ children, extraStyles, ...props }: ButtonProps) => {
  const { currentTheme } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          borderColor: currentTheme.borderColor,
          backgroundColor: pressed
            ? currentTheme.borderColor
            : currentTheme.background,
        },
        styles.container,
        extraStyles,
      ]}
      {...props}
    >
      <ThemedText styles={{ fontSize: 16, fontFamily: "Montserrat-Medium" }}>
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
