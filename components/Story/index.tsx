import React, { useEffect } from "react";
import { View, StyleSheet, Linking } from "react-native";
import { BorderedContainer, Button, ThemedText } from "..";
// @ts-ignore
import { MarkdownView } from "react-native-markdown-view";
import { Story as StoryProp } from "../../global";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import LikeButton from "./LikeButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import mdStyles from "../Editor/MdStyles";
import { error, secondary } from "../../global/colors";
import { useSocket } from "../../context/SocketContext";

interface StoryComponentProps {
  story: StoryProp;
  onDeleteButtonPressed: (storyTitle: string, id: string) => void;
}

const Story = ({ story, onDeleteButtonPressed }: StoryComponentProps) => {
  const { currentTheme } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation();
  const { socket } = useSocket();

  const [isLiked, setIsLiked] = React.useState<boolean>(
    user ? story.likes.indexOf(user.id) !== -1 : false
  );

  const [totalLikes, setTotalLikes] = React.useState<number>(
    story.likes.length
  );

  const toggleLike = async () => {
    if (!user) return;
    setIsLiked((prev) => !prev);
    setTotalLikes((prev) => {
      if (isLiked) return prev - 1;
      return prev + 1;
    });
    socket?.emit("like-story", {
      storySlug: story.slug,
      id: user?.id,
      writtenBy: story.writtenBy,
    });
  };

  useEffect(() => {
    if (!socket) return;
    socket.on(`${story.slug}-liked`, ({ totalLikes }) => {
      setTotalLikes(totalLikes.length);
    });
    return () => {
      socket.off(`${story.slug}-liked`);
    };
  }, [socket]);

  const _mdStyles = mdStyles(currentTheme.text, currentTheme.borderColor);

  return (
    <BorderedContainer>
      <View style={[styles.storyContainer]}>
        <ThemedText styles={styles.title}>{story.title}</ThemedText>
        {story.isPrivate && (
          <MaterialCommunityIcons
            name="lock"
            size={22}
            color={currentTheme.text}
          />
        )}
      </View>
      <ThemedText styles={styles.date}>{story.createdAt}</ThemedText>
      <View
        style={[styles.divider, { backgroundColor: currentTheme.borderColor }]}
      />
      <MarkdownView
        onLinkPress={(url: string) => {
          Linking.openURL(url).catch((err) => console.warn(err.message));
        }}
        styles={_mdStyles}
      >
        {story.content}
      </MarkdownView>
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
              color={secondary}
              onPress={() => navigation.navigate("EditStory", { story })}
            >
              Edit
            </Button>
            <Button
              onPress={() => onDeleteButtonPressed(story.title, story._id)}
              extraStyles={{ paddingVertical: 10 }}
              color={error}
            >
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
  storyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    fontFamily: "Montserrat-Light",
    fontSize: 16,
    marginVertical: 8,
  },
  divider: {
    width: "100%",
    height: 2,
    opacity: 0.4,
  },
  author: {
    fontFamily: "Montserrat-Light",
    textAlign: "right",
    marginTop: 8,
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
