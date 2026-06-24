import data from "./journalPosts.json";
import { NEW_POSTS } from "./journalPostsNew";

// Journal posts. The 15 migrated from the previous website keep their original URL paths so
// inbound links / SEO carry across; the newer cornerstone posts are authored here. Both render
// through the same BlogArticle template.

export interface PostStep {
  n?: string;
  title: string;
  body: string;
}
export interface PostColumn {
  title: string;
  items: string[];
}

export interface PostBlock {
  type: "h" | "p" | "lede" | "ul" | "quote" | "pullquote" | "statements" | "callout" | "steps" | "columns" | "img";
  text?: string;
  html?: string;
  items?: string[];
  src?: string;
  alt?: string;
  label?: string;
  steps?: PostStep[];
  columns?: PostColumn[];
}

export interface JournalPost {
  path: string;        // URL path, e.g. "/celebration/seasonal-weddings-new-zealand/"
  slug: string;
  category: string;
  title: string;
  subtitle?: string;
  date: string;        // ISO date
  dateDisplay: string; // e.g. "October 2024"
  hero: string | null;
  excerpt: string;
  blocks: PostBlock[];
}

// Newest first.
export const JOURNAL_POSTS: JournalPost[] = [...NEW_POSTS, ...(data as JournalPost[])].sort((a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0
);

export const POST_PATHS: string[] = JOURNAL_POSTS.map((p) => p.path);

export function getPostByPath(path: string): JournalPost | undefined {
  return JOURNAL_POSTS.find((p) => p.path === path);
}

/** Previous (older) and next (newer) post for in-article navigation. Posts are newest-first. */
export function getPostNeighbours(path: string): { prev?: JournalPost; next?: JournalPost } {
  const i = JOURNAL_POSTS.findIndex((p) => p.path === path);
  if (i === -1) return {};
  return {
    next: i > 0 ? JOURNAL_POSTS[i - 1] : undefined,
    prev: i < JOURNAL_POSTS.length - 1 ? JOURNAL_POSTS[i + 1] : undefined
  };
}
