/// <reference types="vitest" />
import { defineConfig, defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  '**/*.test.*{js,ts,mts}',
  defineConfig({
    plugins: [],
    test: {
      name: 'unit',
      environment: 'node',
      include: ['tests/Context/**/**/*.test.*{js,ts,mts}'],
      // setupFiles: ['tests/Context/**/**/*.setup.*{js,ts,mts}'],
      testTimeout: 40_000,
      hookTimeout: 40_000,
      globals: true,
      mockReset: true,
      restoreMocks: true,
      clearMocks: true
    }
  }),
  {
    plugins: [],
    test: {
      name: 'features',
      environment: 'node',
      include: ['tests/apps/**/features/**/*.test.*{js,ts,mts}'],
      testTimeout: 40_000,
      hookTimeout: 40_000,
      globals: true,
      mockReset: true,
      restoreMocks: true,
      clearMocks: true
    }
  }
])
