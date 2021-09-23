import React from "react";
import { View, FlatList, Dimensions } from "react-native";
import { API_URL } from "../../global";
import useFetch from "../../hooks/useFetch";
import { useTheme } from "../../context/ThemeContext";
import Loading from "../../components/Loading";
import StoryPreview from "../../components/StoryPreview";
import { Button, ThemedText, Title } from "../../components";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import AddStoryButton from "../../components/AddStoryButton";

const index = () => {
  const { loading, error, value } = useFetch(`${API_URL}/api/story`, {});
  const route = useRoute();

  const { currentTheme } = useTheme();
  const { isLoggedin, logoutUser } = useAuth();

  return (
    <>
      {loading ? (
        <Loading offsetY={50} />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: currentTheme.background,
            position: "relative",
          }}
        >
          <Title extraStyle={{ marginVertical: 10, marginLeft: 16 }}>
            {route.name}
          </Title>
          <FlatList
            data={value.stories}
            style={{
              flex: 1,
            }}
            renderItem={({ item }) => <StoryPreview story={item} />}
            keyExtractor={(story) => story._id}
          />
          {isLoggedin && <AddStoryButton onPress={() => null} />}
        </View>
      )}
    </>
  );
};

export default index;
