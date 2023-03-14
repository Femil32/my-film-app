import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import config from './.env'

// https://vitejs.dev/config/
export default defineConfig(init => {
    return {
        server: {
            port: 3100,
        },
        preview: {
            port: 3000,
        },
        plugins: [react()],
        define: {
            'process.env': config[init.mode],
        },
        resolve: {
            alias: {
                '@': require('path').resolve(__dirname, 'src')
            }
        },
    }
})
