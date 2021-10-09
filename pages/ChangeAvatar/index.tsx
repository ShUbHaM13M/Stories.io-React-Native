import SvgUri from "expo-svg-uri";
import React, { useCallback, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BorderedContainer, Button, Title } from "../../components";
import IconButton from "../../components/IconButton";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { generateRandomAvatar, getAvatar } from "../../global/avatars";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API_URL, toastMessage } from "../../global";
import { useError } from "../../context/ErrorContext";
import { useNavigation } from "@react-navigation/core";
import Loading from "../../components/Loading";

const { height, width } = Dimensions.get("window");
const ChangeAvatar = () => {
  const { user, updateAvatar } = useAuth();
  const { currentTheme } = useTheme();
  const [avatar, setAvatar] = useState<string>(
    user?.avatar || generateRandomAvatar()
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { setError } = useError();
  const navigation = useNavigation();

  const borderColor = `${currentTheme.borderColor}88`;

  const onUpdateButtonPressed = useCallback(async () => {
    setLoading(true);
    const url = `${API_URL}/api/user/update-avatar`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ username: user?.username, avatar }),
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch(url, options);
    const data = await res.json();
    if (res.ok && data.type === "success") {
      updateAvatar(avatar);
      setLoading(false);
      setError({ type: "success", message: "Updated Your avatar" });
      navigation.navigate("Browse");
      return;
    }
    setError({
      type: "danger",
      message: "Error occured while updating the avatar, try again later.",
    });
    setLoading(false);
  }, [user, avatar]);

  return (
    <View
      style={[styles.container, { backgroundColor: currentTheme.background }]}
    >
      <BorderedContainer extraStyles={{ marginTop: 20 }}>
        <Title extraStyle={styles.title}>Change Avatar</Title>
        <View
          style={[
            styles.avatar,
            {
              borderColor,
              backgroundColor: `${currentTheme.borderColor}33`,
            },
          ]}
        >
          <SvgUri width={80} height={80} source={{ uri: avatar }} />
        </View>
        <View style={styles.actions}>
          <IconButton
            extraStyles={{
              borderWidth: 2,
              borderColor,
            }}
            onLongPress={() => toastMessage("Generate random avatar")}
            onButtonPress={() => setAvatar(generateRandomAvatar())}
          >
            <MaterialCommunityIcons
              name="shuffle"
              size={28}
              color={`${currentTheme.text}bb`}
            />
          </IconButton>
          <IconButton
            extraStyles={{
              borderWidth: 2,
              borderColor,
              marginLeft: 8,
            }}
            onLongPress={() => toastMessage("Generate random avatar")}
            onButtonPress={() =>
              setAvatar(getAvatar(user?.username || "default"))
            }
          >
            <MaterialCommunityIcons
              name="replay"
              size={28}
              color={`${currentTheme.text}bb`}
            />
          </IconButton>
        </View>
        <Button
          onPress={onUpdateButtonPressed}
          extraStyles={styles.updateButton}
        >
          Update avatar
        </Button>
      </BorderedContainer>
      {loading && (
        <View
          style={{
            position: "absolute",
            height: height,
            top: -20,
            width: width,
            backgroundColor: `${currentTheme.background}aa`,
          }}
        >
          <Loading />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    textAlign: "center",
  },
  avatar: {
    borderWidth: 2,
    borderRadius: 2,
    alignItems: "center",
    alignSelf: "center",
    padding: 2,
    marginRight: 4,
    marginVertical: 10,
  },
  actions: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 10,
  },
  updateButton: {
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default ChangeAvatar;
