import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { BorderedContainer, Button, ThemedText } from "..";
// @ts-ignore
import { MarkdownView } from "react-native-markdown-view";
import { Story as StoryProp } from "../../global";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import LikeButton from "./LikeButton";

const Story = ({ story }: { story: StoryProp }) => {
  const { currentTheme } = useTheme();
  const { user } = useAuth();

  const [isLiked, setIsLiked] = React.useState<boolean>(
    user ? story.likes.indexOf(user.id) !== -1 : false
  );

  const [totalLikes, setTotalLikes] = React.useState<number>(
    story.likes.length
  );

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    setTotalLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <BorderedContainer>
      <ThemedText styles={styles.title}>{story.title}</ThemedText>
      <ThemedText styles={styles.date}>{story.createdAt}</ThemedText>
      <View
        style={[styles.divider, { backgroundColor: currentTheme.borderColor }]}
      />
      <MarkdownView>{story.content}</MarkdownView>
      <ThemedText styles={styles.author}>- {story.writtenBy}</ThemedText>
      <View
        style={[
          { borderTopColor: `${currentTheme.borderColor}66` },
          styles.actions,
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LikeButton onButtonPress={toggleLike} isLiked={isLiked} />
          <ThemedText styles={styles.likesText}>{totalLikes}</ThemedText>
        </View>
        {story.writtenBy == user?.username && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Button
              extraStyles={{ marginRight: 8, paddingVertical: 10 }}
              color="#4368b3"
            >
              Edit
            </Button>
            <Button extraStyles={{ paddingVertical: 10 }} color="#ff3e3e">
              Delete
            </Button>
          </View>
        )}
      </View>
    </BorderedContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 22,
  },
  date: {
    fontFamily: "Montserrat-Light",
    fontSize: 16,
    marginVertical: 8,
  },
  divider: {
    width: "100%",
    height: 2,
    opacity: 0.6,
  },
  author: {
    fontFamily: "Montserrat-Light",
    textAlign: "right",
  },
  actions: {
    flexDirection: "row",
    marginTop: 16,
    paddingTop: 16,
    justifyContent: "space-between",
    borderTopWidth: 1,
    alignItems: "center",
  },
  likesText: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
  },
});

export default Story;
