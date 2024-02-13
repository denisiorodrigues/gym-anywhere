import { configDefaults, defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    exclude: [...configDefaults.exclude, '**/.trunk/**'],
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
})
