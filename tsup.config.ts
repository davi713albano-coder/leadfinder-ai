import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/cli.ts"],
    format: ["esm", "cjs"],
    banner: { js: "#!/usr/bin/env node" },
    outDir: "dist",
    clean: true,
    dts: false,
    shims: true,
  },
  {
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    outDir: "dist",
    dts: true,
    shims: true,
  },
]);
