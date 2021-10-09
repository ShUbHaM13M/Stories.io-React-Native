import { StackActions, useNavigation, useRoute } from "@react-navigation/core";
import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import { Title } from "../../components";
import Editor from "../../components/Editor";
import Loading from "../../components/Loading";
import { useAuth } from "../../context/AuthContext";
import { useError } from "../../context/ErrorContext";
import { useStory } from "../../context/StoryContext";
import { useTheme } from "../../context/ThemeContext";
import { API_URL, Story } from "../../global";

const { height, width } = Dimensions.get("window");

const EditStory = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { story }: { story: Story } = route.params;
  const { user } = useAuth();
  const { updateStory, removeStory, addNewStory } = useStory();
  const { currentTheme } = useTheme();
  const { setError } = useError();
  const [loading, setLoading] = useState<boolean>(false);

  async function onSavePressed(
    storyTitle: string,
    storyContent: string,
    isStoryPrivate: boolean
  ) {
    setLoading(true);
    const URL = `${API_URL}/api/story/${story._id}/edit`;
    const options: RequestInit = {
      method: "PUT",
      body: JSON.stringify({
        title: storyTitle,
        content: storyContent,
        isPrivate: isStoryPrivate,
        username: user?.username,
      }),
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch(URL, options);
    const data = await res.json();
    if (res.ok && data.type === "success") {
      if (data.updatedStory.isPrivate) {
        removeStory(data.updatedStory._id);
      } else {
        removeStory(data.updatedStory._id);
        addNewStory(data.updatedStory);
      }
      setLoading(false);
      navigation.pop(2);
      navigation.navigate("Story", { story: data.updatedStory });
      return;
    }
    setError(data);
    setLoading(false);
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: currentTheme.background,
      }}
    >
      <Title extraStyle={{ marginVertical: 10 }}>Edit Story</Title>
      <Editor
        story={story}
        editorAction={onSavePressed}
        editorActionButtonText="Save Changes"
      />
      {loading && (
        <View
          style={{
            position: "absolute",
            height: height,
            top: -20,
            width: width,
            backgroundColor: `${currentTheme.background}aa`,
          }}
        >
          <Loading />
        </View>
      )}
    </View>
  );
};

export default EditStory;
