import { defineConfig, type ViteUserConfig } from "vitest/config";

const config: ViteUserConfig = defineConfig({
    test: {
        include: ["test/**/*.test.ts"],
        coverage: {
            include: ["src/**/*.ts"],
            thresholds: { 100: true },
        },
    },
});

export default config;
