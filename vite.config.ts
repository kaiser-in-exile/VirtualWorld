import { defineConfig } from 'vite'

const isGithubPages = !!process.env.GITHUB_PAGES;

export default defineConfig({
    build: {
        minify: 'esbuild',
    },
    base: isGithubPages ? '/VirtualWorld/' : '/',
    envPrefix: 'CLIENT_',
    envDir: './config'
})