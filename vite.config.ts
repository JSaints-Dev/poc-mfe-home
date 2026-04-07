import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import tsConfigPaths from 'vite-tsconfig-paths'

function buildProxy(env: Record<string, string>) {
  const featureAUrl = env.VITE_MFE_FEATURE_A_URL
  const featureBUrl = env.VITE_MFE_FEATURE_B_URL

  const proxy: Record<string, object> = {}

  if (featureAUrl) {
    proxy['/feature-a'] = {
      target: featureAUrl,
      changeOrigin: true,
      secure: false,
      ws: true,
      rewrite: (path: string) => path.replace(/^\/feature-a/, ''),
    }
  }

  if (featureBUrl) {
    proxy['/feature-b'] = {
      target: featureBUrl,
      changeOrigin: true,
      secure: false,
      ws: true,
      rewrite: (path: string) => path.replace(/^\/feature-b/, ''),
    }
  }

  return proxy
}

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd())
  const proxy = buildProxy(env)

  const serverOptions = {
    port: 3000,
    host: true,
    strictPort: true,
    proxy,
    hmr: { clientPort: 3000 },
  }

  return defineConfig({
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss(),
      tsConfigPaths(),
    ],
    server: serverOptions,
    preview: serverOptions,
  })
}
