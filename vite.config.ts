import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import Beasties from 'beasties';

// Inline above-the-fold ("critical") CSS into index.html and load the full
// stylesheet asynchronously, so the app's own CSS no longer blocks first paint.
// Runs once after the bundle is written, against the built dist/index.html.
function criticalCss(): Plugin {
  let outDir = 'dist';
  return {
    name: 'inline-critical-css',
    apply: 'build',
    configResolved(cfg) {
      outDir = cfg.build.outDir;
    },
    async closeBundle() {
      const htmlPath = resolve(outDir, 'index.html');
      let html: string;
      try {
        html = await readFile(htmlPath, 'utf8');
      } catch {
        return; // no index.html emitted (e.g. non-SPA build) — nothing to do
      }
      const beasties = new Beasties({
        path: outDir,
        publicPath: '/',
        preload: 'swap', // inline critical, load the rest async then apply
        pruneSource: false, // keep the full stylesheet intact for below-the-fold styles
        logLevel: 'silent'
      });
      const processed = await beasties.process(html);
      await writeFile(htmlPath, processed);
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), criticalCss()],
  appType: 'spa',
  build: { sourcemap: true },
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
});
