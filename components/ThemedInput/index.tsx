import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  StyleProp,
  ViewStyle,
} from "react-native";
import { BorderedContainer } from "..";
import { useTheme } from "../../context/ThemeContext";

interface ThemedInputProps extends TextInputProps {
  extraStyles?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  state: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const ThemedInput = ({
  extraStyles,
  containerStyle,
  state,
  setValue,
  ...props
}: ThemedInputProps) => {
  const { currentTheme } = useTheme();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <BorderedContainer
      extraStyles={{
        padding: 16,
        paddingHorizontal: 16,
        marginHorizontal: 0,
        backgroundColor: isFocused
          ? `${currentTheme.borderColor}66`
          : "transparent",
        ...(containerStyle as object),
      }}
    >
      <TextInput
        value={state}
        onChangeText={(text) => setValue(text)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={`${currentTheme.text}66`}
        style={[{ color: currentTheme.text, fontSize: 18 }, extraStyles]}
        {...props}
      />
    </BorderedContainer>
  );
};

export default ThemedInput;
