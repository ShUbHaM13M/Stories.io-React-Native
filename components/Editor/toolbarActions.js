import React from 'react'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

const iconSize = 20

const toolbarActions = [
  {
    component: (iconColor) => (
      <MaterialCommunityIcons name="format-header-1" size={iconSize} color={iconColor} />
    ),
    onLongMessage: "Add heading 1",
    mdPattern: "\n# ",
    cursorIncrement: 3,
  },
  {
    component: (iconColor) => (
      <MaterialCommunityIcons name="format-header-2" size={iconSize} color={iconColor} />
    ),
    onLongMessage: "Add heading 2",
    mdPattern: "\n## ",
    cursorIncrement: 4,
  },
  {
    component: (iconColor) => (
      <MaterialCommunityIcons name="format-header-3" size={iconSize} color={iconColor} />
    ),
    onLongMessage: "Add heading 3",
    mdPattern: "\n### ",
    cursorIncrement: 5,
  },
  {
    component: (iconColor) => (
      <MaterialCommunityIcons name="format-header-4" size={iconSize} color={iconColor} />
    ),
    onLongMessage: "Add heading 4",
    mdPattern: "\n#### ",
    cursorIncrement: 6,
  },
  {
    component: (iconColor) => (
      <MaterialCommunityIcons name="format-header-5" size={iconSize} color={iconColor} />
    ),
    onLongMessage: "Add heading 5",
    mdPattern: "\n##### ",
    cursorIncrement: 7,
  },
  {
    component: (iconColor) => (
      <MaterialCommunityIcons name="format-header-6" size={iconSize} color={iconColor} />
    ),
    onLongMessage: "Add heading 6",
    mdPattern: "\n###### ",
    cursorIncrement: 8,
  },
  {
    component: (iconColor) => (
      <MaterialCommunityIcons name="format-paragraph" size={iconSize} color={iconColor} />
    ),
    onLongMessage: "Add paragraph",
    mdPattern: " \n\n",
    cursorIncrement: 4,
  },
  {
    component: (iconColor) => (
      <MaterialCommunityIcons name="format-bold" size={iconSize} color={iconColor} />
    ),
    onLongMessage: "Bold",
    mdPattern: "****",
    cursorIncrement: 2,
  },
  {
    component: (iconColor) => (
      <MaterialCommunityIcons name="format-italic" size={iconSize} color={iconColor} />
    ),
    onLongMessage: "Italic",
    mdPattern: "**",
    cursorIncrement: 1,
  },
  {
    component: (iconColor) => (
      <MaterialCommunityIcons name="format-strikethrough" size={iconSize} color={iconColor} />
    ),
    onLongMessage: "Strikethrough",
    mdPattern: "~~~~",
    cursorIncrement: 2,
  },
  {
    component: (iconColor) => (
      <MaterialCommunityIcons name="format-list-bulleted" size={iconSize} color={iconColor} />
    ),
    onLongMessage: "Add unordered list",
    mdPattern: "- ",
    cursorIncrement: 2,
  },
  {
    component: (iconColor) => (
      <MaterialCommunityIcons name="format-list-numbered" size={iconSize} color={iconColor} />
    ),
    onLongMessage: "Add ordered list",
    mdPattern: "1. ",
    cursorIncrement: 3,
  },
  {
    component: (iconColor) => (
      <MaterialCommunityIcons name="format-quote-close" size={iconSize} color={iconColor} />
    ),
    onLongMessage: "Add a quote",
    mdPattern: "> ",
    cursorIncrement: 2,
  },
  {
    component: (iconColor) => (
      <MaterialCommunityIcons name="link" size={iconSize} color={iconColor} />
    ),
    onLongMessage: "Add a link",
    mdPattern: "[](http://enter_link_here)",
    cursorIncrement: 1,
  },
  {
    component: (iconColor) => (
      <MaterialIcons name="horizontal-rule" size={iconSize} color={iconColor} />
    ),
    onLongMessage: "Horizontal line",
    mdPattern: "\n\n___\n\n",
    cursorIncrement: 7,
  },
  {
    component: (iconColor) => (
      <MaterialCommunityIcons name="image" size={iconSize} color={iconColor} />
    ),
    onLongMessage: "Add an image",
    mdPattern:
      "![image](https://via.placeholder.com/150/00FFFF/000000/?text=Stories.io)",
    cursorIncrement: 2,
  },
  {
    component: (iconColor) => (
      <MaterialCommunityIcons name="code-tags" size={iconSize} color={iconColor} />
    ),
    onLongMessage: "Add code",
    mdPattern: "``",
    cursorIncrement: 1,
  }
];

export default toolbarActions