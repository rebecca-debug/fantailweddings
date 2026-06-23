import data from "./journalPosts.json";

// Journal posts migrated from the previous Fantail Weddings website. Each keeps its original
// URL path so existing inbound links and SEO carry across to the new site.

export interface PostBlock {
  type: "h" | "p" | "ul" | "quote" | "img";
  text?: string;
  html?: string;
  items?: string[];
  src?: string;
  alt?: string;
}

export interface JournalPost {
  path: string;        // original URL path, e.g. "/celebration/seasonal-weddings-new-zealand/"
  slug: string;
  category: string;
  title: string;
  date: string;        // ISO date
  dateDisplay: string; // e.g. "October 2024"
  hero: string | null;
  excerpt: string;
  blocks: PostBlock[];
}

export const JOURNAL_POSTS: JournalPost[] = data as JournalPost[];

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
