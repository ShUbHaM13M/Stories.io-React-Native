import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import { BorderedContainer, ThemedText, Title, Button } from "../../components";
import ThemedInput from "../../components/ThemedInput";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const passwordPlaceholder = Math.random().toString(16).substr(2, 8);

const Login = () => {
  const { currentTheme } = useTheme();
  const { loginUser } = useAuth();

  const navigation = useNavigation();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View style={{ flex: 1, backgroundColor: currentTheme.background }}>
      <KeyboardAvoidingView>
        <BorderedContainer extraStyles={{ marginTop: 20 }}>
          <Title
            extraStyle={{
              textAlign: "center",
              marginBottom: 20,
              fontSize: 28,
            }}
          >
            Login
          </Title>
          <ThemedText>Username</ThemedText>
          <ThemedInput
            state={username}
            setValue={setUsername}
            placeholder="SeyTonic@13"
          />
          <ThemedText styles={{ marginTop: 8 }}>Password</ThemedText>
          <ThemedInput
            state={password}
            setValue={setPassword}
            placeholder={passwordPlaceholder}
            secureTextEntry
          />
          <Button
            onPress={() => {
              loginUser(username, password);
              navigation.navigate("BrowseStack", {});
            }}
            extraStyles={{ alignSelf: "center", marginVertical: 16 }}
          >
            Login
          </Button>
        </BorderedContainer>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
