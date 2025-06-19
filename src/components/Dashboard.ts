import { DiscordAPI } from '../services/DiscordAPI'
import { DiscordUser, DiscordGuild } from '../types'

export class Dashboard {
  private container: HTMLElement
  private discordAPI: DiscordAPI
  private onLogout: () => void
  private user: DiscordUser | null = null
  private guilds: DiscordGuild[] = []

  constructor(container: HTMLElement, discordAPI: DiscordAPI, onLogout: () => void) {
    this.container = container
    this.discordAPI = discordAPI
    this.onLogout = onLogout
    this.init()
  }

  private async init(): Promise<void> {
    await this.loadUserData()
    this.render()
  }

  private async loadUserData(): Promise<void> {
    try {
      const token = localStorage.getItem('discord_token')
      if (!token) {
        this.onLogout()
        return
      }

      this.user = await this.discordAPI.getUserInfo(token)
      const allGuilds = await this.discordAPI.getUserGuilds(token)
      const ADMINISTRATOR = 0x8
      this.guilds = allGuilds.filter(guild => (parseInt(guild.permissions) & ADMINISTRATOR) === ADMINISTRATOR)
    } catch (error) {
      console.error('Failed to load user data:', error)
      localStorage.removeItem('discord_token')
      this.onLogout()
    }
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="min-h-screen bg-gradient-to-br from-discord-darkest via-discord-dark to-discord-darker">
        <!-- Header -->
        <header class="glass-effect border-b border-white/10">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4">
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-gradient-to-br from-discord-blurple to-purple-600 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 14a6 6 0 1112 0 6 6 0 01-12 0z"/>
                    <path d="M10 6a4 4 0 100 8 4 4 0 000-8z"/>
                  </svg>
                </div>
                <h1 class="text-2xl font-bold text-white">Velari Dashboard</h1>
              </div>
              
              <div class="flex items-center space-x-4">
                ${this.user ? `
                  <div class="flex items-center space-x-3">
                    <img src="${this.getUserAvatar()}" alt="${this.user.username}" class="w-8 h-8 rounded-full">
                    <span class="text-white font-medium">${this.user.username}</span>
                  </div>
                ` : ''}
                <button id="logout-btn" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <!-- Welcome Section -->
          <div class="mb-8">
            <h2 class="text-3xl font-bold text-white mb-2">Welcome back, ${this.user?.username || 'User'}!</h2>
            <p class="text-gray-300">Manage your Discord servers and invite Velari to your communities.</p>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="glass-effect rounded-xl p-6">
              <div class="flex items-center">
                <div class="p-3 bg-discord-green/20 rounded-lg">
                  <svg class="w-6 h-6 text-discord-green" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-400">Total Servers</p>
                  <p class="text-2xl font-bold text-white">${this.guilds.length}</p>
                </div>
              </div>
            </div>
            
            <div class="glass-effect rounded-xl p-6">
              <div class="flex items-center">
                <div class="p-3 bg-discord-blurple/20 rounded-lg">
                  <svg class="w-6 h-6 text-discord-blurple" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-400">Owned Servers</p>
                  <p class="text-2xl font-bold text-white">${this.guilds.filter(g => g.owner).length}</p>
                </div>
              </div>
            </div>
            
            <div class="glass-effect rounded-xl p-6">
              <div class="flex items-center">
                <div class="p-3 bg-discord-yellow/20 rounded-lg">
                  <svg class="w-6 h-6 text-discord-yellow" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-400">Bot Status</p>
                  <p class="text-2xl font-bold text-white">Online</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Servers Section -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-2xl font-bold text-white">Your Servers</h3>
              <div class="flex space-x-2">
                <button id="refresh-btn" class="px-4 py-2 bg-discord-blurple hover:bg-discord-blurple/80 text-white rounded-lg transition-colors flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
                  </svg>
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="servers-grid">
              ${this.renderServers()}
            </div>
          </div>
        </main>
      </div>
    `

    this.attachEventListeners()
  }

  private renderServers(): string {
    if (this.guilds.length === 0) {
      return `
        <div class="col-span-full text-center py-12">
          <div class="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-white mb-2">No servers found</h3>
          <p class="text-gray-400">You don't have access to any Discord servers yet.</p>
        </div>
      `
    }

    return this.guilds.map(guild => `
      <div class="server-card glass-effect rounded-xl p-6 hover:bg-white/5">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 rounded-full overflow-hidden bg-discord-dark flex items-center justify-center">
              ${guild.icon ? 
                `<img src="https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png" alt="${guild.name}" class="w-full h-full object-cover">` :
                `<svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>`
              }
            </div>
            <div>
              <h4 class="text-lg font-semibold text-white">${guild.name}</h4>
              <p class="text-sm text-gray-400">${guild.owner ? 'Owner' : 'Member'}</p>
            </div>
          </div>
          ${guild.owner ? `
            <span class="px-2 py-1 bg-discord-green/20 text-discord-green text-xs rounded-full">Owner</span>
          ` : ''}
        </div>
        
        <div class="space-y-3">
          <div class="flex items-center text-sm text-gray-400">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
            </svg>
            <span>Server ID: ${guild.id}</span>
          </div>
          
          <button 
            data-guild-id="${guild.id}" 
            data-guild-name="${guild.name}"
            class="invite-btn w-full py-2 px-4 bg-discord-blurple hover:bg-discord-blurple/80 text-white rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
            </svg>
            <span>Invite Velari</span>
          </button>
        </div>
      </div>
    `).join('')
  }

  private getUserAvatar(): string {
    if (!this.user) return ''
    if (this.user.avatar) {
      return `https://cdn.discordapp.com/avatars/${this.user.id}/${this.user.avatar}.png`
    }
    return `https://cdn.discordapp.com/embed/avatars/${parseInt(this.user.discriminator) % 5}.png`
  }

  private attachEventListeners(): void {
    const logoutBtn = this.container.querySelector('#logout-btn')
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('discord_token')
        this.onLogout()
      })
    }

    const refreshBtn = this.container.querySelector('#refresh-btn')
    if (refreshBtn) {
      refreshBtn.addEventListener('click', async () => {
        await this.loadUserData()
        this.render()
      })
    }

    const inviteBtns = this.container.querySelectorAll('.invite-btn')
    inviteBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        const guildId = target.getAttribute('data-guild-id')
        const guildName = target.getAttribute('data-guild-name')
        if (guildId) {
          this.handleInviteBot(guildId, guildName || '')
        }
      })
    })
  }

  private handleInviteBot(guildId: string, guildName: string): void {
    const inviteUrl = this.discordAPI.getBotInviteUrl(guildId)
    window.open(inviteUrl, '_blank')
    
    // Show success message
    this.showNotification(`Invite link generated for ${guildName}!`, 'success')
  }

  private showNotification(message: string, type: 'success' | 'error' = 'success'): void {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg text-white font-medium z-50 transition-all duration-300 ${
      type === 'success' ? 'bg-discord-green' : 'bg-discord-red'
    }`
    notification.textContent = message
    
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.remove()
    }, 3000)
  }
} 