import { type UserConfig } from 'vite'

const isGithubPages = !!process.env.GITHUB_PAGES;

const BASE_CONFIG = {
    build: {
        minify: 'esbuild',
    },
    envPrefix: 'CLIENT_',
    envDir: './config'
} satisfies UserConfig;

const defineConfig = () => {
    const newConfig: UserConfig = { ...BASE_CONFIG };
    if (isGithubPages) {
        newConfig.base = '/VirtualWorld/';
    }
    return newConfig;
}

export default defineConfig();