import React, { useEffect, useState, useContext, useCallback } from "react";
import { API_URL, Story } from "../global";
import { useSocket } from "./SocketContext";

interface DefaultProps {
  stories: Array<Story>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  removeStory: (id: string) => void;
  updateStory: (story: Story) => void;
  addNewStory: (story: Story) => void;
  resetStories: () => void;
}

const StoryContext = React.createContext<DefaultProps>({
  stories: [],
  setPage: () => {},
  loading: true,
  removeStory: () => {},
  updateStory: (story: Story) => {},
  addNewStory: (story: Story) => {},
  resetStories: () => {},
});

export function useStory() {
  return useContext(StoryContext);
}

interface StoryProviderProps {
  children: React.ReactNode;
}

function _getUniqueArray(arr: Array<any>, keyProps: string[]): Story[] {
  return Object.values(
    arr.reduce((uniqueMap, entry) => {
      const key = keyProps.map((k) => entry[k]).join("|");
      if (!(key in uniqueMap)) uniqueMap[key] = entry;
      return uniqueMap;
    }, {})
  );
}

const StoryProvider = ({ children }: StoryProviderProps) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const { socket } = useSocket();

  const fetchStories = useCallback(async () => {
    const STORY_URL = `${API_URL}/api/story/?page=${page}`;
    const res = await fetch(STORY_URL);
    const data = await res.json();
    if (res.ok && data.type === "success") {
      const newStories = [...stories, ...data.stories];
      const uniqueStories = _getUniqueArray(newStories, ["_id"]);
      setStories(uniqueStories);
    }
  }, [page]);

  const removeStory = (id: string) => {
    setStories((prev) => prev.filter((story) => story._id !== id));
  };

  const updateStory = (story: Story) => {
    setStories((prev) =>
      prev.map((data) => {
        if (data._id == story._id) return { ...data, ...story };
        return data;
      })
    );
  };

  const addNewStory = (story: Story) => {
    setStories((prev) => [...prev, story]);
  };

  const _updateLikes = (storySlug: string, likes: string[]) => {
    setStories((prev) =>
      prev.map((story) => {
        if (story.slug === storySlug) return story;
        return { ...story, likes };
      })
    );
  };

  const resetStories = () => {
    setStories([]);
    setPage(1);
    setLoading(true);
    fetchStories();
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchStories();
    setLoading(false);
  }, [page]);

  useEffect(() => {
    if (!socket) return;
    socket.on("story-liked", ({ totalLikes, storySlug }) => {
      _updateLikes(storySlug, totalLikes);
    });
    socket.on("new-story-added", ({ newStory }) => {
      addNewStory(newStory);
    });
    socket.on("story-deleted", ({ storyId }) => {
      removeStory(storyId);
    });
    return () => {
      socket.off("story-liked");
      socket.off("new-story-added");
      socket.off("story-deleted");
    };
  }, [socket]);

  const value = {
    stories,
    setPage,
    loading,
    removeStory,
    updateStory,
    setStories,
    addNewStory,
    resetStories,
  };

  return (
    <StoryContext.Provider value={value}>
      {!loading && children}
    </StoryContext.Provider>
  );
};

export default StoryProvider;
