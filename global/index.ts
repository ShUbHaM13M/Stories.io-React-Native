import Constants from "expo-constants";

export const API_URL = Constants.manifest?.extra?.API_URL;

export type Story = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  likes: Array<string>;
  slug: string;
  convertedHtml: string;
  writtenBy: string;
};

export type Comment = {
  _id: string;
  content: string;
  by: string;
};
