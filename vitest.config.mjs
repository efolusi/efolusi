import { defineConfig } from 'vitest/config';

// Next compiles JSX with the automatic runtime; tests that render components need the same.
export default defineConfig({ esbuild: { jsx: 'automatic' } });
