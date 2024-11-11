import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./src/test/setup.ts"],
    include: ["**/*.test.ts"],
    testTimeout: 10000, // Aumentamos el timeout a 10 segundos
    coverage: {
      reporter: ["text", "html"],
      exclude: ["node_modules/"],
    },
  },
});
