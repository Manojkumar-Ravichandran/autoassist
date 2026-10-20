import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const root = fileURLToPath(new URL(".", import.meta.url));
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, "VITE_");
  const apiBase = env.VITE_AUTOASSIST_API_BASE || "https://autoassist-71wvfm789-manojkumarwork1.vercel.app";
  return {
    configFile: false,
    root: `${root}/mobile-app`,
    envDir: root,
    plugins: [react()],
    resolve: { alias: { "@": root } },
    define: { "window.__AUTOASSIST_API_BASE__": JSON.stringify(apiBase) },
    css: { postcss: `${root}/postcss.config.mjs` },
    build: { outDir: `${root}/www`, emptyOutDir: true },
  };
});
