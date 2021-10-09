import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import Modal from ".";
import { Button, ThemedText } from "..";
import { useTheme } from "../../context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "../IconButton";
import { error } from "../../global/colors";
import { API_URL } from "../../global";
import { useError } from "../../context/ErrorContext";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";

const { height, width } = Dimensions.get("window");

interface DeleteModalProps {
  currentSelectedStory: { storyTitle: string; id: string } | undefined;
  showModal?: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteFinishedCallback: () => void;
}

const MODAL_HEIGHT = height;

const DeleteModal = ({
  currentSelectedStory,
  showModal = false,
  setShowModal,
  deleteFinishedCallback,
}: DeleteModalProps) => {
  const { currentTheme } = useTheme();
  const { setError } = useError();
  const { user } = useAuth();
  const { socket } = useSocket();

  const animated = useSharedValue(0);

  const animationConfig: Animated.WithTimingConfig = {
    duration: 250,
  };

  function hideModal() {
    animated.value = withTiming(0, animationConfig);
    setShowModal(false);
  }
  function displayModal() {
    animated.value = withTiming(1, animationConfig);
  }

  useEffect(() => {
    if (showModal) {
      displayModal();
      return;
    }
    hideModal();
  }, [showModal]);

  const onDeleteButtonPressed = useCallback(async () => {
    const URL = `${API_URL}/api/story/${currentSelectedStory?.id}/delete`;
    const options: RequestInit = {
      method: "DELETE",
      body: JSON.stringify({ username: user?.username }),
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch(URL, options);
    const data = await res.json();
    if (res.ok) {
      hideModal();
      deleteFinishedCallback();
      socket?.emit("delete-story", { storyId: currentSelectedStory?.id });
      return;
    }
    setError(data);
    hideModal();
  }, [currentSelectedStory]);

  return (
    <Modal
      height={MODAL_HEIGHT}
      width={width}
      animated={animated}
      extraStyles={[{ backgroundColor: `${currentTheme.navColor}aa` }]}
    >
      <View
        style={[styles.container, { backgroundColor: currentTheme.navColor }]}
      >
        <View style={styles.topBar}>
          <ThemedText style={styles.topBarText}>Delete Story ?</ThemedText>
          <IconButton onButtonPress={hideModal}>
            <MaterialCommunityIcons name="close" size={24} color="white" />
          </IconButton>
        </View>
        <View style={{ flex: 1, padding: 20 }}>
          {currentSelectedStory && (
            <ThemedText styles={{ fontSize: 16 }}>
              <ThemedText styles={{ fontFamily: "Montserrat-SemiBold" }}>
                {currentSelectedStory.storyTitle}
              </ThemedText>{" "}
              will be deleted
            </ThemedText>
          )}
        </View>
        <View style={styles.actions}>
          <Button onPress={hideModal}>Cancel</Button>
          <Button onPress={onDeleteButtonPressed} color={error}>
            Delete
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    position: "absolute",
    width: width * 0.85,
    minHeight: height * 0.3,
    top: height * 0.25,
    alignSelf: "center",
  },
  topBar: {
    backgroundColor: error,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    paddingLeft: 16,
  },
  topBarText: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    color: "white",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 16,
  },
});

export default DeleteModal;
