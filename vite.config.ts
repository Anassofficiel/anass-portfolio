import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  plugins: [
    tanstackStart(),

    ...(process.env.VERCEL
      ? [
        nitro({
          preset: "vercel",
        }),
      ]
      : []),

    react(),
    tailwindcss(),
  ],
});