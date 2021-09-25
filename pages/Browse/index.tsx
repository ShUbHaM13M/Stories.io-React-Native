import React from "react";
import { View, FlatList } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import Loading from "../../components/Loading";
import StoryPreview from "../../components/StoryPreview";
import { Title } from "../../components";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import AddStoryButton from "../../components/AddStoryButton";
import { useStory } from "../../context/StoryContext";

const index = () => {
  const { loading, stories } = useStory();
  const { currentTheme } = useTheme();
  const { isLoggedin, logoutUser } = useAuth();
  const route = useRoute();

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
            data={stories}
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
