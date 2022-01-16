import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        eslintPlugin({throwOnWarning: true, throwOnError: true})
    ],
    server: {
        port: parseInt(process.env.PORT) || 3001
    }
});
