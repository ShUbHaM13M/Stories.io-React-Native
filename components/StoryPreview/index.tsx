import React from "react";
import { Story } from "../../global";
import { BorderedContainer, Title, ThemedText, Button } from "..";
import { View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/core";
import { useAuth } from "../../context/AuthContext";

const StoryPreview = ({ story }: { story: Story }) => {
  const { currentTheme } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation();

  return (
    <BorderedContainer extraStyles={{ justifyContent: "space-between" }}>
      <Title extraStyle={{ color: currentTheme.text, marginBottom: 8 }}>
        {story.title}
      </Title>
      <ThemedText styles={{ color: currentTheme.text }} numberOfLines={5}>
        {story.content}
      </ThemedText>
      <View
        style={{
          flexDirection: "row",
          marginTop: 16,
          justifyContent:
            story.writtenBy == user?.username ? "space-between" : "flex-start",
        }}
      >
        {/* @ts-ignore */}
        <Button onPress={() => navigation.navigate("Story", { story })}>
          View
        </Button>
        {story.writtenBy == user?.username && (
          <>
            <Button color="#4368b3">Edit</Button>
            <Button color="#ff3e3e">Delete</Button>
          </>
        )}
      </View>
    </BorderedContainer>
  );
};

export default StoryPreview;
