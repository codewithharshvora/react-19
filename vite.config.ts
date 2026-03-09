import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig(() => {
  const plugins = [react()];

  // run `ANALYZE=true npm run build` to generate a bundle report
  if (process.env.ANALYZE === "true") {
    plugins.push(
      visualizer({
        filename: "dist/bundle-analysis.html",
        open: true,
        gzipSize: true,
        brotliSize: true,
      }) as any, // visualizer written in CJS
    );
  }

  return {
    plugins,
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
      coverage: {
        reporter: ["text", "lcov"],
      },
    },
  };
});
