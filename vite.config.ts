import { defineConfig } from 'vite'

const isGithubPages = true // !!process.env.GITHUB_PAGES;

export default defineConfig({
    build: {
        minify: 'esbuild',
    },
    base: isGithubPages ? '/VirtualWorld/' : '/',
    envPrefix: 'CLIENT_',
    envDir: './config'
})