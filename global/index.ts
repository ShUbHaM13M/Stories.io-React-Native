import Constants from "expo-constants";
import { Alert, Platform, ToastAndroid } from "react-native";

export const API_URL: string = Constants.manifest?.extra?.API_URL;

export function toastMessage(msg: string) {
  if (Platform.OS === "android") {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(msg);
  }
}

export type Story = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  likes: Array<string>;
  slug: string;
  writtenBy: string;
  isPrivate: boolean;
};

export type Comment = {
  _id: string;
  content: string;
  by: string;
};
