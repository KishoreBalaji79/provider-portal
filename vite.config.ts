import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/provider-portal/",
  server: {
    port: 5173,
    strictPort: true,
  },
});
