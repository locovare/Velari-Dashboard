import { DiscordAPI } from '../services/DiscordAPI'

export class AuthUtils {
  private static discordAPI = new DiscordAPI()

  public static async handleCallback(): Promise<boolean> {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const error = urlParams.get('error')

    if (error) {
      console.error('OAuth error:', error)
      return false
    }

    if (!code) {
      return false
    }

    try {
      const tokenResponse = await this.discordAPI.exchangeCodeForToken(code)
      localStorage.setItem('discord_token', tokenResponse.access_token)
      
      // Clear the URL parameters
      window.history.replaceState({}, document.title, window.location.pathname)
      
      return true
    } catch (error) {
      console.error('Failed to exchange code for token:', error)
      return false
    }
  }

  public static isAuthenticated(): boolean {
    return !!localStorage.getItem('discord_token')
  }

  public static logout(): void {
    localStorage.removeItem('discord_token')
    window.location.href = '/'
  }

  public static getToken(): string | null {
    return localStorage.getItem('discord_token')
  }
} 