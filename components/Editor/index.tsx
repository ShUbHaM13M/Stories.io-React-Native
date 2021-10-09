import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ViewStyle,
  StyleProp,
} from "react-native";
import { Button, RNSwitch, ThemedText } from "..";
import { useError } from "../../context/ErrorContext";
import { useTheme } from "../../context/ThemeContext";
import { Story } from "../../global";
import ThemedInput from "../ThemedInput";
import MdEditor from "./MdEditor";

interface EditorProps {
  story?: Story;
  editorActionButtonText?: string;
  editorAction?: (
    storyTitle: string,
    storyContent: string,
    isStoryPrivate: boolean,
    callback: () => void
  ) => any;
  style?: StyleProp<ViewStyle>;
}

const Editor = ({
  story,
  editorActionButtonText = "Save",
  editorAction = () => {},
  style,
}: EditorProps) => {
  const [storyTitle, setStoryTitle] = useState<string>(story?.title || "");
  const [storyContent, setStoryContent] = useState<string>(
    story?.content || ""
  );
  const [isStoryPrivate, setIsStoryPrivate] = useState<boolean>(
    story?.isPrivate || false
  );

  const { setError } = useError();
  const { currentTheme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: currentTheme.background,
        ...(style as Object),
      }}
    >
      <ThemedInput
        placeholder="Story title"
        state={storyTitle}
        setValue={setStoryTitle}
      />
      <MdEditor state={storyContent} setState={setStoryContent} />
      <View
        style={{
          flexDirection: "row",
          marginTop: 16,
          alignItems: "center",
        }}
      >
        <ThemedText styles={{ marginRight: 8 }}>Private: </ThemedText>
        <RNSwitch
          activeTrackColor={currentTheme.borderColor}
          inActiveTrackColor={currentTheme.borderColor}
          value={isStoryPrivate}
          handleOnPress={() => setIsStoryPrivate((prev) => !prev)}
          thumbColor={currentTheme.background}
        />
      </View>
      <Button
        onPress={() => {
          if (!storyTitle || !storyContent) {
            setError({
              type: "danger",
              message: "Story title or content missing :/",
            });
            return;
          }
          editorAction(storyTitle, storyContent, isStoryPrivate, () => {
            setStoryContent("");
            setStoryTitle("");
          });
        }}
        extraStyles={styles.saveButton}
      >
        {editorActionButtonText}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    marginTop: 16,
    marginBottom: 32,
    alignSelf: "center",
  },
});

export default Editor;
