import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { ThemedText, Title } from "../../components";
import Loading from "../../components/Loading";
import DeleteModal from "../../components/Modal/DeleteModal";
import StoryPreview from "../../components/StoryPreview";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { API_URL, Story } from "../../global";

const UserStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefresing, setIsRefresing] = useState<boolean>(false);
  const route = useRoute();
  const navigation = useNavigation();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentSelectedStory, setCurrentSelectedStory] =
    useState<{ storyTitle: string; id: string }>();

  function onDeleteButtonPressed(storyTitle: string, id: string) {
    setShowModal(true);
    setCurrentSelectedStory({ storyTitle, id });
  }

  const { user } = useAuth();
  const { currentTheme } = useTheme();

  const fetchStories = useCallback(async () => {
    const STORY_URL = `${API_URL}/api/story/?page=${page}&username=${user?.username}`;
    const res = await fetch(STORY_URL);
    const data = await res.json();
    if (res.ok) {
      setStories((prev) => [...prev, ...data.stories]);
    }
  }, [page]);

  const resetStories = () => {
    setStories([]);
    setPage(1);
    setLoading(true);
    fetchStories();
    setLoading(false);
  };

  const deleteFinishedCallback = () => {
    if (currentSelectedStory)
      setStories((prev) =>
        prev.filter((story) => story._id !== currentSelectedStory.id)
      );
  };

  useEffect(() => {
    setLoading(true);
    fetchStories();
    setLoading(false);
  }, [page]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: currentTheme.background,
      }}
    >
      {loading && <Loading offsetY={50} />}
      {!loading && stories && (
        <View style={{ flex: 1 }}>
          <Title extraStyle={{ marginVertical: 10, marginLeft: 16 }}>
            {route.name}
          </Title>
          {stories.length > 0 ? (
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
              onEndReachedThreshold={0.5}
              onEndReached={({ distanceFromEnd }) => {
                if (distanceFromEnd >= 0) setPage((prev) => prev + 1);
              }}
              renderItem={({ item }) => (
                <StoryPreview
                  story={item}
                  showIsPrivate
                  onDeleteKeyPressed={onDeleteButtonPressed}
                />
              )}
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
              keyExtractor={(story) => story._id}
            />
          ) : (
            <ThemedText
              styles={{
                fontSize: 18,
                marginTop: 20,
                marginLeft: 16,
                fontFamily: "Montserrat-Light",
              }}
            >
              You haven't written any stories yet {"\n"}
              <ThemedText
                styles={{
                  color: currentTheme.name == "dark" ? "#8cbad3" : "#1A0DC0",
                }}
                onPress={() => navigation.navigate("Browse")}
              >
                Write some stories ?
              </ThemedText>
            </ThemedText>
          )}
        </View>
      )}
      <DeleteModal
        deleteFinishedCallback={deleteFinishedCallback}
        showModal={showModal}
        setShowModal={setShowModal}
        currentSelectedStory={currentSelectedStory}
      />
    </View>
  );
};

export default UserStories;
