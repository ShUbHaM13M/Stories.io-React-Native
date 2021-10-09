import React from "react";
import { View, Text, StyleSheet, Image, Linking } from "react-native";
import { BorderedContainer, Button, ThemedText, Title } from "../../components";
import { useTheme } from "../../context/ThemeContext";
import techUseds from "./techUseds";
import { Fontisto } from "@expo/vector-icons";
import { error } from "../../global/colors";

const IMAGE_SIZE = 55;

const About = () => {
  const { currentTheme } = useTheme();

  const borderColor = `${currentTheme.borderColor}bb`;

  return (
    <View
      style={[styles.container, { backgroundColor: currentTheme.background }]}
    >
      <Title extraStyle={{ marginLeft: 16, marginBottom: 8 }}>About</Title>
      <BorderedContainer extraStyles={{ flex: 1 }}>
        <View style={[styles.header, { borderColor }]}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.appImage}
          />
          <ThemedText styles={styles.logoText}>Stories.io</ThemedText>
        </View>
        <View>
          <View>
            <ThemedText
              styles={{
                fontSize: 20,
                fontFamily: "Montserrat-Medium",
              }}
            >
              Made with 💙 using :
            </ThemedText>
            {techUseds.map((tech, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  paddingVertical: 4,
                }}
              >
                <View style={styles.techIcon}>
                  {tech.component(currentTheme.text)}
                </View>
                <ThemedText styles={styles.text}>{tech.name}</ThemedText>
              </View>
            ))}
          </View>
        </View>
        <View
          style={{
            marginTop: 16,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onPress={() =>
              Linking.openURL(
                "mailto:stories.io@yahoo.com?subject=Bug report&body=I found the following bug... :x"
              )
            }
            color={error}
          >
            Found a bug ?
          </Button>
        </View>
        <View
          style={{
            borderTopColor: borderColor,
            borderTopWidth: 1,
            paddingTop: 8,
          }}
        >
          <ThemedText
            styles={{
              textAlign: "center",
              fontFamily: "Montserrat-Light",
              color: borderColor,
            }}
          >
            This app was made as project for last year
          </ThemedText>
        </View>
      </BorderedContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  appImage: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
  },
  logoText: {
    marginLeft: 8,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: "Montserrat-Light",
    marginLeft: 8,
    marginTop: 8,
  },
  techIcon: {
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default About;
