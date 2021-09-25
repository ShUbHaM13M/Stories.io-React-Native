import SvgUri from "expo-svg-uri";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BorderedContainer, Button, ThemedText } from "..";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { API_URL, Comment as CommentType } from "../../global";
import IconButton from "../IconButton";
import Svg, { Path } from "react-native-svg";

interface CommentProps {
  comment: CommentType;
  avatar: string | undefined;
  onDeleteButtonPressed: (comment_id: string) => {};
}

const Comment = ({ comment, avatar, onDeleteButtonPressed }: CommentProps) => {
  const { currentTheme } = useTheme();
  const { user } = useAuth();

  return (
    <BorderedContainer extraStyles={styles.comment}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
          {avatar && (
            <View style={{ backgroundColor: currentTheme.borderColor }}>
              <SvgUri
                width={30}
                height={30}
                source={{
                  uri:
                    avatar ||
                    "https://placeholder.pics/svg/30x30/ADFFDD-D17FFF",
                }}
              />
            </View>
          )}
          <ThemedText styles={styles.author}>{comment.by}</ThemedText>
        </View>
        {user?.username == comment.by && (
          <IconButton
            isToggled={false}
            onButtonPress={() => onDeleteButtonPressed(comment._id)}
            extraStyles={{ padding: 6 }}
          >
            <Svg width={25} height={26} fill="none">
              <Path
                d="M3.125 7.161h18.75M8.333 7.161V5.078a2.083 2.083 0 012.084-2.084h4.166a2.083 2.083 0 012.084 2.084V7.16m3.125 0v14.583a2.083 2.083 0 01-2.084 2.084H7.292a2.083 2.083 0 01-2.084-2.084V7.161h14.584z"
                stroke="#ff3e3e"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </IconButton>
        )}
      </View>
      <ThemedText
        styles={[
          {
            borderTopColor: `${currentTheme.borderColor}66`,
          },
          styles.commentContent,
        ]}
      >
        {comment.content}
      </ThemedText>
    </BorderedContainer>
  );
};

const styles = StyleSheet.create({
  commentContent: {
    marginTop: 4,
    paddingTop: 4,
    borderTopWidth: 1,
  },
  author: {
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    marginLeft: 4,
  },
  comment: {
    justifyContent: "space-between",
    marginHorizontal: 0,
    padding: 10,
  },
});

export default Comment;
