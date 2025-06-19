import { DiscordAPI } from '../services/DiscordAPI'

export class WelcomeScreen {
  private container: HTMLElement
  private discordAPI: DiscordAPI

  constructor(container: HTMLElement) {
    this.container = container
    this.discordAPI = new DiscordAPI()
    this.render()
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="min-h-screen flex items-center justify-center px-4">
        <div class="glass-effect rounded-2xl p-8 md:p-12 max-w-md w-full text-center">
          <!-- Logo/Brand -->
          <div class="mb-8">
            <div class="w-20 h-20 bg-gradient-to-br from-discord-blurple to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 14a6 6 0 1112 0 6 6 0 01-12 0z"/>
                <path d="M10 6a4 4 0 100 8 4 4 0 000-8z"/>
              </svg>
            </div>
            <h1 class="text-3xl font-bold text-white mb-2">Velari</h1>
            <p class="text-gray-200 text-lg">Discord Bot Dashboard</p>
          </div>

          <!-- Welcome Message -->
          <div class="mb-8">
            <h2 class="text-2xl font-semibold text-white mb-4">Welcome to Velari</h2>
            <p class="text-gray-300 leading-relaxed">
              Manage your Discord bot with ease. Connect your Discord account to view your servers and invite Velari to your communities.
            </p>
          </div>

          <!-- Features -->
          <div class="mb-8 space-y-3">
            <div class="flex items-center text-gray-300">
              <svg class="w-5 h-5 text-discord-green mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>View all your Discord servers</span>
            </div>
            <div class="flex items-center text-gray-300">
              <svg class="w-5 h-5 text-discord-green mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>Invite Velari with one click</span>
            </div>
            <div class="flex items-center text-gray-300">
              <svg class="w-5 h-5 text-discord-green mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>Secure Discord OAuth integration</span>
            </div>
          </div>

          <!-- Login Button -->
          <button id="discord-login" class="discord-button w-full py-4 px-6 rounded-xl text-white font-semibold text-lg flex items-center justify-center space-x-3">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span>Continue with Discord</span>
          </button>

          <!-- Footer -->
          <div class="mt-8 text-sm text-gray-400">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    `

    this.attachEventListeners()
  }

  private attachEventListeners(): void {
    const loginButton = this.container.querySelector('#discord-login')
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        this.handleDiscordLogin()
      })
    }
  }

  private handleDiscordLogin(): void {
    const authUrl = this.discordAPI.getAuthUrl()
    window.location.href = authUrl
  }
} 