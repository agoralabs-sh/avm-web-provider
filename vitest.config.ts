import { defineConfig, mergeConfig } from 'vitest/config';

// configs
import commonConfig from './vite.common.config';

export default mergeConfig(
  commonConfig,
  defineConfig({
    test: {
      dir: 'src',
      passWithNoTests: true,
      testTimeout: 60000,
    },
  })
);
