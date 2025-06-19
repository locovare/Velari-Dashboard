/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DISCORD_CLIENT_ID: string
  readonly VITE_DISCORD_CLIENT_SECRET: string
  readonly VITE_DISCORD_BOT_CLIENT_ID: string
  readonly VITE_DISCORD_REDIRECT_URI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 