// Build-time prerender entry (used only by scripts/seo-build.mjs, never shipped to browsers).
// Renders each route's full page to static HTML so crawlers and AI bots that don't run
// JavaScript still see the real content. The browser then hydrates this same markup.
// The tree here must match src/main.tsx exactly, or hydration falls back to a client render.
import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { MotionConfig } from "motion/react";
import App, { preloadPage } from "./App";
import SmoothScroll from "./components/SmoothScroll";

async function renderOnce(path: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <App initialPath={path} />
        </SmoothScroll>
      </MotionConfig>
    </StrictMode>,
    // Keep every completed Suspense boundary inline. React otherwise moves large boundaries
    // into a hidden <div> that a script swaps in, which non-JS crawlers can't use.
    { progressiveChunkSize: Number.MAX_SAFE_INTEGER }
  );
  const chunks: Buffer[] = [];
  for await (const c of prelude) chunks.push(typeof c === "string" ? Buffer.from(c) : c);
  return Buffer.concat(chunks).toString("utf8");
}

// The inner pages are code-split. Loading the page's code first means it renders inline in
// one pass (no Suspense placeholder), exactly as the browser will hydrate it.
export async function render(path: string): Promise<string> {
  await preloadPage(path);
  const html = await renderOnce(path);
  if (html.includes("<template")) throw new Error(`prerender: ${path} still has a pending Suspense boundary`);
  return html;
}
