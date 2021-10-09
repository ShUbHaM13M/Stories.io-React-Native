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
import ErrorProvider from "./context/ErrorContext";
import { ThemedText } from "./components";
import { error as errorColor } from "./global/colors";

export default function App() {
  const {
    loading: appLoading,
    error,
    value,
  } = useFetch(`${API_URL}/wake-up`, { method: "GET" });

  const [loaded] = useFonts(fonts);

  return (
    <ThemeProvider>
      {loaded && (
        <ErrorProvider>
          {error ? (
            <View style={[styles.container, { justifyContent: "center" }]}>
              <ThemedText styles={styles.errorText}>
                {"Error connecting to the server \n please try again later :/"}
              </ThemedText>
            </View>
          ) : (
            <AppContainer appLoading={appLoading} />
          )}
        </ErrorProvider>
      )}
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
  errorText: {
    fontSize: 18,
    color: errorColor,
    fontFamily: "Montserrat-Medium",
    alignSelf: "center",
  },
});
