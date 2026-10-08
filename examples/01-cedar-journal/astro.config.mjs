import { defineConfig } from "astro/config";
import sharp from "sharp";

sharp.concurrency(2);

export default defineConfig({
  build: { concurrency: 2 },
  devToolbar: { enabled: false },
  output: "static",
  trailingSlash: "always",
});
