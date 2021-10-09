import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import Browse from "../pages/Browse";
import Story from "../pages/Story";
import StoryProvider from "../context/StoryContext";
import UserStories from "../pages/UserStories";
import { useAuth } from "../context/AuthContext";
import SocketProvider from "../context/SocketContext";
import EditStory from "../pages/EditStory";
import ChangeAvatar from "../pages/ChangeAvatar";

const Stack = createNativeStackNavigator();

function BrowseStack() {
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: "slide_from_right",
  };

  const { user } = useAuth();

  return (
    <SocketProvider id={user?.id}>
      <StoryProvider>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="Browse" component={Browse} />
          <Stack.Screen name="Story" component={Story} />
          <Stack.Screen name="EditStory" component={EditStory} />
          <Stack.Screen name="ChangeAvatar" component={ChangeAvatar} />

          {user && (
            <Stack.Screen
              name={`${user.username}'s Stories`}
              component={UserStories}
            />
          )}
        </Stack.Navigator>
      </StoryProvider>
    </SocketProvider>
  );
}

export default BrowseStack;
