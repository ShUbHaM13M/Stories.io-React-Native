import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import Browse from "../pages/Browse";
import Story from "../pages/Story";

const Stack = createNativeStackNavigator();

function BrowseStack() {
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Browse" component={Browse} />
      <Stack.Screen name="Story" component={Story} />
    </Stack.Navigator>
  );
}

export default BrowseStack;
