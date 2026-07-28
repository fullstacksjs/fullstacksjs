import { defineConfig } from '@fullstacksjs/oxlint-config';

export default defineConfig({
  modules: {
    nextjs: true,
    react: true,
    vitest: true,
    nodejs: true,
  },
  options: {
    esm: false,
  },
});
