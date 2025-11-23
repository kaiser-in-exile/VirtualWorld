/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly CLIENT_FILES_ROOT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
