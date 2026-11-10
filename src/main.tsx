import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {MotionConfig} from 'motion/react';
import App, {preloadPage} from './App.tsx';
import SmoothScroll from './components/SmoothScroll';
import './index.css';

const container = document.getElementById('root')!;
const tree = (
  <StrictMode>
    {/* reducedMotion="user" makes every Motion animation respect the OS setting:
        opacity fades are kept, transform/movement is dropped. */}
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </MotionConfig>
  </StrictMode>
);

// Pages are prerendered at build time (scripts/seo-build.mjs) so crawlers see real content.
// When that markup is present, hydrate it; otherwise (dev server) render from scratch.
// The current page's code is loaded first, so the markup can be adopted as it is.
if (container.hasChildNodes()) {
  preloadPage(window.location.pathname)
    .catch(() => {})
    .then(() => hydrateRoot(container, tree));
} else {
  createRoot(container).render(tree);
}
