import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {MotionConfig} from 'motion/react';
import App from './App.tsx';
import SmoothScroll from './components/SmoothScroll';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* reducedMotion="user" makes every Motion animation respect the OS setting:
        opacity fades are kept, transform/movement is dropped. */}
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </MotionConfig>
  </StrictMode>,
);
