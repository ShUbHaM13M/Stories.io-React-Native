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
import {
  API_URL,
  Comment as CommentType,
  Story as StoryProp,
} from "../../global";
import { ScrollView } from "react-native-gesture-handler";
import CommentBox from "../../components/Story/CommentBox";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import Story from "../../components/Story";

const StoryPage = () => {
  const route = useRoute();
  const { story }: { story: StoryProp } = route.params;
  const { currentTheme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: currentTheme.background }}>
      <ScrollView>
        <Story story={story} />
        <CommentBox storySlug={story.slug} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default StoryPage;
