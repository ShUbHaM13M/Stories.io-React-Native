import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useState } from "react";
import { View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Story as StoryProp } from "../../global";
import { ScrollView } from "react-native-gesture-handler";
import CommentBox from "../../components/Story/CommentBox";
import Story from "../../components/Story";
import DeleteModal from "../../components/Modal/DeleteModal";
import { useStory } from "../../context/StoryContext";

const StoryPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { removeStory } = useStory();
  const { story }: { story: StoryProp } = route.params;
  const { currentTheme } = useTheme();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentSelectedStory, setCurrentSelectedStory] =
    useState<{ storyTitle: string; id: string }>();

  function deleteFinishedCallback() {
    if (currentSelectedStory) removeStory(currentSelectedStory.id);
    navigation.navigate("Browse");
  }

  function onDeleteButtonPressed(storyTitle: string, id: string) {
    setShowModal(true);
    setCurrentSelectedStory({ storyTitle, id });
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: currentTheme.background,
        position: "relative",
      }}
    >
      <ScrollView>
        <Story story={story} onDeleteButtonPressed={onDeleteButtonPressed} />
        <CommentBox storySlug={story.slug} writtenBy={story.writtenBy} />
      </ScrollView>
      <DeleteModal
        deleteFinishedCallback={deleteFinishedCallback}
        showModal={showModal}
        setShowModal={setShowModal}
        currentSelectedStory={currentSelectedStory}
      />
    </View>
  );
};

export default StoryPage;
