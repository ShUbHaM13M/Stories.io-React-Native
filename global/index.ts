import Constants from "expo-constants";

export const API_URL = Constants.manifest?.extra?.API_URL;

export type Story = {
  title: string;
  content: string;
  createdAt: string;
  likes: Array<string>;
  slug: string;
  convertedHtml: string;
  writtenBy: string;
  comments: Array<Comment>;
};

export type Comment = {
  content: string;
  by: string;
};

export interface CommentBoxProps {
  comments: Array<Comment>;
}
