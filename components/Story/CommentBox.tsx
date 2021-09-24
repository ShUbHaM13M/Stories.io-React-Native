import React from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { BorderedContainer, Button, ThemedText } from "..";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { CommentBoxProps } from "../../global";
import ThemedInput from "../ThemedInput";

const CommentBox = ({ comments }: CommentBoxProps) => {
  const [comment, setComment] = React.useState<string>("");
  const { currentTheme } = useTheme();
  const { isLoggedin, user } = useAuth();

  return (
    <KeyboardAvoidingView>
      <BorderedContainer extraStyles={{ marginBottom: 16 }}>
        <ThemedText
          styles={{
            fontSize: 18,
            fontFamily: "Montserrat-SemiBold",
          }}
        >
          Comments
        </ThemedText>
        <View style={{ flex: 1 }}>
          <ThemedInput
            editable={isLoggedin}
            placeholder="Write a comment.."
            state={comment}
            setValue={setComment}
            multiline
            maxLength={200}
            containerStyle={{
              borderColor: !isLoggedin
                ? `${currentTheme.borderColor}66`
                : currentTheme.borderColor,
            }}
            selectionColor={currentTheme.name == "light" ? "white" : "black"}
          />
          <Button
            color={!isLoggedin ? `${currentTheme.borderColor}66` : undefined}
            disabled={!isLoggedin}
            extraStyles={styles.commentButton}
          >
            comment
          </Button>
        </View>
        {comments.map((comment, index) => (
          <BorderedContainer key={index} extraStyles={styles.comment}>
            <ThemedText styles={styles.author}>{comment.by}</ThemedText>
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
        ))}
        {comments.length <= 0 && (
          <View
            style={[
              { borderTopColor: `${currentTheme.borderColor}66` },
              styles.divider,
            ]}
          >
            <ThemedText styles={styles.noCommentsFont}>
              No comments yet
            </ThemedText>
          </View>
        )}
      </BorderedContainer>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  author: {
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
  },
  comment: {
    justifyContent: "space-between",
    marginHorizontal: 0,
    padding: 10,
  },
  commentButton: {
    alignSelf: "center",
    marginVertical: 8,
  },
  commentContent: {
    marginTop: 4,
    paddingTop: 4,
    borderTopWidth: 1,
  },
  noCommentsFont: {
    textAlign: "center",
    fontFamily: "Montserrat-Light",
    fontSize: 16,
  },
  divider: {
    marginTop: 8,
    borderTopWidth: 1,
    paddingTop: 8,
  },
});

export default CommentBox;
