import React from "react";
import { View, Text, StyleProp, TextStyle } from "react-native";
import ThemedText from "../ThemedText";

interface TitleProps {
  children: React.ReactNode;
  extraStyle?: StyleProp<TextStyle>;
}

const Title = ({ children, extraStyle }: TitleProps) => {
  const styles: StyleProp<TextStyle> = {
    fontSize: 22,
    fontFamily: "Montserrat-SemiBold",
    ...(extraStyle as object),
  };

  return <ThemedText styles={styles}>{children}</ThemedText>;
};

export default Title;
