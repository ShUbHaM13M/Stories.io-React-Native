import { NavigationProp, useNavigation } from "@react-navigation/core";
import SvgUri from "expo-svg-uri";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, ThemedText } from "..";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const UserDashboard = () => {
  const { currentTheme } = useTheme();
  const { user, logoutUser } = useAuth();
  const navigation = useNavigation();

  return (
    <View
      style={[
        { borderTopColor: `${currentTheme.borderColor}33` },
        styles.container,
      ]}
    >
      <View style={{ flexDirection: "row" }}>
        <View
          style={[
            styles.avatar,
            {
              borderColor: `${currentTheme.borderColor}88`,
              backgroundColor: `${currentTheme.borderColor}33`,
            },
          ]}
        >
          <SvgUri width={55} height={55} source={{ uri: user?.avatar }} />
        </View>
        <View style={{ flex: 1, paddingTop: 4 }}>
          <ThemedText styles={styles.usernameText}>{user?.username}</ThemedText>
          <ThemedText lineBreakMode="clip" styles={styles.idText}>
            {user?.id}
          </ThemedText>
        </View>
      </View>
      <Button extraStyles={{ marginTop: 20 }}>Your Stories</Button>
      <Button
        extraStyles={{ marginTop: 8 }}
        onPress={() => {
          // @ts-ignore
          navigation.navigate("BrowseStack", {});
          logoutUser();
        }}
      >
        logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 2,
    flex: 1,
  },
  avatar: {
    borderWidth: 2,
    borderRadius: 2,
    alignItems: "center",
    padding: 2,
    marginRight: 4,
  },
  usernameText: {
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
  },
  idText: {
    fontFamily: "Montserrat-Light",
    marginTop: 4,
    fontSize: 13,
  },
});

export default UserDashboard;
