import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            'process.env.API_BASE_URL': JSON.stringify(env.API_BASE_URL)
        },
        plugins: [react()],
        base: '/myme/'
 }
})
