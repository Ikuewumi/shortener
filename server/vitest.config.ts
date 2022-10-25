import { defineConfig } from "vitest/config";

export default defineConfig({
   test: {
      coverage: {
         all: true
      },
      env: {
         DB_URI: "mongodb://127.0.0.1:27017/shortener",
         TEST_URI: "http://127.0.0.1:5500/index.html",
         BASE_URI: "http://localhost:5000",
         NODE_ENV: 'development'
      },
      watch: true
   }
})