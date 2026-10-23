import { defineConfig, type UserConfig } from "tsdown";

const config: UserConfig = defineConfig({
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    target: "es2020",
    platform: "neutral",
    dts: { generator: "oxc" },
});

export default config;
