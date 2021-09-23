import { useRoute } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BorderedContainer, ThemedText } from "../../components";
import { useTheme } from "../../context/ThemeContext";
import { CommentBoxProps, Story as StoryProp } from "../../global";
import Markdown from "react-native-simple-markdown";
import { ScrollView } from "react-native-gesture-handler";

const Story = () => {
  const route = useRoute();
  const { story }: { story: StoryProp } = route.params;
  const { currentTheme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: currentTheme.background }}>
      {story ? (
        <ScrollView>
          <BorderedContainer>
            <ThemedText styles={styles.title}>{story.title}</ThemedText>
            <ThemedText styles={styles.date}>{story.createdAt}</ThemedText>
            <View
              style={[
                styles.divider,
                { backgroundColor: currentTheme.borderColor },
              ]}
            />
            <Markdown
              styles={{
                image: { width: 150, height: 200 },
              }}
            >
              {story.content.replace(/\n/g, "\n\n")}
            </Markdown>
            <ThemedText styles={styles.author}>- {story.writtenBy}</ThemedText>
          </BorderedContainer>
          {/* Add Actions over here  */}
          <CommentBox comments={story.comments} />
        </ScrollView>
      ) : (
        <ThemedText>Story not found</ThemedText>
      )}
    </View>
  );
};

const CommentBox = ({ comments }: CommentBoxProps) => {
  return (
    <BorderedContainer extraStyles={{ marginBottom: 16 }}>
      <ThemedText styles={{ fontSize: 18, fontFamily: "Montserrat-SemiBold" }}>
        Comments
      </ThemedText>
      {comments.map((comment, index) => (
        <BorderedContainer key={index} extraStyles={styles.comment}>
          <ThemedText styles={{ marginBottom: 8 }}>
            {comment.content}
          </ThemedText>
          <ThemedText styles={styles.author}>- {comment.by}</ThemedText>
        </BorderedContainer>
      ))}
      {comments.length <= 0 && <ThemedText>No comments yet</ThemedText>}
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
  comment: {
    justifyContent: "space-between",
    marginHorizontal: 0,
  },
});

export default Story;
