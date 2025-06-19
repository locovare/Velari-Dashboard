import { DiscordUser, DiscordGuild, DiscordTokenResponse, BotInviteResponse } from '../types'

export class DiscordAPI {
  private readonly CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID || 'YOUR_DISCORD_CLIENT_ID'
  private readonly REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI || 'http://localhost:3000/callback'
  private readonly BOT_CLIENT_ID = import.meta.env.VITE_DISCORD_BOT_CLIENT_ID || 'YOUR_BOT_CLIENT_ID'
  private readonly CLIENT_SECRET = import.meta.env.VITE_DISCORD_CLIENT_SECRET || 'YOUR_CLIENT_SECRET'
  private readonly API_BASE = 'https://discord.com/api/v10'

  public getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.CLIENT_ID,
      redirect_uri: this.REDIRECT_URI,
      response_type: 'code',
      scope: 'identify guilds'
    })
    return `https://discord.com/api/oauth2/authorize?${params.toString()}`
  }

  public async exchangeCodeForToken(code: string): Promise<DiscordTokenResponse> {
    const response = await fetch(`${this.API_BASE}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: this.REDIRECT_URI,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to exchange code for token')
    }

    return response.json()
  }

  public async getUserInfo(token: string): Promise<DiscordUser> {
    const response = await fetch(`${this.API_BASE}/users/@me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get user info')
    }

    return response.json()
  }

  public async getUserGuilds(token: string): Promise<DiscordGuild[]> {
    const response = await fetch(`${this.API_BASE}/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get user guilds')
    }

    return response.json()
  }

  public getBotInviteUrl(guildId: string): string {
    const params = new URLSearchParams({
      client_id: this.BOT_CLIENT_ID,
      permissions: '8', // Administrator permissions
      scope: 'bot',
      guild_id: guildId,
    })
    return `https://discord.com/api/oauth2/authorize?${params.toString()}`
  }

  public async checkBotInGuild(guildId: string, token: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_BASE}/guilds/${guildId}`, {
        headers: {
          Authorization: `Bot ${token}`,
        },
      })
      return response.ok
    } catch {
      return false
    }
  }
} 