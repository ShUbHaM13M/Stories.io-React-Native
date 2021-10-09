import React from "react";
import { Story } from "../../global";
import { BorderedContainer, Title, ThemedText, Button } from "..";
import { View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/core";
import { useAuth } from "../../context/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { error, secondary } from "../../global/colors";
//@ts-ignore
import { MarkdownView } from "react-native-markdown-view";

interface StoryPreviewProps {
  story: Story;
  showIsPrivate?: boolean;
  onDeleteKeyPressed: (storyTitle: string, id: string) => void;
}

const StoryPreview = ({
  story,
  onDeleteKeyPressed,
  showIsPrivate = false,
}: StoryPreviewProps) => {
  const { currentTheme } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation();

  return (
    <BorderedContainer extraStyles={{ justifyContent: "space-between" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Title extraStyle={{ color: currentTheme.text }}>{story.title}</Title>
        {showIsPrivate && story.isPrivate && (
          <MaterialCommunityIcons
            name="lock"
            size={22}
            color={currentTheme.text}
          />
        )}
      </View>
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
        <Button onPress={() => navigation.navigate("Story", { story: story })}>
          View
        </Button>
        {story.writtenBy == user?.username && (
          <>
            <Button
              onPress={() => navigation.navigate("EditStory", { story })}
              color={secondary}
            >
              Edit
            </Button>
            <Button
              onPress={() => onDeleteKeyPressed(story.title, story._id)}
              color={error}
            >
              Delete
            </Button>
          </>
        )}
      </View>
    </BorderedContainer>
  );
};

export default StoryPreview;
