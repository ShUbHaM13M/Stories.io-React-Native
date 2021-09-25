import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemedText } from "..";
import { useTheme } from "../../context/ThemeContext";

const NoComment = () => {
  const { currentTheme } = useTheme();

  return (
    <View
      style={[
        { borderTopColor: `${currentTheme.borderColor}66` },
        styles.divider,
      ]}
    >
      <ThemedText styles={styles.noCommentsFont}>No comments yet</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  noCommentsFont: {
    textAlign: "center",
    fontFamily: "Montserrat-Light",
    fontSize: 16,
  },
  divider: {
    marginTop: 8,
    borderTopWidth: 1,
    paddingTop: 8,
  },
});

export default NoComment;
