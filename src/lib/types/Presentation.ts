import type {CacheItem} from "svelte-cache-store";

export interface Presentation extends CacheItem {
  title: string;
  content: string;
  theme: "black" | "white";
  backgroundUrl?: string;
  footerImageUrl?: string;
  youtubeVideoId?: string;
  isPublished: boolean;
  isVisible: boolean;
  createdAt: string; // ISO date string
  updatedAt: string | null; // ISO date string or null
}