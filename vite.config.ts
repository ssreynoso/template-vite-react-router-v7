import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import path from 'path'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  ssr: {
    noExternal: command === "build" ? true : undefined,
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: { port: 3000 },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
}));
