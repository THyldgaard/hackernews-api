import axios from 'axios';

const STORIES_URL = 'https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty';
const USER_URL = (id: string) => `https://hacker-news.firebaseio.com/v0/user/${id}.json?print=pretty`;
const ITEM_URL = (id: number) => `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;

type Story = {
  id: number;
  title: string;
  by: string;
  url: string;
  score: number;
  time: number;
  type: string;
  descendants: number;
};

type Author = {
  id: string;
  about: string;
  created: number;
  karma: number;
  submitted: number[];
};

let cachedStories: Story[] = [];
let lastFetchTime: number = 0;
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes

export async function getStories(forceRefresh = false): Promise<Story[]> {
  const now = Date.now();
  if (!forceRefresh && now - lastFetchTime < CACHE_TTL) {
    return cachedStories;
  }

  try {
    const { data: storyIds }: { data: number[] } = await axios.get(STORIES_URL);
    const topIds = storyIds.slice(0, 10); 
    const storyPromises = topIds.map(id => axios.get(ITEM_URL(id)).then(res => res.data));
    const stories = await Promise.all(storyPromises);

    cachedStories = stories;
    lastFetchTime = now;

    return cachedStories;
  } catch (error) {
    console.error("Error fetching stories", error);
    return cachedStories; 
  }
}

export async function getAuthor(id: string): Promise<Author | null> {
  try {
    const { data } = await axios.get(USER_URL(id));
    return data;
  } catch (error) {
    console.error(`Error fetching user ${id}`, error);
    return null;
  }
}
