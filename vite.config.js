
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),

        products: resolve(
          __dirname,
          "products/index.html"
        ),

        product: resolve(
  __dirname,
  "product/index.html"
),

        cart: resolve(
  __dirname,
  "cart/index.html"
),

        checkout: resolve(
          __dirname,
          "checkout/index.html"
        ),

        success: resolve(
          __dirname,
          "success/index.html"
        )
      }
    },

    outDir: "dist",
    emptyOutDir: true
  }
});

