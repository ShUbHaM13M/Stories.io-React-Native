import SvgUri from "expo-svg-uri";
import React, { useCallback, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { BorderedContainer, Button, ThemedText, Title } from "../../components";
import ThemedInput from "../../components/ThemedInput";
import { useTheme } from "../../context/ThemeContext";
import { FontAwesome } from "@expo/vector-icons";
import IconButton from "../../components/IconButton";
import { useError } from "../../context/ErrorContext";
import { API_URL, toastMessage } from "../../global";
import { generateRandomAvatar } from "../../global/avatars";
import Loading from "../../components/Loading";

const passwordPlaceholder = Math.random().toString(16).substr(2, 8);
const { height, width } = Dimensions.get("window");

const SignUp = () => {
  const { currentTheme } = useTheme();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<string>(generateRandomAvatar());
  const [loading, setLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { setError } = useError();

  const onSubmit = async () => {
    setLoading(true);
    setIsDisabled(true);
    const url = `${API_URL}/api/auth/register`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ username, email, password, avatar }),
      headers: { "Content-Type": "application/json" },
    };
    try {
      const res = await fetch(url, options);
      const data = await res.json();

      if (res.ok && data.type == "success") {
        setError(data);
      }

      if (data.type === "danger") {
        setError(data);
      }
    } catch (err: any) {
      setError({ message: err.message, type: "danger" });
    }

    setUsername("");
    setEmail("");
    setPassword("");
    setIsDisabled(false);
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: currentTheme.background }}>
      <BorderedContainer extraStyles={{ marginTop: 20 }}>
        <ScrollView>
          <Title extraStyle={styles.title}>Sign up</Title>

          <View style={styles.avatarContainer}>
            <View
              style={[
                styles.avatar,
                {
                  borderColor: `${currentTheme.borderColor}88`,
                  backgroundColor: `${currentTheme.borderColor}33`,
                },
              ]}
            >
              <SvgUri width={55} height={55} source={{ uri: avatar }} />
            </View>
            <IconButton
              extraStyles={{
                borderWidth: 1,
                borderColor: `${currentTheme.borderColor}88`,
                marginLeft: 8,
              }}
              onButtonPress={() => setAvatar(generateRandomAvatar())}
              onLongPress={() => toastMessage("Generate a random avatar")}
            >
              <FontAwesome
                name="random"
                size={24}
                color={`${currentTheme.text}bb`}
              />
            </IconButton>
          </View>

          <ThemedText>Username</ThemedText>
          <ThemedInput
            autoFocus
            state={username}
            setValue={setUsername}
            placeholder="SeyTonic@13"
            editable={!isDisabled}
          />
          <ThemedText>Email</ThemedText>
          <ThemedInput
            keyboardType="email-address"
            state={email}
            setValue={setEmail}
            autoCompleteType="email"
            placeholder="SeyTonic@mail.com"
            editable={!isDisabled}
          />
          <ThemedText>Password</ThemedText>
          <ThemedInput
            state={password}
            setValue={setPassword}
            placeholder={passwordPlaceholder}
            secureTextEntry
            editable={!isDisabled}
          />
          <Button
            disabled={isDisabled}
            onPress={onSubmit}
            extraStyles={styles.signUpButton}
          >
            Sign up
          </Button>
        </ScrollView>
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
  title: {
    textAlign: "center",
    marginBottom: 10,
    paddingBottom: 10,
    fontSize: 28,
    borderBottomWidth: 1,
  },
  signUpButton: {
    alignSelf: "center",
    marginVertical: 16,
  },
  avatar: {
    borderWidth: 2,
    borderRadius: 2,
    alignItems: "center",
    padding: 2,
    marginRight: 4,
  },
  avatarContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUp;
