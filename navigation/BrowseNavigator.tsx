import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import Browse from "../pages/Browse";
import Story from "../pages/Story";
import StoryProvider from "../context/StoryContext";

const Stack = createNativeStackNavigator();

function BrowseStack() {
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <StoryProvider>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Browse" component={Browse} />
        <Stack.Screen name="Story" component={Story} />
      </Stack.Navigator>
    </StoryProvider>
  );
}

export default BrowseStack;
