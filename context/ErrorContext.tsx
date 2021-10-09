import { BlurView } from "expo-blur";
import React, { useContext, useState, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { BorderedContainer, ThemedText } from "../components";
import { useTheme } from "./ThemeContext";

type Error = {
  message: string;
  type: "danger" | "success";
};

interface DefaultProps {
  setError: React.Dispatch<React.SetStateAction<Error>>;
}

const ErrorContext = React.createContext<DefaultProps>({
  setError: () => {},
});

export function useError() {
  return useContext(ErrorContext);
}

interface ErrorProviderProps {
  children: React.ReactNode;
}

const { height, width } = Dimensions.get("window");
const WIDTH = 250;
const successColor = "#82B658",
  errorColor = "#ff3e3e";

const initialValue: Error = {
  message: "",
  type: "danger",
};

const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const [error, setError] = useState<Error>(initialValue);

  const animated = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    const transform = [
      {
        translateX: interpolate(
          animated.value,
          [0, 1],
          [-width, width * 0.5 - WIDTH * 0.5]
        ),
      },
    ];
    const opacity = interpolate(animated.value, [0, 1], [0, 1]);
    return { transform, opacity };
  });

  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (error.message) {
      animated.value = withSpring(1);
      setTimeout(() => {
        animated.value = withSpring(0);
      }, 4000);
      setTimeout(() => {
        setError(initialValue);
      }, 5500);
    }
  }, [error]);

  const value = {
    setError,
  };

  return (
    <ErrorContext.Provider value={value}>
      <>
        {children}
        {error && (
          <Animated.View
            style={[
              styles.container,
              {
                backgroundColor:
                  error.type === "danger"
                    ? `${errorColor}aa`
                    : `${successColor}22`,
                borderColor:
                  error.type === "danger" ? errorColor : successColor,
              },
              animatedStyles,
            ]}
          >
            <BlurView
              intensity={120}
              tint={isDarkMode ? "dark" : "light"}
              style={{ padding: 16 }}
            >
              <Text
                style={[
                  styles.errorText,
                  {
                    color: error.type === "danger" ? errorColor : successColor,
                  },
                ]}
              >
                {error.message}
              </Text>
            </BlurView>
          </Animated.View>
        )}
      </>
    </ErrorContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: WIDTH,
    top: height * 0.2,
    borderWidth: 2,
    zIndex: 10,
  },
  errorText: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    flex: 1,
  },
});

export default ErrorProvider;
