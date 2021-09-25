import React, { useEffect, useState, useContext, useCallback } from "react";
import { API_URL, Comment, Story } from "../global";
import { useAuth } from "./AuthContext";

interface DefaultProps {
  stories: Array<Story>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}

const StoryContext = React.createContext<DefaultProps>({
  stories: [],
  setLimit: () => {},
  setPage: () => {},
  loading: true,
});

export function useStory() {
  return useContext(StoryContext);
}

interface StoryProviderProps {
  children: React.ReactNode;
}

const StoryProvider = ({ children }: StoryProviderProps) => {
  const [stories, setStories] = useState<Array<Story>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const { user } = useAuth();

  const fetchStories = useCallback(async () => {
    const STORY_URL = `${API_URL}/api/story/?limit=${limit}&page=${page}`;
    const res = await fetch(STORY_URL);
    const data = await res.json();
    if (res.ok) {
      setStories((prev) => [...prev, ...data.stories]);
    }
  }, [limit, page]);

  useEffect(() => {
    setLoading(true);
    fetchStories();
    setLoading(false);

    return () => setStories([]);
  }, []);

  const value = {
    stories,
    setLimit,
    setPage,
    loading,
  };

  return (
    <StoryContext.Provider value={value}>
      {!loading && children}
    </StoryContext.Provider>
  );
};

export default StoryProvider;
