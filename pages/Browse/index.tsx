import React, { useState } from "react";
import { View, FlatList, Dimensions, ActivityIndicator } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import Loading from "../../components/Loading";
import StoryPreview from "../../components/StoryPreview";
import { ThemedText, Title } from "../../components";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import AddStoryButton from "../../components/AddStoryButton";
import { useStory } from "../../context/StoryContext";
import { useSharedValue, withTiming } from "react-native-reanimated";
import AddStory from "../AddStory";
import DeleteModal from "../../components/Modal/DeleteModal";
import { useError } from "../../context/ErrorContext";

const { width } = Dimensions.get("window");

const index = () => {
  const { loading, stories, removeStory, setPage, resetStories } = useStory();
  const { setError } = useError();
  const { currentTheme } = useTheme();
  const { isLoggedin } = useAuth();
  const route = useRoute();
  const modalValue = useSharedValue(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentSelectedStory, setCurrentSelectedStory] =
    useState<{ storyTitle: string; id: string }>();

  const [isRefresing, setIsRefresing] = useState<boolean>(false);

  function onDeleteButtonPressed(storyTitle: string, id: string) {
    setShowModal(true);
    setCurrentSelectedStory({ storyTitle, id });
  }

  function deleteFinishedCallback() {
    if (currentSelectedStory) removeStory(currentSelectedStory.id);
  }

  function toggleAddModal() {
    modalValue.value = withTiming(modalValue.value == 0 ? 1 : 0, {
      duration: 250,
    });
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: currentTheme.background,
        position: "relative",
      }}
    >
      {loading ? (
        <Loading offsetY={50} />
      ) : (
        <View style={{ flex: 1 }}>
          <Title extraStyle={{ marginVertical: 10, marginLeft: 16 }}>
            {route.name}
          </Title>
          <FlatList
            data={stories}
            style={{
              flex: 1,
            }}
            refreshing={isRefresing}
            onRefresh={() => {
              setIsRefresing(true);
              resetStories();
              setIsRefresing(false);
            }}
            ListFooterComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {
                  <ActivityIndicator
                    color={`${currentTheme.borderColor}aa`}
                    size="large"
                  />
                }
              </View>
            }
            onEndReachedThreshold={0.5}
            onEndReached={({ distanceFromEnd }) => {
              if (distanceFromEnd >= 0) {
                setPage((prev) => prev + 1);
              }
            }}
            renderItem={({ item }) => (
              <StoryPreview
                story={item}
                onDeleteKeyPressed={onDeleteButtonPressed}
              />
            )}
            keyExtractor={(story) => story._id}
          />
          {isLoggedin && (
            <AddStory toggleAddDialog={toggleAddModal} animated={modalValue} />
          )}
          {isLoggedin && (
            <DeleteModal
              deleteFinishedCallback={deleteFinishedCallback}
              showModal={showModal}
              setShowModal={setShowModal}
              currentSelectedStory={currentSelectedStory}
            />
          )}

          {isLoggedin && !showModal && (
            <AddStoryButton onPress={toggleAddModal} animated={modalValue} />
          )}
        </View>
      )}
    </View>
  );
};

export default index;
