import React, { useCallback, useState, useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { BorderedContainer, Button, ThemedText } from "..";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
import { useTheme } from "../../context/ThemeContext";
import { API_URL, Comment as CommentType } from "../../global";
import ThemedInput from "../ThemedInput";
import Comment from "./Comment";
import NoComment from "./NoComment";

async function getAvatars(users: Array<string>) {
  const options: RequestInit = {
    method: "POST",
    body: JSON.stringify({ users }),
    headers: { "Content-Type": "application/json" },
  };
  const res = await fetch(`${API_URL}/api/user/get-avatar`, options);
  const data = await res.json();
  if (res.ok) {
    return data.data;
  }
}

interface CommentBoxProps {
  storySlug: string;
  writtenBy: string;
}

const CommentBox = ({ storySlug, writtenBy }: CommentBoxProps) => {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Array<CommentType>>([]);
  const { currentTheme } = useTheme();
  const { isLoggedin, user } = useAuth();
  const { socket } = useSocket();
  const [avatars, setAvatars] =
    useState<Array<{ username: string; avatar: any }>>();

  const fetchComments = useCallback(async () => {
    const FETCH_URL = `${API_URL}/api/story/${storySlug}/get-comments`;
    const res = await fetch(FETCH_URL);
    const data = await res.json();
    if (res.ok && data.type == "success") {
      setComments(data.comments);
    }
  }, [storySlug]);

  function _removeComment(comment_id: string) {
    setComments((prev) => prev.filter((c) => c._id !== comment_id));
  }

  const onDeleteButtonPressed = useCallback(
    async (comment_id: string) => {
      const DELETE_URL = `${API_URL}/api/story/${storySlug}/remove-comment/?comment_id=${comment_id}`;
      const res = await fetch(DELETE_URL);
      const data = await res.json();
      if (res.ok && data.type == "success") {
        _removeComment(comment_id);
        socket?.emit("delete-comment", { comment_id, storySlug });
      }
    },
    [comment]
  );

  const onAddCommentButtonPressed = useCallback(async () => {
    if (comment.length == 0 || comment == "") return;
    const ADD_URL = `${API_URL}/api/story/${storySlug}/add-comment/`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ content: comment, by: user?.username }),
      headers: { "Content-Type": "application/json" },
    };

    const res = await fetch(ADD_URL, options);
    const data = await res.json();
    if (res.ok && data.type == "success") {
      setComments(data.comments);
      setComment("");
      socket?.emit("add-comment", {
        by: user?.username,
        user: writtenBy,
        story: storySlug,
      });
    }
  }, [comment]);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    const users = comments
      .filter((v, i, self) => self.findIndex((t) => t.by === v.by) === i)
      .map((v) => v.by);
    (async () => setAvatars(await getAvatars(users)))();
  }, [comments]);

  useEffect(() => {
    if (!socket) return;
    socket.on(`${storySlug}-comment-deleted`, ({ comment_id }) => {
      _removeComment(comment_id);
    });
    return () => {
      socket.off(`${storySlug}-comment-deleted`);
    };
  }, [socket]);

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
            onPress={onAddCommentButtonPressed}
            extraStyles={styles.commentButton}
          >
            comment
          </Button>
        </View>
        {comments.map((comment, index) => {
          const uri = avatars?.find((v) => {
            if (v.username == comment.by) return true;
            return false;
          });
          return (
            <Comment
              key={index}
              onDeleteButtonPressed={onDeleteButtonPressed}
              avatar={uri?.avatar}
              comment={comment}
            />
          );
        })}
        {comments.length <= 0 && <NoComment />}
      </BorderedContainer>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  author: {
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
  },
  commentButton: {
    alignSelf: "center",
    marginVertical: 8,
  },
});

export default CommentBox;
