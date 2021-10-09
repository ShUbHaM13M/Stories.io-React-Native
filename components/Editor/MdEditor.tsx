import React, { SetStateAction, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  Linking,
  FlatList,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "../IconButton";
//@ts-ignore
import { MarkdownView } from "react-native-markdown-view";
import { toastMessage } from "../../global";
import ToolbarButton from "./ToolbarButton";
import toolbarActions from "./toolbarActions";
import mdStyles from "./MdStyles";

const { height } = Dimensions.get("window");

interface MdEditorProps {
  state: string;
  setState: React.Dispatch<SetStateAction<string>>;
}

const MdEditor = ({ setState, state }: MdEditorProps) => {
  const { currentTheme } = useTheme();
  const inputRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({
    start: state.length,
    end: state.length,
  });

  const iconColor = `${currentTheme.text}bb`;

  const [renderMd, setRenderMd] = useState<boolean>(false);

  function insertToStory(toInsert: string) {
    setState(
      (prev) =>
        prev.substring(0, cursorPosition.end) +
        toInsert +
        prev.substring(cursorPosition.end, prev.length)
    );
  }

  function updateCursorPosition(increment: number) {
    setCursorPosition((prev) => ({
      start: prev.start + increment,
      end: prev.end + increment,
    }));
  }

  function onToolButtonPressed(syntax: string, cursorIncrement: number) {
    insertToStory(syntax);
    updateCursorPosition(cursorIncrement);
    if (inputRef.current) inputRef.current.focus();
  }

  const _mdStyles = mdStyles(currentTheme.text, currentTheme.borderColor);

  return (
    <View
      style={[
        styles.mdEditorContainer,
        { borderColor: currentTheme.borderColor },
      ]}
    >
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {!renderMd && (
            <TextInput
              placeholder={
                "Story content goes here.. \nlets write something cool today! 🐰"
              }
              placeholderTextColor={`${currentTheme.text}aa`}
              onChangeText={(text) => setState(text)}
              multiline
              ref={inputRef}
              scrollEnabled
              onSelectionChange={({ nativeEvent: { selection } }) => {
                setCursorPosition(selection);
              }}
              selection={cursorPosition}
              style={[styles.editorInput, { color: currentTheme.text }]}
              textAlignVertical="top"
              value={state}
            />
          )}
          {renderMd && (
            <MarkdownView
              onLinkPress={(url: string) => {
                Linking.openURL(url).catch((err) => console.warn(err.message));
              }}
              style={styles.editorInput}
              styles={_mdStyles}
            >
              {state}
            </MarkdownView>
          )}
        </ScrollView>
      </View>
      <View
        style={[
          styles.editorToolbar,
          {
            backgroundColor: currentTheme.background,
            borderTopColor: currentTheme.borderColor,
          },
        ]}
      >
        <FlatList
          persistentScrollbar
          showsHorizontalScrollIndicator
          horizontal
          data={toolbarActions}
          renderItem={({ item }) => (
            <ToolbarButton
              onPress={() =>
                onToolButtonPressed(item.mdPattern, item.cursorIncrement)
              }
              onLongPress={() => toastMessage(item.onLongMessage)}
              style={styles.toolbarButtons}
            >
              {item.component(iconColor)}
            </ToolbarButton>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
        <View
          style={{
            borderLeftColor: currentTheme.borderColor,
            borderLeftWidth: 1,
            paddingLeft: 4,
          }}
        >
          <IconButton
            onLongPress={() => toastMessage("Show rendered markdown")}
            onButtonPress={() => setRenderMd((prev) => !prev)}
            extraStyles={styles.toolbarButtons}
          >
            <MaterialCommunityIcons
              name={renderMd ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={iconColor}
            />
          </IconButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mdEditorContainer: {
    flex: 1,
    marginTop: 8,
    minHeight: height * 0.35,
    borderWidth: 2,
  },
  editorToolbar: {
    borderTopWidth: 1,
    flexDirection: "row",
    padding: 6,
    paddingRight: 0,
  },
  editorInput: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    fontFamily: "Montserrat",
  },
  toolbarButtons: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MdEditor;
