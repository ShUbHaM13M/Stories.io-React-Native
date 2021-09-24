import { useRoute } from "@react-navigation/core";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { BorderedContainer, ThemedText } from "../../components";
import { useTheme } from "../../context/ThemeContext";
import { CommentBoxProps, Story as StoryProp } from "../../global";
import { ScrollView } from "react-native-gesture-handler";
import CommentBox from "../../components/Story/CommentBox";
import Story from "../../components/Story";

const StoryPage = () => {
  const route = useRoute();
  const { story }: { story: StoryProp | undefined } = route.params;
  const { currentTheme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: currentTheme.background }}>
      {story ? (
        <ScrollView>
          <Story story={story} />
          <CommentBox comments={story.comments} />
        </ScrollView>
      ) : (
        <ThemedText>Story not found</ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default StoryPage;
