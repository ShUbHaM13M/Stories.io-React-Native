import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import Animated from "react-native-reanimated";
import { Title } from "../../components";
import Editor from "../../components/Editor";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import { useAuth } from "../../context/AuthContext";
import { useError } from "../../context/ErrorContext";
import { useSocket } from "../../context/SocketContext";
import { useStory } from "../../context/StoryContext";
import { useTheme } from "../../context/ThemeContext";
import { API_URL } from "../../global";

const { width } = Dimensions.get("window");

interface AddStoryProps {
  animated: Animated.SharedValue<number>;
  toggleAddDialog: () => void;
}

const { height } = Dimensions.get("window");

const AddStory = ({ animated, toggleAddDialog }: AddStoryProps) => {
  const { currentTheme } = useTheme();
  const { user } = useAuth();
  const { setError } = useError();
  const { addNewStory } = useStory();
  const { socket } = useSocket();
  const [loading, setLoading] = useState<boolean>(false);

  async function onAddButtonPressed(
    storyTitle: string,
    storyContent: string,
    isStoryPrivate: boolean,
    callback: () => void
  ) {
    setLoading(true);
    const URL = `${API_URL}/api/story`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({
        title: storyTitle,
        content: storyContent,
        isPrivate: isStoryPrivate,
        writtenBy: user?.username,
      }),
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch(URL, options);
    const data = await res.json();
    if (res.ok && data.type === "success") {
      addNewStory(data.story);
      callback();
      toggleAddDialog();
      setError({ type: data.type, message: `${storyTitle} was added 👏🏻` });
      setLoading(false);
      if (data.story.isPrivate) return;
      socket?.emit("add-new-story", { storyId: data.story._id });
      return;
    }
    setError(data);
    setLoading(false);
  }

  return (
    <Modal
      height={height}
      animated={animated}
      extraStyles={{
        backgroundColor: currentTheme.background,
        paddingHorizontal: 16,
        paddingBottom: 45,
      }}
    >
      <Title extraStyle={{ marginVertical: 10 }}>Add Story</Title>
      <Editor
        editorAction={onAddButtonPressed}
        editorActionButtonText="Add Story"
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
    </Modal>
  );
};

export default AddStory;
