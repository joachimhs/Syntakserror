import type {CacheItem} from "svelte-cache-store";

export interface Article extends CacheItem{
  title: string;
  publishedDate: string; // ISO date
  topics: string;        // comma-separated in the API payload
  preamble: string;
  thumbnail: string;
  contents: string;      // markdown string
  author: string;
};