// Post-build SEO generation. Runs after `vite build` (see package.json "postbuild").
//
// For a client-rendered SPA every route otherwise ships the same empty index.html, so
// crawlers (and social/AI bots that don't run JS) see no per-page title/description/OG/
// canonical/schema. This script bakes those into a static per-route index.html, and also
// regenerates sitemap.xml + llms-full.txt from the same source data (no drift).
//
// It intentionally only rewrites <head>. The <body> is still the SPA shell (React fills it),
// and all the PageSpeed work is preserved: Beasties' inlined critical CSS, the async font/CSS
// links, WebP + lazy images, and vendor code-splitting are copied verbatim from the built
// shell. The one adjustment is the LCP hero <link rel=preload>, which is set per-route so an
// inner page preloads its own hero, not the homepage's.

import { build } from "esbuild";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const ORIGIN = "https://fantailweddings.co.nz";
const HOME_IMG = "/assets/images/Welcome-Hero.webp";

// ---- load the site's data (TS + JSON) via a one-off esbuild bundle ----
async function loadData() {
  const tmp = path.join(ROOT, ".seo-data.tmp.mjs");
  await build({
    stdin: {
      contents: `
        export { JOURNAL_POSTS } from "./src/journalPosts.ts";
        export { JOURNAL_ARTICLES } from "./src/journal.ts";
        export { SERVICES_DATA, FAQ_DATA } from "./src/data.ts";
      `,
      resolveDir: ROOT,
      loader: "ts"
    },
    bundle: true,
    format: "esm",
    platform: "node",
    outfile: tmp,
    logLevel: "silent"
  });
  const mod = await import("file://" + tmp.replace(/\\/g, "/") + "?t=" + Date.now());
  await rm(tmp, { force: true });
  return mod;
}

const escAttr = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Trim a paragraph to a clean ~155-char meta description ending on a word boundary.
function metaDesc(text = "") {
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= 160) return clean;
  const cut = clean.slice(0, 157);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "") + "…";
}

const abs = (p) => (p && p.startsWith("http") ? p : ORIGIN + (p || "/"));

// ---- per-route JSON-LD builders ----
const breadcrumb = (trail) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: abs(t.path)
  }))
});

const articleSchema = ({ url, headline, description, image, date, section }) => ({
  "@context": "https://schema.org",
  "@type": date ? "BlogPosting" : "Article",
  headline,
  description,
  ...(image ? { image: abs(image) } : {}),
  ...(date ? { datePublished: date, dateModified: date } : {}),
  url: abs(url),
  mainEntityOfPage: { "@type": "WebPage", "@id": abs(url) },
  author: { "@type": "Person", "@id": ORIGIN + "/#rebecca", name: "Rebecca Brosnahan" },
  publisher: { "@type": "ProfessionalService", "@id": ORIGIN + "/#business", name: "Fantail Weddings" },
  ...(section ? { articleSection: section } : {}),
  inLanguage: "en-NZ"
});

const navigatorService = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": ORIGIN + "/#service-navigator",
  name: "The Wedding Navigator — Online Wedding Consultancy",
  description:
    "Three live consultancy calls with Rebecca plus a personalised planning toolkit for New Zealand couples planning their own wedding.",
  provider: { "@type": "ProfessionalService", "@id": ORIGIN + "/#business", name: "Fantail Weddings" },
  areaServed: { "@type": "Country", "name": "New Zealand" },
  offers: {
    "@type": "Offer",
    price: "850",
    priceCurrency: "NZD",
    availability: "https://schema.org/InStock"
  },
  url: abs("/the-wedding-navigator/")
});

// ---- build the full route table ----
function buildRoutes({ JOURNAL_POSTS, JOURNAL_ARTICLES }) {
  const routes = [];

  routes.push({
    path: "/portfolio/",
    priority: 0.9,
    title: "Portfolio | Fantail Weddings",
    desc: "A selection of South Island New Zealand weddings and elopements planned by Fantail Weddings.",
    image: HOME_IMG,
    jsonld: [breadcrumb([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio/" }])]
  });

  routes.push({
    path: "/journal/",
    priority: 0.9,
    title: "The Journal | Fantail Weddings | South Island Wedding Guides",
    desc: "Guides and stories on planning a South Island New Zealand wedding — venues, elopements, and destination-wedding advice from Fantail Weddings.",
    image: HOME_IMG,
    jsonld: [breadcrumb([{ name: "Home", path: "/" }, { name: "The Journal", path: "/journal/" }])]
  });

  routes.push({
    path: "/the-wedding-navigator/",
    priority: 0.9,
    title: "The Wedding Navigator | Fantail Weddings",
    desc: "The Wedding Navigator by Fantail Weddings: three live calls with Rebecca and a personalised toolkit for couples planning their own New Zealand wedding.",
    image: "/assets/images/wedding-navigator-hero.webp",
    jsonld: [
      navigatorService(),
      breadcrumb([{ name: "Home", path: "/" }, { name: "The Wedding Navigator", path: "/the-wedding-navigator/" }])
    ]
  });

  // Location guides — map journal.ts slugs to their live routes
  const guideRoute = { "queenstown-weddings": "/queenstown-wedding-planner/", "wanaka-weddings": "/nz-wanaka-wedding-planner/" };
  for (const a of JOURNAL_ARTICLES) {
    const p = guideRoute[a.slug];
    if (!p) continue;
    routes.push({
      path: p,
      priority: 0.8,
      title: a.metaTitle,
      desc: a.metaDescription,
      image: a.heroImage,
      jsonld: [
        articleSchema({ url: p, headline: a.metaTitle, description: a.metaDescription, image: a.heroImage, section: "Wedding Guides" }),
        breadcrumb([{ name: "Home", path: "/" }, { name: "The Journal", path: "/journal/" }, { name: a.title, path: p }])
      ]
    });
  }

  // Journal / blog posts
  for (const post of JOURNAL_POSTS) {
    routes.push({
      path: post.path,
      priority: 0.7,
      lastmod: post.date,
      title: `${post.title} | Fantail Weddings`,
      desc: metaDesc(post.excerpt || post.subtitle || ""),
      image: post.hero || HOME_IMG,
      jsonld: [
        articleSchema({
          url: post.path,
          headline: post.title,
          description: metaDesc(post.excerpt || post.subtitle || ""),
          image: post.hero || HOME_IMG,
          date: post.date,
          section: post.category
        }),
        breadcrumb([{ name: "Home", path: "/" }, { name: "The Journal", path: "/journal/" }, { name: post.title, path: post.path }])
      ]
    });
  }
  return routes;
}

// ---- rewrite the <head> of the built shell for one route ----
function renderHead(shell, r) {
  const url = abs(r.path);
  const img = abs(r.image);
  let html = shell;
  const rep = (re, val) => {
    html = html.replace(re, val);
  };
  rep(/<title>[\s\S]*?<\/title>/, `<title>${escAttr(r.title)}</title>`);
  rep(/<meta name="description" content="[\s\S]*?">/, `<meta name="description" content="${escAttr(r.desc)}">`);
  rep(/<link rel="canonical" href="[\s\S]*?">/, `<link rel="canonical" href="${url}">`);
  rep(/<meta property="og:title" content="[\s\S]*?">/, `<meta property="og:title" content="${escAttr(r.title)}">`);
  rep(/<meta property="og:description" content="[\s\S]*?">/, `<meta property="og:description" content="${escAttr(r.desc)}">`);
  rep(/<meta property="og:url" content="[\s\S]*?">/, `<meta property="og:url" content="${url}">`);
  rep(/<meta property="og:image" content="[\s\S]*?">/, `<meta property="og:image" content="${img}">`);
  rep(/<meta name="twitter:title" content="[\s\S]*?">/, `<meta name="twitter:title" content="${escAttr(r.title)}">`);
  rep(/<meta name="twitter:description" content="[\s\S]*?">/, `<meta name="twitter:description" content="${escAttr(r.desc)}">`);
  rep(/<meta name="twitter:image" content="[\s\S]*?">/, `<meta name="twitter:image" content="${img}">`);
  // Per-route LCP hero preload (inner pages have their own hero, not the homepage's)
  rep(
    /<link rel="preload" as="image" href="[\s\S]*?" fetchpriority="high">/,
    `<link rel="preload" as="image" href="${escAttr(r.image)}" fetchpriority="high">`
  );
  // Inject per-route structured data just before </head> (site-level @graph stays too)
  const blocks = (r.jsonld || [])
    .map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`)
    .join("\n\t\t");
  html = html.replace("</head>", `\t${blocks}\n\t</head>`);
  return html;
}

// ---- llms-full.txt from the same data ----
function renderLlmsFull({ SERVICES_DATA, FAQ_DATA, JOURNAL_ARTICLES, JOURNAL_POSTS }) {
  const L = [];
  L.push("# Fantail Weddings — Full Content\n");
  L.push(
    "Boutique, founder-led wedding planning for elopements and intimate weddings across the South Island of Aotearoa, New Zealand. Founder: Rebecca Brosnahan (15+ years). Contact: rebecca@fantailweddings.com, +64 274 672 126.\n"
  );
  L.push("## Services\n");
  for (const s of SERVICES_DATA) {
    L.push(`### ${s.title}`);
    if (s.subtitle) L.push(s.subtitle);
    if (s.description) L.push(s.description);
    if (Array.isArray(s.details)) L.push(s.details.map((d) => `- ${d}`).join("\n"));
    if (s.investment) L.push(`Investment: ${s.investment}`);
    L.push("");
  }
  L.push("## Frequently asked questions\n");
  for (const f of FAQ_DATA) {
    L.push(`Q: ${f.question}`);
    L.push(`A: ${f.answer}\n`);
  }
  L.push("## Location guides\n");
  for (const a of JOURNAL_ARTICLES) {
    L.push(`### ${a.metaTitle}`);
    L.push(`${abs(a.slug === "queenstown-weddings" ? "/queenstown-wedding-planner/" : "/nz-wanaka-wedding-planner/")}`);
    L.push(`${a.metaDescription}\n`);
  }
  L.push("## Journal\n");
  for (const p of JOURNAL_POSTS) {
    L.push(`### ${p.title}`);
    L.push(abs(p.path));
    if (p.subtitle) L.push(p.subtitle);
    if (p.excerpt) L.push(String(p.excerpt).replace(/\s+/g, " ").trim());
    L.push("");
  }
  return L.join("\n");
}

function renderSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const rows = [{ path: "/", priority: 1.0, lastmod: today }, ...routes]
    .map((r) => {
      const lm = r.lastmod || today;
      return `  <url><loc>${abs(r.path)}</loc><lastmod>${lm}</lastmod><priority>${r.priority ?? 0.7}</priority></url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`;
}

async function main() {
  const data = await loadData();
  const routes = buildRoutes(data);
  const shell = await readFile(path.join(DIST, "index.html"), "utf8");

  // Per-route static <head> files
  let pages = 0;
  for (const r of routes) {
    const dir = path.join(DIST, r.path.replace(/^\/|\/$/g, ""));
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "index.html"), renderHead(shell, r));
    pages++;
  }

  await writeFile(path.join(DIST, "sitemap.xml"), renderSitemap(routes));
  await writeFile(path.join(DIST, "llms-full.txt"), renderLlmsFull(data));

  console.log(`seo-build: ${pages} per-route pages, sitemap (${routes.length + 1} urls), llms-full.txt`);

  await pingIndexNow(routes);
}

// IndexNow: notify Bing/Copilot of the live URLs. Only on Netlify deploys, and fully
// best-effort — any failure is swallowed so it can never break a build.
async function pingIndexNow(routes) {
  if (!process.env.NETLIFY) return;
  const key = "b7f3c1a94e2d4f8ab5c60e1927d83a46";
  const urlList = [abs("/"), ...routes.map((r) => abs(r.path))];
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: ctrl.signal,
      body: JSON.stringify({
        host: "fantailweddings.co.nz",
        key,
        keyLocation: `${ORIGIN}/${key}.txt`,
        urlList
      })
    });
    clearTimeout(t);
    console.log(`seo-build: IndexNow submitted ${urlList.length} urls (${res.status})`);
  } catch (e) {
    console.log("seo-build: IndexNow ping skipped —", e?.message || e);
  }
}

main().catch((e) => {
  console.error("seo-build failed:", e);
  process.exit(1);
});
