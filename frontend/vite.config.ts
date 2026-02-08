import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "frontend",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
        chunkFileNames: "static/js/frontend/frontend-[hash].js",
        entryFileNames: "static/js/frontend/frontend-[hash].js",

        assetFileNames: ({ name }) => {
          // if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
          //   return "static/images/[name]-[hash][extname]";
          // }

          if (/\.css$/.test(name ?? "")) {
            return "static/css/frontend/frontend-[hash][extname]";
          }

          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return "static/media/frontend/[name]-[hash][extname]";
        },
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
    port: 3000,
  },
});
