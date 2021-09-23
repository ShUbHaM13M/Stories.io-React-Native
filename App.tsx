import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import RootAppNavigator from "./navigation/RootAppNavigator";
import { API_URL } from "./global";
import useFetch from "./hooks/useFetch";
import { useFonts } from "expo-font";
import ThemeProvider, { useTheme } from "./context/ThemeContext";
import { fonts } from "./global/fonts";
import Loading from "./components/Loading";
import AuthProvider from "./context/AuthContext";

export default function App() {
  const {
    loading: appLoading,
    error,
    value,
  } = useFetch(API_URL, { method: "GET" });

  const [loaded] = useFonts(fonts);

  return (
    <ThemeProvider>
      {loaded && <AppContainer appLoading={appLoading} />}
    </ThemeProvider>
  );
}

const AppContainer = ({ appLoading }: { appLoading: boolean }) => {
  const { isDarkMode, currentTheme } = useTheme();

  return (
    <AuthProvider>
      <View
        style={[
          styles.container,
          {
            backgroundColor: currentTheme.background,
          },
        ]}
      >
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        {appLoading ? <Loading /> : <RootAppNavigator />}
      </View>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
