import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerItemList,
  DrawerNavigationOptions,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { useTheme } from "../context/ThemeContext";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { dark, light } from "../global/colors";
import { RNSwitch, ThemedText } from "../components";
import BrowseStack from "./BrowseNavigator";
import { useAuth, User } from "../context/AuthContext";
import About from "../pages/About";
import UserDashboard from "../components/UserDashboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "../components/IconButton";

const Drawer = createDrawerNavigator();

const defaultScreenOptions: DrawerNavigationOptions = {
  drawerPosition: "right",
  drawerType: "back",
  keyboardDismissMode: "on-drag",
  headerLeft: () => null,
  headerTitle: "Stories.io",
  headerTitleStyle: {
    fontFamily: "Montserrat-Medium",
  },
  swipeEdgeWidth: 80,
  drawerItemStyle: {
    borderRadius: 0,
  },
  drawerLabelStyle: {
    fontSize: 18,
    fontFamily: "Montserrat",
  },
  drawerStatusBarAnimation: "fade",
};

export default function () {
  const { currentTheme, setCurrentTheme } = useTheme();
  const { isLoggedin, user } = useAuth();
  const screenOptions: DrawerNavigationOptions = {
    headerStyle: {
      elevation: 0,
      backgroundColor: currentTheme.navColor,
    },
    headerTintColor: currentTheme.text,
    drawerActiveBackgroundColor: `${currentTheme.borderColor}33`,
    drawerInactiveTintColor: currentTheme.text,
    drawerActiveTintColor: currentTheme.borderColor,
  };

  const drawerContent = (props: DrawerContentComponentProps) => {
    const changeTheme = () => {
      setCurrentTheme((prev) => (prev.name == "light" ? dark : light));
    };

    return (
      <View style={{ flex: 1, backgroundColor: currentTheme.navColor }}>
        <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
          <DrawerItemList {...props} />
          {user && <UserDashboard />}
        </SafeAreaView>
        <DrawerBottom changeTheme={changeTheme} />
      </View>
    );
  };

  const drawerScreenOptions: DrawerNavigationOptions = {
    drawerActiveTintColor: currentTheme.borderColor,
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Browse"
        screenOptions={({ navigation }) => ({
          ...screenOptions,
          ...defaultScreenOptions,
          headerRight: () => (
            <IconButton
              extraStyles={{ marginRight: 8 }}
              onButtonPress={() => navigation.toggleDrawer()}
            >
              <MaterialCommunityIcons
                name="menu"
                size={30}
                color={currentTheme.borderColor}
              />
            </IconButton>
          ),
        })}
        drawerContent={drawerContent}
      >
        <Drawer.Screen
          options={{ drawerLabel: "Browse" }}
          name="BrowseStack"
          component={BrowseStack}
        />
        {!isLoggedin && (
          <>
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen
              options={{ drawerLabel: "Sign up" }}
              name="SignUp"
              component={SignUp}
            />
          </>
        )}
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const DrawerBottom = ({ changeTheme }: { changeTheme: () => void }) => {
  const { currentTheme, isDarkMode } = useTheme();

  return (
    <View
      style={{
        alignSelf: "stretch",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        paddingBottom: 20,
        alignItems: "center",
        borderTopColor: `${currentTheme.text}22`,
        borderTopWidth: 1,
      }}
    >
      <ThemedText styles={{ fontSize: 16 }}> Dark Theme </ThemedText>

      <RNSwitch
        value={isDarkMode}
        activeTrackColor={currentTheme.borderColor}
        inActiveTrackColor={currentTheme.borderColor}
        thumbColor={currentTheme.background}
        handleOnPress={changeTheme}
      />
    </View>
  );
};
