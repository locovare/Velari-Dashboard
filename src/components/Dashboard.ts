import { DiscordAPI } from '../services/DiscordAPI'
import { 
  DiscordUser, 
  DiscordGuild,
  GuildChannel,
  GuildRole,
  WelcomeSettings,
  TicketSettings,
  ModerationSettings,
  BotSettings,
  AutoRolesSettings,
  ReactionRoleMenu,
  ServerAnalytics,
  LogType,
  PermissionSettings,
  LicenseKey,
  KeyRedemptionLog,
  Product,
  Subscription,
  Transaction,
  Customer,
  SalesAnalytics,
  Storefront,
  StoreProduct,
  StoreOrder,
  StoreCustomer,
  PromoCode,
  StoreAnalytics
} from '../types'

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

      // Check if the bot is in each guild using backend API
      await Promise.all(this.guilds.map(async (guild) => {
        try {
          const resp = await fetch(`/api/check-bot-in-guild?guildId=${guild.id}`);
          
          if (!resp.ok) {
            console.error('API error:', resp.status, resp.statusText);
            guild.botInGuild = false;
            return;
          }
      
          const data = await resp.json();
          guild.botInGuild = data.inGuild;
        } catch (error) {
          console.error('Error checking bot status:', error);
          guild.botInGuild = false;
        }
      }))
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
          <h3 class="text-lg font-medium text-gray-300 mb-2">No servers found</h3>
          <p class="text-gray-400">You don't have any servers with administrator permissions.</p>
        </div>
      `
    }

    return this.guilds.map(guild => `
      <div class="glass-effect rounded-xl p-6 hover:shadow-lg transition-all duration-200">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-discord-blurple to-purple-600 rounded-full flex items-center justify-center">
              ${guild.icon ? 
                `<img src="https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png" alt="${guild.name}" class="w-12 h-12 rounded-full">` :
                `<span class="text-white font-bold text-lg">${guild.name.charAt(0).toUpperCase()}</span>`
              }
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white">${guild.name}</h3>
              <p class="text-sm text-gray-400">${guild.owner ? 'Owner' : 'Administrator'}</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            ${guild.botInGuild ? 
              `<span class="px-2 py-1 bg-discord-green/20 text-discord-green text-xs rounded-full">Bot Online</span>` :
              `<span class="px-2 py-1 bg-discord-red/20 text-discord-red text-xs rounded-full">Bot Offline</span>`
            }
          </div>
        </div>
        
        <div class="space-y-3">
          ${guild.botInGuild ? 
            `<a href="#" class="view-dashboard-link block w-full px-4 py-2 bg-discord-blurple hover:bg-discord-blurple/80 text-white rounded-lg font-medium text-center transition-colors" data-guild-id="${guild.id}">View Dashboard</a>` :
            `<button class="invite-btn w-full px-4 py-2 bg-discord-green hover:bg-discord-green/80 text-white rounded-lg font-medium transition-colors" data-guild-id="${guild.id}" data-guild-name="${guild.name}">Invite Velari</button>`
          }
        </div>
      </div>
    `).join('')
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
        const button = e.currentTarget as HTMLElement
        const guildId = button.getAttribute('data-guild-id')
        const guildName = button.getAttribute('data-guild-name')
        if (guildId) {
          this.handleInviteBot(guildId, guildName || '')
        }
      })
    })

    // Add event listeners for view dashboard buttons
    const viewDashboardBtns = this.container.querySelectorAll('.view-dashboard-link')
    viewDashboardBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        const link = e.currentTarget as HTMLElement
        const guildId = link.getAttribute('data-guild-id')
        if (guildId) {
          this.renderServerDashboard(guildId, 'home')
        }
      })
    })
  }

  private handleInviteBot(guildId: string, guildName: string): void {
    const inviteUrl = this.discordAPI.getBotInviteUrl(guildId)
    window.open(inviteUrl, '_blank')
    
    // Show success message
    this.showNotification(`Invite link generated for ${guildName}!`, 'success')

    // Add a delay and refresh to check if the bot was added
    setTimeout(async () => {
      await this.loadUserData()
      this.render()
    }, 5000) // Wait 5 seconds before checking
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

  // Render a simple server dashboard for the selected guild
  private async renderServerDashboard(guildId: string, activePage = 'home'): Promise<void> {
    const guild = this.guilds.find(g => g.id === guildId)
    if (!guild) return
    
    // TODO: Add a way to check if the user is a Velari Admin
    const isVelariAdmin = false;

    const getPageContent = async () => {
      switch (activePage) {
        case 'home':
          return this.renderDashboardHomePage();
        case 'welcome':
          return await this.renderWelcomeSystemPage(guildId);
        case 'tickets':
          return await this.renderTicketSystemPage(guildId);
        case 'moderation':
          return await this.renderModerationSystemPage(guildId);
        case 'embeds':
          return this.renderEmbedBuilderPage(guildId);
        case 'bot-settings':
          return await this.renderBotSettingsPage(guildId);
        case 'autoroles':
          return await this.renderAutoRolesPage(guildId);
        case 'logs':
          return this.renderLogsAndAnalyticsPage(guildId);
        case 'permissions':
          return this.renderPermissionsPage(guildId);
        case 'keys':
          return this.renderKeyManagementPage(guildId);
        case 'store':
          return this.renderStoreManagementPage();
        case 'storefronts':
          return this.renderCreatorStorefrontsPage(guildId);
        default:
          return this.renderDashboardHomePage();
      }
    }

    this.container.innerHTML = `
      <div class="min-h-screen flex bg-gradient-to-br from-discord-darkest via-discord-dark to-discord-darker text-white">
        <!-- Sidebar -->
        <aside class="w-64 bg-discord-darker text-white flex-shrink-0 p-6">
          <div class="mb-8">
            <label for="server-switcher-select" class="text-sm text-gray-400 mb-2 block">Current Server</label>
            <select id="server-switcher-select" name="server-switcher" class="w-full bg-discord-dark/50 border border-transparent rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-discord-blurple">
              ${this.guilds.map(g => `<option value="${g.id}" ${g.id === guild.id ? 'selected' : ''}>${g.name}</option>`).join('')}
            </select>
          </div>
          <nav class="space-y-2">
            <a href="#" data-page="home" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${activePage === 'home' ? 'bg-white/10 text-white' : 'hover:bg-white/10'}">
              <span>🏠</span>
              <span>Dashboard Home</span>
            </a>
            <a href="#" data-page="welcome" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${activePage === 'welcome' ? 'bg-white/10 text-white' : 'hover:bg-white/10'}">
              <span>👋</span>
              <span>Welcome System</span>
            </a>
            <a href="#" data-page="tickets" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${activePage === 'tickets' ? 'bg-white/10 text-white' : 'hover:bg-white/10'}">
              <span>🎫</span>
              <span>Ticket System</span>
            </a>
            <a href="#" data-page="moderation" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${activePage === 'moderation' ? 'bg-white/10 text-white' : 'hover:bg-white/10'}">
              <span>🛡️</span>
              <span>Moderation System</span>
            </a>
            <a href="#" data-page="embeds" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${activePage === 'embeds' ? 'bg-white/10 text-white' : 'hover:bg-white/10'}">
              <span>📝</span>
              <span>Embed Builder</span>
            </a>
            <a href="#" data-page="bot-settings" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${activePage === 'bot-settings' ? 'bg-white/10 text-white' : 'hover:bg-white/10'}">
              <span>🤖</span>
              <span>Bot Settings</span>
            </a>
            <a href="#" data-page="autoroles" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${activePage === 'autoroles' ? 'bg-white/10 text-white' : 'hover:bg-white/10'}">
              <span>🎭</span>
              <span>Auto Roles & Reaction Roles</span>
            </a>
            <a href="#" data-page="logs" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${activePage === 'logs' ? 'bg-white/10 text-white' : 'hover:bg-white/10'}">
              <span>📊</span>
              <span>Logs & Analytics</span>
            </a>
            <a href="#" data-page="permissions" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${activePage === 'permissions' ? 'bg-white/10 text-white' : 'hover:bg-white/10'}">
              <span>🔑</span>
              <span>Permission Management</span>
            </a>
             <a href="#" data-page="keys" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${activePage === 'keys' ? 'bg-white/10 text-white' : 'hover:bg-white/10'}">
              <span>🔐</span>
              <span>Key Management</span>
            </a>
            ${isVelariAdmin ? `
              <a href="#" data-page="store" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${activePage === 'store' ? 'bg-white/10 text-white' : 'hover:bg-white/10'}">
                <span>💰</span>
                <span>Store & Payment Management</span>
                <span class="text-xs bg-red-600 px-2 py-1 rounded-full">Admin</span>
              </a>
            ` : ''}
             ${guild.owner ? `
              <a href="#" data-page="storefronts" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${activePage === 'storefronts' ? 'bg-white/10 text-white' : 'hover:bg-white/10'}">
                <span>🛍️</span>
                <span>Creator Storefronts</span>
                 <span class="text-xs bg-discord-green px-2 py-1 rounded-full">Owner</span>
              </a>
            ` : ''}
          </nav>
        </aside>

        <div class="flex-1 flex flex-col">
          <!-- Header -->
          <header class="glass-effect border-b border-white/10">
            <div class="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
              <div class="flex items-center space-x-4">
                 <button id="mobile-menu-btn" class="md:hidden p-2 rounded-md hover:bg-white/10">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
                <h1 class="text-2xl font-bold text-white">${guild.name} Dashboard</h1>
              </div>
              <div class="flex items-center">
                 <button id="back-to-servers" class="px-4 py-2 bg-discord-blurple hover:bg-discord-blurple/80 text-white rounded-lg transition-colors flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span>Back to Servers</span>
                </button>
              </div>
            </div>
          </header>

          <!-- Main Content -->
          <main class="flex-1 overflow-y-auto p-8">
            ${await getPageContent()}
          </main>
        </div>
      </div>
    `;

    this.attachServerDashboardEventListeners(guildId, activePage);
  }

  private renderDashboardHomePage(): string {
    return `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Server Overview -->
        <div class="lg:col-span-12 glass-effect rounded-xl p-6">
          <h2 class="text-2xl font-bold text-white mb-6">Server Overview</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-discord-dark/50 rounded-lg p-4 flex items-center">
              <div class="p-3 bg-discord-green/20 rounded-lg">
                <svg class="w-6 h-6 text-discord-green" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-400">Members</p>
                <p class="text-xl font-bold text-white" id="member-count">Loading...</p>
              </div>
            </div>
            <div class="bg-discord-dark/50 rounded-lg p-4 flex items-center">
              <div class="p-3 bg-discord-blurple/20 rounded-lg">
                <svg class="w-6 h-6 text-discord-blurple" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-400">Uptime</p>
                <p class="text-xl font-bold text-white" id="bot-uptime">Loading...</p>
              </div>
            </div>
            <div class="bg-discord-dark/50 rounded-lg p-4 flex items-center">
              <div class="p-3 bg-discord-yellow/20 rounded-lg">
                <svg class="w-6 h-6 text-discord-yellow" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-400">Commands Used</p>
                <p class="text-xl font-bold text-white" id="commands-count">Loading...</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Module Toggles -->
        <div class="lg:col-span-8 glass-effect rounded-xl p-6">
          <h2 class="text-2xl font-bold text-white mb-6">Quick Module Toggles</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            ${this.renderModuleToggle('welcome', 'Welcome', 'M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z', 'text-discord-green')}
            ${this.renderModuleToggle('tickets', 'Tickets', 'M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z', 'text-discord-blurple')}
            ${this.renderModuleToggle('moderation', 'Moderation', 'M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z', 'text-discord-red')}
            ${this.renderModuleToggle('autoroles', 'Auto Roles', 'M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z', 'text-discord-yellow')}
          </div>
        </div>

        <!-- Recent Activity Logs -->
        <div class="lg:col-span-4 glass-effect rounded-xl p-6">
          <h2 class="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <div class="space-y-4" id="activity-logs">
            <div class="animate-pulse">
              <div class="h-4 bg-discord-dark/50 rounded w-3/4"></div>
              <div class="space-y-3 mt-4">
                <div class="h-4 bg-discord-dark/50 rounded"></div>
                <div class="h-4 bg-discord-dark/50 rounded"></div>
                <div class="h-4 bg-discord-dark/50 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  private renderModuleToggle(module: string, title: string, iconPath: string, iconClass: string): string {
    return `
      <div class="module-toggle bg-discord-dark/50 hover:bg-discord-dark rounded-lg p-4 transition-colors text-left" data-module="${module}">
        <div class="flex items-center justify-between mb-2">
          <svg class="w-6 h-6 ${iconClass}" fill="currentColor" viewBox="0 0 20 20">
            <path d="${iconPath}"/>
          </svg>
          <button class="toggle-switch relative inline-flex items-center h-4 w-8 rounded-full transition-colors bg-gray-600">
            <span class="toggle-indicator absolute left-0 inline-block w-4 h-4 transform bg-white rounded-full transition-transform"></span>
          </button>
        </div>
        <h3 class="text-white font-medium">${title}</h3>
      </div>
    `;
  }

  private async renderWelcomeSystemPage(guildId: string): Promise<string> {
    const [settings, channels] = await Promise.all([
      this.fetchWelcomeSettings(guildId),
      this.fetchGuildChannels(guildId)
    ]);
    
    const renderToggle = (setting: keyof WelcomeSettings, enabled: boolean) => {
      const isEnabled = settings ? settings[setting] : enabled;
      const settingKey = String(setting);
      return `
        <button class="toggle-switch relative inline-flex items-center h-4 w-8 rounded-full transition-colors ${isEnabled ? 'bg-discord-blurple' : 'bg-gray-600'}" data-setting="${settingKey}">
          <span class="toggle-indicator absolute left-0 inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isEnabled ? 'translate-x-4' : ''}"></span>
        </button>
      `;
    };
    
    return `
      <div class="space-y-8">
        <!-- Header -->
        <div>
          <h2 class="text-3xl font-bold text-white">Welcome System</h2>
          <p class="text-gray-400 mt-1">Customize how new members are welcomed to your server.</p>
        </div>

        <!-- General Settings -->
        <div class="glass-effect rounded-xl">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-white">Enable Welcome Messages</h3>
                <p class="text-sm text-gray-400">Send a message when a new member joins the server.</p>
              </div>
              ${renderToggle('enabled', false)}
            </div>
          </div>

          <div class="border-t border-white/10 p-6">
            <h3 class="text-lg font-semibold text-white mb-2">Welcome Channel</h3>
            <p class="text-sm text-gray-400 mb-4">Select the channel where welcome messages will be sent.</p>
            <select id="welcome-channel-select" class="w-full md:w-1/2 bg-discord-dark/50 border border-transparent rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-discord-blurple">
              ${channels.filter(c => c.type === 0).map(c => `<option value="${c.id}" ${settings?.channelId === c.id ? 'selected' : ''}>#${c.name}</option>`).join('')}
            </select>
          </div>

          <div class="border-t border-white/10 p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-white">Send Welcome in DMs</h3>
                <p class="text-sm text-gray-400">Send a copy of the welcome message directly to the new member.</p>
              </div>
              ${renderToggle('dmEnabled', false)}
            </div>
          </div>
        </div>

        <!-- Message Editor -->
        <div class="glass-effect rounded-xl p-6">
          <h3 class="text-lg font-semibold text-white mb-2">Custom Welcome Message</h3>
          <p class="text-sm text-gray-400 mb-4">
            Use variables like <code class="bg-black/20 px-1 rounded">{user}</code>, <code class="bg-black/20 px-1 rounded">{server}</code>, or <code class="bg-black/20 px-1 rounded">{memberCount}</code> to personalize your message.
          </p>
          <textarea id="welcome-message-input" class="w-full h-40 bg-discord-dark/50 border border-transparent rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-discord-blurple" placeholder="Welcome {user} to {server}! You are the {memberCount}th member!"></textarea>
        </div>

        <!-- Welcome Banner -->
        <div class="glass-effect rounded-xl p-6">
          <h3 class="text-lg font-semibold text-white mb-2">Welcome Banner</h3>
          <p class="text-sm text-gray-400 mb-4">Attach a custom image to your welcome message. This can be a URL or an uploaded file.</p>
          <div class="flex items-center space-x-4">
            <input type="text" id="welcome-banner-url" class="flex-grow bg-discord-dark/50 border border-transparent rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-discord-blurple" placeholder="https://example.com/banner.png">
            <label for="welcome-banner-upload" class="cursor-pointer px-4 py-2 bg-discord-blurple hover:bg-discord-blurple/80 text-white rounded-lg font-medium transition-colors">
              Upload Image
            </label>
            <input type="file" id="welcome-banner-upload" class="hidden" accept="image/*">
          </div>
        </div>

        <!-- Auto Role Assignment -->
        <div class="glass-effect rounded-xl p-6">
          <h3 class="text-lg font-semibold text-white mb-2">Auto Role Assignment</h3>
          <p class="text-sm text-gray-400 mb-4">Automatically assign these roles to new members.</p>
          <div id="auto-roles-list" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <p class="text-gray-400">Loading roles...</p>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end mt-8">
          <button id="save-welcome-settings" class="px-6 py-3 bg-discord-blurple hover:bg-discord-blurple/80 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L11 12.586l-2.293-2.293z"/></svg>
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    `;
  }

  private async renderTicketSystemPage(guildId: string): Promise<string> {
    const [settings, channels, roles] = await Promise.all([
      this.fetchTicketSettings(guildId),
      this.fetchGuildChannels(guildId),
      this.fetchGuildRoles(guildId)
    ]);
    
    const categories = channels.filter(c => c.type === 4);
    const textChannels = channels.filter(c => c.type === 0);

    const renderToggle = (setting: keyof TicketSettings, enabled: boolean) => {
      const isEnabled = settings ? settings[setting] : enabled;
      const settingKey = String(setting);
      return `
        <button class="toggle-switch relative inline-flex items-center h-4 w-8 rounded-full transition-colors ${isEnabled ? 'bg-discord-blurple' : 'bg-gray-600'}" data-setting="${settingKey}">
          <span class="toggle-indicator absolute left-0 inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isEnabled ? 'translate-x-4' : ''}"></span>
        </button>
      `;
    };

    return `
      <div class="space-y-8" data-guild-id="${guildId}">
        <!-- Header -->
        <div>
          <h2 class="text-3xl font-bold text-white">Ticket System</h2>
          <p class="text-gray-400 mt-1">Manage your server's support ticket system.</p>
        </div>
  
        <!-- General Settings -->
        <div class="glass-effect rounded-xl">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-white">Enable Ticket System</h3>
                <p class="text-sm text-gray-400">Allow members to create support tickets.</p>
              </div>
              ${renderToggle('enabled', true)}
            </div>
          </div>
  
          <div class="border-t border-white/10 p-6">
            <h3 class="text-lg font-semibold text-white mb-2">Ticket Category</h3>
            <p class="text-sm text-gray-400 mb-4">Select the category where new ticket channels will be created.</p>
            <select id="ticket-category-select" class="w-full md:w-1/2 bg-discord-dark/50 border border-transparent rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-discord-blurple">
              ${categories.map(c => `<option value="${c.id}" ${settings?.categoryId === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
            </select>
          </div>
        </div>
        
        <!-- Staff Roles -->
        <div class="glass-effect rounded-xl p-6">
          <h3 class="text-lg font-semibold text-white mb-2">Staff Roles</h3>
          <p class="text-sm text-gray-400 mb-4">These roles will have permission to view and manage tickets.</p>
          <div id="staff-roles-list" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            ${roles.map(role => `
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" class="form-checkbox h-5 w-5 rounded bg-discord-dark/50 border-white/20 text-discord-blurple focus:ring-discord-blurple/50" data-role-id="${role.id}" ${settings?.staffRoleIds.includes(role.id) ? 'checked' : ''}>
                <span class="text-white" style="color: #${role.color.toString(16).padStart(6, '0')}">${role.name}</span>
              </label>
            `).join('')}
          </div>
        </div>
  
        <!-- Ticket Reasons -->
        <div class="glass-effect rounded-xl p-6">
          <h3 class="text-lg font-semibold text-white mb-2">Ticket Reason Buttons</h3>
          <p class="text-sm text-gray-400 mb-4">Configure the buttons users click to open a ticket. (e.g., "Bug Report", "User Report")</p>
          <div id="ticket-reasons-list" class="space-y-3">
            ${settings?.reasons.map((reason: {id: string, label: string, emoji: string}) => `
              <div class="flex items-center space-x-3" data-reason-id="${reason.id}">
                <input type="text" class="reason-emoji w-16 bg-discord-dark/50 rounded-lg px-3 py-2 text-center" value="${reason.emoji}">
                <input type="text" class="reason-label flex-grow bg-discord-dark/50 rounded-lg px-3 py-2" value="${reason.label}">
                <button class="remove-reason-btn p-2 text-gray-400 hover:text-white hover:bg-red-600/50 rounded-full transition-colors">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
            `).join('') || '<p class="text-gray-400">No reasons configured.</p>'}
          </div>
          <button id="add-ticket-reason" class="mt-4 px-4 py-2 bg-discord-dark/50 hover:bg-discord-dark text-white rounded-lg transition-colors text-sm">Add Reason</button>
        </div>
  
        <!-- Closing & Transcripts -->
        <div class="glass-effect rounded-xl">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-white mb-2">Close Message</h3>
            <p class="text-sm text-gray-400 mb-4">This message will be sent when a ticket is closed.</p>
            <textarea id="ticket-close-message" class="w-full h-24 bg-discord-dark/50 border border-transparent rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-discord-blurple" placeholder="Your ticket has been closed by a staff member.">${settings?.closeMessage || ''}</textarea>
          </div>
          <div class="border-t border-white/10 p-6">
             <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-white">Enable Transcripts</h3>
                  <p class="text-sm text-gray-400">Save a transcript when a ticket is closed.</p>
                </div>
                ${renderToggle('transcriptsEnabled', false)}
            </div>
          </div>
          <div class="border-t border-white/10 p-6">
            <h3 class="text-lg font-semibold text-white mb-2">Transcript Channel</h3>
            <p class="text-sm text-gray-400 mb-4">Select a channel to send transcripts to. (Requires transcripts to be enabled)</p>
            <select id="transcript-channel-select" class="w-full md:w-1/2 bg-discord-dark/50 border border-transparent rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-discord-blurple">
              ${textChannels.map(c => `<option value="${c.id}" ${settings?.transcriptChannelId === c.id ? 'selected' : ''}>#${c.name}</option>`).join('')}
            </select>
          </div>
        </div>
  
        <!-- Save Button -->
        <div class="flex justify-end mt-8">
          <button id="save-ticket-settings" class="px-6 py-3 bg-discord-blurple hover:bg-discord-blurple/80 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L11 12.586l-2.293-2.293z"/></svg>
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    `;
  }

  private async fetchTicketSettings(guildId: string): Promise<TicketSettings | null> {
    try {
      const resp = await fetch(`/api/ticket-settings?guildId=${guildId}`);
      if (!resp.ok) throw new Error('Failed to fetch ticket settings');
      return await resp.json();
    } catch (e) {
      console.error("Failed to fetch ticket settings", e);
      return null;
    }
  }

  private attachTicketSystemEventListeners(): void {
    const container = document.querySelector('.space-y-8[data-guild-id]');
    if (!container) return;
    const guildId = (container as HTMLElement).dataset.guildId;
  
    // Event listeners for toggle switches
    container.querySelectorAll('.toggle-switch').forEach(button => {
      button.addEventListener('click', () => {
        const indicator = button.querySelector('.toggle-indicator') as HTMLSpanElement;
        const isEnabled = button.classList.toggle('bg-discord-blurple');
        button.classList.toggle('bg-gray-600', !isEnabled);
        indicator.classList.toggle('translate-x-4', !isEnabled);
      });
    });
  
    // Event listener for Save button
    const saveButton = container.querySelector('#save-ticket-settings');
    if (saveButton) {
      saveButton.addEventListener('click', async () => {
        if (!guildId) return;
        const reasons = Array.from(container.querySelectorAll('#ticket-reasons-list > div')).map(div => {
          return {
            id: (div as HTMLElement).dataset.reasonId,
            emoji: (div.querySelector('.reason-emoji') as HTMLInputElement).value,
            label: (div.querySelector('.reason-label') as HTMLInputElement).value,
          }
        });
        
        const settings = {
          enabled: container.querySelector('[data-setting="enabled"]')?.classList.contains('bg-discord-blurple'),
          categoryId: (container.querySelector('#ticket-category-select') as HTMLSelectElement).value,
          staffRoleIds: Array.from(container.querySelectorAll('#staff-roles-list input:checked')).map(el => (el as HTMLElement).dataset.roleId),
          reasons: reasons,
          closeMessage: (container.querySelector('#ticket-close-message') as HTMLTextAreaElement).value,
          transcriptsEnabled: container.querySelector('[data-setting="transcriptsEnabled"]')?.classList.contains('bg-discord-blurple'),
          transcriptChannelId: (container.querySelector('#transcript-channel-select') as HTMLSelectElement).value
        };
  
        try {
          const response = await fetch(`/api/ticket-settings?guildId=${guildId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
          });
          const result = await response.json();
          if (result.success) {
            this.showNotification('Ticket settings saved successfully!', 'success');
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          console.error('Failed to save ticket settings:', error);
          this.showNotification('Failed to save settings.', 'error');
        }
      });
    }
  }

  private async fetchWelcomeSettings(guildId: string): Promise<WelcomeSettings | null> {
    try {
      const resp = await fetch(`/api/welcome-settings?guildId=${guildId}`);
      if (!resp.ok) throw new Error('Failed to fetch settings');
      return await resp.json();
    } catch (e) {
      console.error("Failed to fetch welcome settings", e);
      return null;
    }
  }

  private async fetchGuildChannels(guildId: string): Promise<GuildChannel[]> {
    try {
      const resp = await fetch(`/api/guild-channels?guildId=${guildId}`);
      if (!resp.ok) throw new Error('Failed to fetch channels');
      return await resp.json();
    } catch(e) {
      console.error("Failed to fetch guild channels", e);
      return [];
    }
  }

  private async fetchGuildRoles(guildId: string): Promise<GuildRole[]> {
    try {
      const resp = await fetch(`/api/guild-roles?guildId=${guildId}`);
      if (!resp.ok) throw new Error('Failed to fetch roles');
      return await resp.json();
    } catch(e) {
      console.error("Failed to fetch guild roles", e);
      return [];
    }
  }

  private attachWelcomeSystemEventListeners(): void {
    const container = document.querySelector('.space-y-8[data-guild-id]');
    if (!container) return;
    const guildId = (container as HTMLElement).dataset.guildId;

    // Event listeners for toggle switches
    container.querySelectorAll('.toggle-switch').forEach(button => {
      button.addEventListener('click', () => {
        const indicator = button.querySelector('.toggle-indicator') as HTMLSpanElement;
        const isEnabled = button.classList.toggle('bg-discord-blurple');
        button.classList.toggle('bg-gray-600', !isEnabled);
        indicator.classList.toggle('translate-x-4', !isEnabled);
      });
    });

    // Event listener for Save button
    const saveButton = container.querySelector('#save-welcome-settings');
    if (saveButton) {
      saveButton.addEventListener('click', async () => {
        if (!guildId) return;
        const settings = {
          enabled: container.querySelector('[data-setting="enabled"]')?.classList.contains('bg-discord-blurple'),
          channelId: (container.querySelector('#welcome-channel-select') as HTMLSelectElement).value,
          dmEnabled: container.querySelector('[data-setting="dmEnabled"]')?.classList.contains('bg-discord-blurple'),
          message: (container.querySelector('#welcome-message-input') as HTMLTextAreaElement).value,
          bannerUrl: (container.querySelector('#welcome-banner-url') as HTMLInputElement).value,
          autoRoleIds: Array.from(container.querySelectorAll('#auto-roles-list input:checked')).map(el => (el as HTMLElement).dataset.roleId)
        };

        try {
          const response = await fetch(`/api/welcome-settings?guildId=${guildId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
          });
          const result = await response.json();
          if (result.success) {
            this.showNotification('Welcome settings saved successfully!', 'success');
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          console.error('Failed to save welcome settings:', error);
          this.showNotification('Failed to save settings.', 'error');
        }
      });
    }
  }

  private attachServerDashboardEventListeners(guildId: string, activePage: string): void {
    // Common Listeners for the server dashboard shell
    const backBtn = this.container.querySelector('#back-to-servers');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.render();
      });
    }

    const serverSwitcherSelect = this.container.querySelector('#server-switcher-select') as HTMLSelectElement;
    if (serverSwitcherSelect) {
      serverSwitcherSelect.addEventListener('change', (e) => {
        const newGuildId = (e.target as HTMLSelectElement).value;
        if (newGuildId) {
          this.renderServerDashboard(newGuildId, activePage);
        }
      });
    }

    const sidebarLinks = this.container.querySelectorAll('aside nav a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = (e.currentTarget as HTMLElement).dataset.page;
        if (page) {
          this.renderServerDashboard(guildId, page);
        }
      });
    });

    // Page-specific listeners
    if (activePage === 'home') {
      // Load initial data
      this.updateDashboardStats(guildId);
      this.loadActivityLogs(guildId);

      // Handle module toggles
      document.querySelectorAll('.module-toggle').forEach(container => {
        container.addEventListener('click', async (e) => {
          const moduleContainer = e.currentTarget as HTMLDivElement;
          const moduleName = moduleContainer.dataset.module;
          const toggleButton = moduleContainer.querySelector('.toggle-switch') as HTMLButtonElement;
          const toggleIndicator = moduleContainer.querySelector('.toggle-indicator') as HTMLSpanElement;

          const isEnabled = toggleButton.classList.contains('bg-discord-blurple');

          try {
            const response = await fetch(`/api/toggle-module`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('discord_token')}`
              },
              body: JSON.stringify({
                guildId,
                module: moduleName,
                enabled: !isEnabled
              })
            });

            if (!response.ok) {
              throw new Error('Failed to toggle module');
            }
            
            // Toggle visual state
            toggleButton.classList.toggle('bg-gray-600', isEnabled);
            toggleButton.classList.toggle('bg-discord-blurple', !isEnabled);
            toggleIndicator.classList.toggle('translate-x-4', !isEnabled);

            this.showNotification(`${moduleName} module ${!isEnabled ? 'enabled' : 'disabled'}`);
            
          } catch (error) {
            console.error('Error toggling module:', error);
            this.showNotification('Failed to toggle module', 'error');
          }
        });
      });

      // Refresh stats periodically
      const statsInterval = setInterval(() => {
        this.updateDashboardStats(guildId);
      }, 30000); // Update every 30 seconds

      // Refresh logs periodically
      const logsInterval = setInterval(() => {
        this.loadActivityLogs(guildId);
      }, 10000); // Update every 10 seconds

      // Clean up intervals when navigating away
      const originalRender = this.render.bind(this);
      this.render = () => {
        clearInterval(statsInterval);
        clearInterval(logsInterval);
        originalRender();
      }
    } else if (activePage === 'welcome') {
      this.attachWelcomeSystemEventListeners();
    } else if (activePage === 'tickets') {
      this.attachTicketSystemEventListeners();
    } else if (activePage === 'moderation') {
      this.attachModerationSystemEventListeners();
    } else if (activePage === 'bot-settings') {
      this.attachBotSettingsEventListeners();
    } else if (activePage === 'autoroles') {
      this.attachAutoRolesEventListeners();
    } else if (activePage === 'logs') {
      this.attachLogsAndAnalyticsEventListeners(guildId);
    } else if (activePage === 'permissions') {
      this.attachPermissionsEventListeners(guildId);
    } else if (activePage === 'keys') {
        this.attachKeyManagementEventListeners(guildId);
    } else if (activePage === 'store') {
        this.attachStoreManagementEventListeners();
    } else if (activePage === 'storefronts') {
        this.attachCreatorStorefrontsEventListeners(guildId);
    }
  }

  private async updateDashboardStats(guildId: string): Promise<void> {
    try {
      // Fetch server stats from the API
      const response = await fetch(`/api/server-stats?guildId=${guildId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('discord_token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch server stats');
      }

      const stats = await response.json();
      
      // Update the stats in the UI
      const memberCountEl = document.getElementById('member-count');
      const botUptimeEl = document.getElementById('bot-uptime');
      const commandsCountEl = document.getElementById('commands-count');
      
      if (memberCountEl) memberCountEl.textContent = stats.memberCount.toLocaleString();
      if (botUptimeEl) botUptimeEl.textContent = stats.uptime;
      if (commandsCountEl) commandsCountEl.textContent = stats.commandsUsed.toLocaleString();

    } catch (error) {
      console.error('Error updating dashboard stats:', error);
      this.showNotification('Failed to load server statistics', 'error');
    }
  }

  private async loadActivityLogs(guildId: string): Promise<void> {
    try {
      // Fetch recent activity logs from the API
      const response = await fetch(`/api/activity-logs?guildId=${guildId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('discord_token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch activity logs');
      }

      const logs = await response.json();
      const logsContainer = document.getElementById('activity-logs');
      
      if (logsContainer) {
        logsContainer.innerHTML = logs.map((log: any) => `
          <div class="bg-discord-dark/50 rounded-lg p-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-400">${new Date(log.timestamp).toLocaleString()}</span>
              <span class="px-2 py-1 text-xs rounded-full ${
                log.type === 'warning' ? 'bg-discord-yellow/20 text-discord-yellow' :
                log.type === 'error' ? 'bg-discord-red/20 text-discord-red' :
                'bg-discord-green/20 text-discord-green'
              }">${log.type}</span>
            </div>
            <p class="text-white mt-2">${log.message}</p>
          </div>
        `).join('');
      }

    } catch (error) {
      console.error('Error loading activity logs:', error);
      this.showNotification('Failed to load activity logs', 'error');
    }
  }

  private async renderModerationSystemPage(guildId: string): Promise<string> {
    const [settings, channels, roles] = await Promise.all([
      this.fetchModerationSettings(guildId),
      this.fetchGuildChannels(guildId),
      this.fetchGuildRoles(guildId)
    ]);

    const renderToggle = (setting: keyof ModerationSettings, enabled: boolean) => {
      const isEnabled = settings ? settings[setting] : enabled;
      const settingKey = String(setting);
      return `
        <button class="toggle-switch relative inline-flex items-center h-4 w-8 rounded-full transition-colors ${isEnabled ? 'bg-discord-blurple' : 'bg-gray-600'}" data-setting="${settingKey}">
          <span class="toggle-indicator absolute left-0 inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isEnabled ? 'translate-x-4' : ''}"></span>
        </button>
      `;
    };
    
    const textChannels = channels.filter(c => c.type === 0);

    return `
      <div class="space-y-8" data-guild-id="${guildId}">
        <!-- Header -->
        <div>
          <h2 class="text-3xl font-bold text-white">Moderation System</h2>
          <p class="text-gray-400 mt-1">Configure automated moderation and manage server rules.</p>
        </div>
  
        <!-- Logging & Mute Role -->
        <div class="glass-effect rounded-xl">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-white mb-2">Action Logging Channel</h3>
            <p class="text-sm text-gray-400 mb-4">Select a channel where all moderation actions will be logged.</p>
            <select id="mod-log-channel-select" class="w-full md:w-1/2 bg-discord-dark/50 border border-transparent rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-discord-blurple">
              ${textChannels.map(c => `<option value="${c.id}" ${settings?.logChannelId === c.id ? 'selected' : ''}>#${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="border-t border-white/10 p-6">
            <h3 class="text-lg font-semibold text-white mb-2">Mute Role</h3>
            <p class="text-sm text-gray-400 mb-4">Select the role to be used for muting members. The bot will need permissions to manage this role.</p>
            <select id="mute-role-select" class="w-full md:w-1/2 bg-discord-dark/50 border border-transparent rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-discord-blurple">
              ${roles.map(r => `<option value="${r.id}" ${settings?.muteRoleId === r.id ? 'selected' : ''}>${r.name}</option>`).join('')}
            </select>
          </div>
        </div>
        
        <!-- Auto Moderation -->
        <div class="glass-effect rounded-xl p-6">
          <h3 class="text-lg font-semibold text-white mb-4">Auto Moderation</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-discord-dark/50 rounded-lg">
              <div>
                <h4 class="font-medium text-white">Anti-Spam</h4>
                <p class="text-sm text-gray-400">Detect and prevent rapid messaging and message floods.</p>
              </div>
              ${renderToggle('antiSpamEnabled', false)}
            </div>
            <div class="flex items-center justify-between p-4 bg-discord-dark/50 rounded-lg">
              <div>
                <h4 class="font-medium text-white">Raid Protection</h4>
                <p class="text-sm text-gray-400">Automatically lock down the server if a large number of joins is detected.</p>
              </div>
              ${renderToggle('raidProtectionEnabled', false)}
            </div>
            <div>
              <h4 class="font-medium text-white mt-4">Banned Words Filter</h4>
              <p class="text-sm text-gray-400 mb-2">Automatically delete messages containing these words (comma-separated).</p>
              <textarea id="banned-words-list" class="w-full h-24 bg-discord-dark/50 border border-transparent rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-discord-blurple" placeholder="word1, phrase two, another one">${settings?.bannedWords.join(', ') || ''}</textarea>
            </div>
          </div>
        </div>
        
        <!-- Strike System -->
        <div class="glass-effect rounded-xl p-6">
          <h3 class="text-lg font-semibold text-white mb-4">Strike System</h3>
          <p class="text-sm text-gray-400 mb-4">Automatically punish members after they receive a certain number of warnings (strikes).</p>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <label for="strike-action-1" class="text-gray-300">After 3 strikes:</label>
              <select id="strike-action-1" class="w-1/2 bg-discord-dark/50 rounded-lg px-4 py-2" data-strikes="3">
                <option value="none" ${settings?.strikeActions['3'] === 'none' ? 'selected' : ''}>None</option>
                <option value="timeout-10m" ${settings?.strikeActions['3'] === 'timeout-10m' ? 'selected' : ''}>Timeout (10 Minutes)</option>
                <option value="kick" ${settings?.strikeActions['3'] === 'kick' ? 'selected' : ''}>Kick</option>
                <option value="ban" ${settings?.strikeActions['3'] === 'ban' ? 'selected' : ''}>Ban</option>
              </select>
            </div>
            <div class="flex items-center justify-between">
              <label for="strike-action-2" class="text-gray-300">After 5 strikes:</label>
              <select id="strike-action-2" class="w-1/2 bg-discord-dark/50 rounded-lg px-4 py-2" data-strikes="5">
                <option value="none" ${settings?.strikeActions['5'] === 'none' ? 'selected' : ''}>None</option>
                <option value="timeout-1h" ${settings?.strikeActions['5'] === 'timeout-1h' ? 'selected' : ''}>Timeout (1 Hour)</option>
                <option value="kick" ${settings?.strikeActions['5'] === 'kick' ? 'selected' : ''}>Kick</option>
                <option value="ban" ${settings?.strikeActions['5'] === 'ban' ? 'selected' : ''}>Ban</option>
              </select>
            </div>
          </div>
        </div>
  
        <!-- Save Button -->
        <div class="flex justify-end mt-8">
          <button id="save-moderation-settings" class="px-6 py-3 bg-discord-blurple hover:bg-discord-blurple/80 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L11 12.586l-2.293-2.293z"/></svg>
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    `;
  }

  private async fetchModerationSettings(guildId: string): Promise<ModerationSettings | null> {
    try {
      const resp = await fetch(`/api/moderation-settings?guildId=${guildId}`);
      if (!resp.ok) throw new Error('Failed to fetch moderation settings');
      return await resp.json();
    } catch (e) {
      console.error("Failed to fetch moderation settings", e);
      return null;
    }
  }

  private attachModerationSystemEventListeners(): void {
    const container = document.querySelector('.space-y-8[data-guild-id]');
    if (!container) return;
    const guildId = (container as HTMLElement).dataset.guildId;
  
    // --- Event listeners for toggle switches ---
    container.querySelectorAll('.toggle-switch').forEach(button => {
      button.addEventListener('click', () => {
        const indicator = button.querySelector('.toggle-indicator') as HTMLSpanElement;
        const isEnabled = button.classList.toggle('bg-discord-blurple');
        button.classList.toggle('bg-gray-600', !isEnabled);
        indicator.classList.toggle('translate-x-4', !isEnabled);
      });
    });
  
    // --- Event listener for Save button ---
    const saveButton = container.querySelector('#save-moderation-settings');
    if (saveButton) {
      saveButton.addEventListener('click', async () => {
        if (!guildId) return;

        const strikeActions: {[key: string]: string} = {};
        container.querySelectorAll<HTMLSelectElement>('[data-strikes]').forEach(select => {
          strikeActions[select.dataset.strikes!] = select.value;
        });

        const settings = {
          logChannelId: (container.querySelector('#mod-log-channel-select') as HTMLSelectElement).value,
          muteRoleId: (container.querySelector('#mute-role-select') as HTMLSelectElement).value,
          antiSpamEnabled: container.querySelector('[data-setting="antiSpamEnabled"]')?.classList.contains('bg-discord-blurple'),
          raidProtectionEnabled: container.querySelector('[data-setting="raidProtectionEnabled"]')?.classList.contains('bg-discord-blurple'),
          bannedWords: (container.querySelector('#banned-words-list') as HTMLTextAreaElement).value.split(',').map(w => w.trim()).filter(Boolean),
          strikeActions
        };
  
        try {
          const response = await fetch(`/api/moderation-settings?guildId=${guildId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
          });
          const result = await response.json();
          if (result.success) {
            this.showNotification('Moderation settings saved successfully!', 'success');
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          console.error('Failed to save moderation settings:', error);
          this.showNotification('Failed to save settings.', 'error');
        }
      });
    }
  }

  private renderEmbedBuilderPage(guildId: string): string {
    // NOTE: This is a static UI. Data fetching and event listeners will be added next.
    return `
      <div class="space-y-8" data-guild-id="${guildId}">
          <!-- Header -->
          <div>
              <h2 class="text-3xl font-bold text-white">Embed Builder</h2>
              <p class="text-gray-400 mt-1">Create and send custom embed messages to your server.</p>
          </div>
  
          <!-- Main Builder Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Left Panel: Editor -->
              <div class="glass-effect rounded-xl p-6 space-y-6">
                  <div>
                      <h3 class="text-lg font-semibold text-white mb-4">Embed Content</h3>
                      <div class="space-y-4">
                          <div>
                              <label class="block text-sm font-medium text-gray-300 mb-1">Color</label>
                              <input type="color" id="embed-color" class="w-full h-10 p-1 bg-discord-dark/50 rounded-lg" value="#5865F2">
                          </div>
                          <div>
                              <label for="embed-author" class="block text-sm font-medium text-gray-300 mb-1">Author Text</label>
                              <input type="text" id="embed-author" class="w-full bg-discord-dark/50 rounded-lg p-2" placeholder="Author Name">
                          </div>
                          <div>
                              <label for="embed-title" class="block text-sm font-medium text-gray-300 mb-1">Title</label>
                              <input type="text" id="embed-title" class="w-full bg-discord-dark/50 rounded-lg p-2" placeholder="Embed Title">
                          </div>
                          <div>
                              <label for="embed-description" class="block text-sm font-medium text-gray-300 mb-1">Description</label>
                              <textarea id="embed-description" class="w-full h-32 bg-discord-dark/50 rounded-lg p-2" placeholder="Embed description... Supports markdown!"></textarea>
                          </div>
                      </div>
                  </div>
  
                  <div>
                      <h3 class="text-lg font-semibold text-white mb-4">Embed Fields</h3>
                      <div id="embed-fields-list" class="space-y-4">
                          <!-- Fields will be added dynamically here -->
                      </div>
                      <button id="add-embed-field" class="mt-4 px-4 py-2 bg-discord-dark/50 hover:bg-discord-dark text-white rounded-lg transition-colors text-sm">Add Field</button>
                  </div>
                  
                  <div>
                       <label for="embed-footer" class="block text-sm font-medium text-gray-300 mb-1">Footer Text</label>
                       <input type="text" id="embed-footer" class="w-full bg-discord-dark/50 rounded-lg p-2" placeholder="Footer text">
                  </div>
              </div>
  
              <!-- Right Panel: Preview & Actions -->
              <div class="space-y-6">
                  <!-- Preview -->
                  <div class="bg-discord-dark rounded-lg p-4">
                      <h3 class="text-lg font-semibold text-white mb-4">Live Preview</h3>
                      <div id="embed-preview-container" class="bg-discord-darker rounded-lg p-4">
                          <div id="embed-preview" class="flex">
                              <div id="embed-preview-color" class="w-1 bg-discord-blurple rounded-l-lg"></div>
                              <div class="p-4 flex-1">
                                  <div id="embed-preview-author" class="text-sm font-semibold text-white mb-2" style="display: none;"></div>
                                  <div id="embed-preview-title" class="text-xl font-bold text-white mb-2" style="display: none;"></div>
                                  <div id="embed-preview-description" class="text-gray-300 text-sm whitespace-pre-wrap" style="display: none;"></div>
                                  <div id="embed-preview-fields" class="grid grid-cols-1 gap-y-2 mt-4"></div>
                                  <div id="embed-preview-footer" class="text-xs text-gray-400 mt-4 pt-2 border-t border-white/10" style="display: none;"></div>
                              </div>
                          </div>
                      </div>
                  </div>
  
                  <!-- Actions -->
                  <div class="glass-effect rounded-xl p-6">
                       <h3 class="text-lg font-semibold text-white mb-4">Actions</h3>
                       <div class="space-y-4">
                          <div>
                              <label class="block text-sm font-medium text-gray-300 mb-1">Send to Channel</label>
                              <select id="embed-send-channel" class="w-full bg-discord-dark/50 rounded-lg p-2">
                                  <option>Select a channel...</option>
                              </select>
                          </div>
                          <button id="send-embed-btn" class="w-full px-6 py-3 bg-discord-green hover:bg-discord-green/80 text-white rounded-lg font-medium">Send Embed</button>
                          
                          <div class="flex items-center space-x-4">
                              <button id="save-template-btn" class="flex-1 px-4 py-2 bg-discord-blurple hover:bg-discord-blurple/80 text-white rounded-lg font-medium">Save as Template</button>
                              <select id="load-template-select" class="flex-1 bg-discord-dark/50 rounded-lg p-2">
                                  <option>Load a template...</option>
                              </select>
                          </div>
                       </div>
                  </div>
              </div>
          </div>
      </div>
    `;
  }

  private async renderBotSettingsPage(guildId: string): Promise<string> {
    const settings = await this.fetchBotSettings(guildId);
    
    return `
      <div class="space-y-8" data-guild-id="${guildId}">
          <!-- Header -->
          <div>
              <h2 class="text-3xl font-bold text-white">Bot Settings</h2>
              <p class="text-gray-400 mt-1">Global settings for how the bot behaves in this server.</p>
          </div>
    
          <!-- Core Settings -->
          <div class="glass-effect rounded-xl p-6">
              <h3 class="text-lg font-semibold text-white mb-4">Core Settings</h3>
              <div class="space-y-4">
                  <div>
                      <label for="bot-prefix" class="block text-sm font-medium text-gray-300 mb-1">Command Prefix</label>
                      <input type="text" id="bot-prefix" class="w-full md:w-1/4 bg-discord-dark/50 rounded-lg p-2" placeholder="!" value="${settings?.prefix || ''}">
                  </div>
                  <div>
                      <label for="bot-language" class="block text-sm font-medium text-gray-300 mb-1">Language</label>
                      <select id="bot-language" class="w-full md:w-1/2 bg-discord-dark/50 rounded-lg p-2">
                          <option value="en-US" ${settings?.language === 'en-US' ? 'selected' : ''}>English (US)</option>
                          <option value="es-ES" ${settings?.language === 'es-ES' ? 'selected' : ''}>Español</option>
                          <option value="fr-FR" ${settings?.language === 'fr-FR' ? 'selected' : ''}>Français</option>
                      </select>
                  </div>
                   <div>
                      <label for="bot-timezone" class="block text-sm font-medium text-gray-300 mb-1">Timezone</label>
                      <select id="bot-timezone" class="w-full md:w-1/2 bg-discord-dark/50 rounded-lg p-2">
                          <option value="UTC" ${settings?.timezone === 'UTC' ? 'selected' : ''}>UTC</option>
                          <option value="PST" ${settings?.timezone === 'PST' ? 'selected' : ''}>Pacific Standard Time</option>
                          <option value="EST" ${settings?.timezone === 'EST' ? 'selected' : ''}>Eastern Standard Time</option>
                      </select>
                  </div>
              </div>
          </div>

          <!-- Self-Host Settings -->
          <div class="glass-effect rounded-xl p-6">
              <h3 class="text-lg font-semibold text-white mb-4">Appearance (Self-Hosted Only)</h3>
               <div class="space-y-4">
                  <div>
                      <label for="bot-name" class="block text-sm font-medium text-gray-300 mb-1">Bot Name</label>
                      <input type="text" id="bot-name" class="w-full md:w-1/2 bg-discord-dark/50 rounded-lg p-2" placeholder="Velari" value="${settings?.name || ''}">
                  </div>
                  <div>
                      <label for="bot-avatar" class="block text-sm font-medium text-gray-300 mb-1">Bot Avatar URL</label>
                      <input type="text" id="bot-avatar" class="w-full bg-discord-dark/50 rounded-lg p-2" placeholder="https://example.com/avatar.png" value="${settings?.avatar || ''}">
                  </div>
              </div>
          </div>
  
          <!-- Command Permissions -->
           <div class="glass-effect rounded-xl p-6">
              <h3 class="text-lg font-semibold text-white mb-4">Command Permissions</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                      <label for="command-whitelist" class="block text-sm font-medium text-gray-300 mb-1">Whitelisted Commands</label>
                      <p class="text-xs text-gray-400 mb-2">Only these commands can be used. (Leave empty to allow all)</p>
                      <textarea id="command-whitelist" class="w-full h-32 bg-discord-dark/50 rounded-lg p-2" placeholder="play, skip, queue">${settings?.commandWhitelist.join(', ') || ''}</textarea>
                  </div>
                   <div>
                      <label for="command-blacklist" class="block text-sm font-medium text-gray-300 mb-1">Blacklisted Commands</label>
                      <p class="text-xs text-gray-400 mb-2">These commands cannot be used.</p>
                      <textarea id="command-blacklist" class="w-full h-32 bg-discord-dark/50 rounded-lg p-2" placeholder="ban, kick">${settings?.commandBlacklist.join(', ') || ''}</textarea>
                  </div>
              </div>
          </div>
  
          <!-- Save Button -->
          <div class="flex justify-end mt-8">
              <button id="save-bot-settings" class="px-6 py-3 bg-discord-blurple hover:bg-discord-blurple/80 text-white rounded-lg font-medium transition-colors">Save Changes</button>
          </div>
      </div>
    `;
  }

  private async fetchBotSettings(guildId: string): Promise<BotSettings | null> {
    try {
      const resp = await fetch(`/api/bot-settings?guildId=${guildId}`);
      if (!resp.ok) throw new Error('Failed to fetch bot settings');
      return await resp.json();
    } catch (e) {
      console.error("Failed to fetch bot settings", e);
      this.showNotification('Failed to load bot settings.', 'error');
      return null;
    }
  }

  private attachBotSettingsEventListeners(): void {
    const container = this.container.querySelector('.space-y-8[data-guild-id]');
    if (!container) return;
    const guildId = (container as HTMLElement).dataset.guildId;

    const saveButton = container.querySelector('#save-bot-settings');
    if (saveButton) {
      saveButton.addEventListener('click', async () => {
        if (!guildId) return;

        const getInputValue = (id: string) => (container.querySelector(`#${id}`) as HTMLInputElement).value;
        const getTextAreaValue = (id: string) => (container.querySelector(`#${id}`) as HTMLTextAreaElement).value;

        const settings: BotSettings = {
          prefix: getInputValue('bot-prefix'),
          language: getInputValue('bot-language'),
          timezone: getInputValue('bot-timezone'),
          name: getInputValue('bot-name'),
          avatar: getInputValue('bot-avatar'),
          commandWhitelist: getTextAreaValue('command-whitelist').split(',').map(cmd => cmd.trim()).filter(Boolean),
          commandBlacklist: getTextAreaValue('command-blacklist').split(',').map(cmd => cmd.trim()).filter(Boolean),
        };

        try {
          const response = await fetch(`/api/bot-settings?guildId=${guildId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
          });
          const result = await response.json();
          if (result.success) {
            this.showNotification('Bot settings saved successfully!', 'success');
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          console.error('Failed to save bot settings:', error);
          this.showNotification('Failed to save settings.', 'error');
        }
      });
    }
  }

  private async renderAutoRolesPage(guildId: string): Promise<string> {
    const [settings, channels, roles] = await Promise.all([
        this.fetchAutoRolesSettings(guildId),
        this.fetchGuildChannels(guildId),
        this.fetchGuildRoles(guildId)
    ]);

    const renderMenu = (menu: ReactionRoleMenu) => {
        return `
            <div class="bg-discord-dark/50 rounded-lg p-4" data-menu-id="${menu.id}">
                <input type="text" class="w-full bg-transparent text-white text-lg font-semibold mb-2" value="${menu.embedTitle}">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">Channel & Message ID</label>
                        <div class="flex space-x-2">
                            <select class="w-1/2 bg-discord-darker rounded-lg p-2">
                                ${channels.filter(c => c.type === 0).map(c => `<option value="${c.id}" ${c.id === menu.channelId ? 'selected' : ''}>#${c.name}</option>`).join('')}
                            </select>
                            <input type="text" class="w-1/2 bg-discord-darker rounded-lg p-2" placeholder="Message ID" value="${menu.messageId}">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">Emoji & Role Mappings</label>
                        <div class="space-y-2 reaction-role-mappings">
                        ${menu.mappings.map(m => `
                            <div class="flex items-center space-x-2">
                                <input type="text" class="w-16 bg-discord-darker rounded-lg p-2 text-center" value="${m.emoji}">
                                <select class="flex-grow bg-discord-darker rounded-lg p-2">
                                    ${roles.map(r => `<option value="${r.id}" ${r.id === m.roleId ? 'selected' : ''}>${r.name}</option>`).join('')}
                                </select>
                                <button class="remove-mapping-btn p-2 text-gray-400 hover:text-white hover:bg-red-600/50 rounded-full transition-colors">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>
                        `).join('')}
                        </div>
                        <button class="add-mapping-btn mt-2 px-3 py-1 bg-discord-darker hover:bg-discord-dark text-white rounded-lg text-sm">Add Row</button>
                    </div>
                     <div class="flex items-center justify-between">
                        <label class="text-sm text-gray-300">Stack Roles</label>
                        <button class="toggle-switch" data-setting="stackRoles"></button>
                    </div>
                     <div class="flex items-center justify-between">
                        <label class="text-sm text-gray-300">Remove on Un-react</label>
                        <button class="toggle-switch" data-setting="removeOnUnreact"></button>
                    </div>
                </div>
                <button class="remove-menu-btn mt-4 w-full text-center py-2 bg-red-600/50 hover:bg-red-600/80 rounded-lg">Delete Menu</button>
            </div>
        `;
    };

    return `
        <div class="space-y-8" data-guild-id="${guildId}">
            <!-- Header -->
            <div>
                <h2 class="text-3xl font-bold text-white">Auto Roles & Reaction Roles</h2>
                <p class="text-gray-400 mt-1">Automatically assign roles to new members and create reaction role menus.</p>
            </div>

            <!-- Auto Role on Join -->
            <div class="glass-effect rounded-xl p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-semibold text-white">Auto Role on Join</h3>
                        <p class="text-sm text-gray-400">Assign a role to members as soon as they join the server.</p>
                    </div>
                    <button class="toggle-switch relative inline-flex items-center h-4 w-8 rounded-full transition-colors ${settings?.autoRoleOnJoinEnabled ? 'bg-discord-blurple' : 'bg-gray-600'}" data-setting="autoRoleOnJoinEnabled">
                        <span class="toggle-indicator absolute left-0 inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${settings?.autoRoleOnJoinEnabled ? 'translate-x-4' : ''}"></span>
                    </button>
                </div>
                <div class="mt-4">
                    <label for="auto-role-select" class="block text-sm font-medium text-gray-300 mb-1">Role to Assign</label>
                    <select id="auto-role-select" class="w-full md:w-1/2 bg-discord-dark/50 rounded-lg p-2">
                        <option value="">None</option>
                        ${roles.map(r => `<option value="${r.id}" ${settings?.autoRoleOnJoinId === r.id ? 'selected' : ''}>${r.name}</option>`).join('')}
                    </select>
                </div>
            </div>

            <!-- Reaction Role Menus -->
            <div class="glass-effect rounded-xl p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-white">Reaction Role Menus</h3>
                    <button id="add-reaction-menu" class="px-4 py-2 bg-discord-blurple hover:bg-discord-blurple/80 text-white rounded-lg font-medium">Create Menu</button>
                </div>
                <div id="reaction-menus-container" class="space-y-6">
                    ${settings && settings.reactionRoleMenus.length > 0
                        ? settings.reactionRoleMenus.map(renderMenu).join('')
                        : '<p class="text-gray-400">No reaction role menus have been created yet.</p>'
                    }
                </div>
            </div>

            <!-- Save Button -->
            <div class="flex justify-end mt-8">
                <button id="save-autoroles-settings" class="px-6 py-3 bg-discord-green hover:bg-discord-green/80 text-white rounded-lg font-medium transition-colors">Save All Changes</button>
            </div>
        </div>
    `;
  }
  
  private async fetchAutoRolesSettings(guildId: string): Promise<AutoRolesSettings | null> {
    try {
        const resp = await fetch(`/api/autoroles-settings?guildId=${guildId}`);
        if (!resp.ok) throw new Error('Failed to fetch auto-roles settings');
        return await resp.json();
    } catch (e) {
        console.error("Failed to fetch auto-roles settings", e);
        this.showNotification('Failed to load auto-roles settings.', 'error');
        return null;
    }
  }

  private attachAutoRolesEventListeners(): void {
    const container = this.container.querySelector('.space-y-8[data-guild-id]');
    if (!container) return;
    const guildId = (container as HTMLElement).dataset.guildId;

    // Simplified toggle logic
    container.querySelectorAll('.toggle-switch').forEach(button => {
        button.addEventListener('click', () => {
            const indicator = button.querySelector('.toggle-indicator');
            button.classList.toggle('bg-discord-blurple');
            button.classList.toggle('bg-gray-600');
            if(indicator) indicator.classList.toggle('translate-x-4');
        });
    });
    
    // Add new menu
    const addMenuBtn = container.querySelector('#add-reaction-menu');
    addMenuBtn?.addEventListener('click', () => {
        // For now, we'll just re-render with a new blank menu object.
        // A more sophisticated approach would manipulate the DOM directly.
        this.showNotification("Creating a new menu... (UI placeholder)", "success");
    });
    
    // Save all settings
    const saveBtn = container.querySelector('#save-autoroles-settings');
    saveBtn?.addEventListener('click', async () => {
        if (!guildId) return;
        this.showNotification("Saving... (functionality to be fully implemented)", "success");
        // Full save logic will be implemented later
    });
  }

  private renderLogsAndAnalyticsPage(guildId: string): string {
    // NOTE: This is a static UI. Data fetching and event listeners will be added next.
    return `
      <div class="space-y-8" data-guild-id="${guildId}">
        <!-- Header -->
        <div>
          <h2 class="text-3xl font-bold text-white">Logs & Analytics</h2>
          <p class="text-gray-400 mt-1">Review server activity and track growth metrics.</p>
        </div>

        <!-- Analytics Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="glass-effect rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white mb-2">Server Growth</h3>
                <p class="text-3xl font-bold text-white" id="server-growth-stat">+12%</p>
                <p class="text-sm text-gray-400">in the last 30 days</p>
            </div>
            <div class="glass-effect rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white mb-2">Engagement</h3>
                <p class="text-3xl font-bold text-white" id="engagement-stat">78%</p>
                <p class="text-sm text-gray-400">Active members this week</p>
            </div>
            <div class="glass-effect rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white mb-2">Top Command</h3>
                <p class="text-3xl font-bold text-white" id="top-command-stat">/play</p>
                <p class="text-sm text-gray-400">Most used command</p>
            </div>
        </div>

        <!-- Log Viewer -->
        <div class="glass-effect rounded-xl p-6">
            <div class="flex flex-wrap items-center justify-between mb-4 gap-4">
                <h3 class="text-lg font-semibold text-white">Activity Logs</h3>
                <div class="flex items-center space-x-4">
                    <select id="log-type-filter" class="bg-discord-dark/50 rounded-lg p-2">
                        <option value="all">All Logs</option>
                        <option value="moderation">Moderation</option>
                        <option value="tickets">Tickets</option>
                        <option value="joins_leaves">Joins/Leaves</option>
                        <option value="messages">Message Edits/Deletes</option>
                    </select>
                    <input type="text" id="log-user-filter" placeholder="Filter by User ID..." class="bg-discord-dark/50 rounded-lg p-2">
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full text-sm text-left text-gray-300">
                    <thead class="text-xs text-gray-400 uppercase bg-discord-dark/50">
                        <tr>
                            <th scope="col" class="px-6 py-3">Timestamp</th>
                            <th scope="col" class="px-6 py-3">User</th>
                            <th scope="col" class="px-6 py-3">Type</th>
                            <th scope="col" class="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody id="logs-table-body">
                        <!-- Log rows will be added dynamically here -->
                        <tr><td colspan="4" class="text-center py-8">Loading logs...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    `;
  }

  private attachLogsAndAnalyticsEventListeners(guildId: string): void {
    this.updateLogsAndAnalytics(guildId); // Initial load

    const logTypeFilter = this.container.querySelector('#log-type-filter');
    const userFilter = this.container.querySelector('#log-user-filter');

    logTypeFilter?.addEventListener('change', () => this.updateLogsAndAnalytics(guildId));
    userFilter?.addEventListener('input', () => this.updateLogsAndAnalytics(guildId));
  }
  
  private async updateLogsAndAnalytics(guildId: string): Promise<void> {
    try {
        const analytics = await this.fetchAnalyticsAndLogs(guildId);
        if (!analytics) return;

        // Update analytics stats
        const growthStat = this.container.querySelector('#server-growth-stat');
        const engagementStat = this.container.querySelector('#engagement-stat');
        const topCommandStat = this.container.querySelector('#top-command-stat');
        if (growthStat) growthStat.textContent = analytics.serverGrowth;
        if (engagementStat) engagementStat.textContent = analytics.engagement;
        if (topCommandStat) topCommandStat.textContent = analytics.topCommand;

        // Update logs table
        const logType = (this.container.querySelector('#log-type-filter') as HTMLSelectElement).value as LogType;
        const userQuery = (this.container.querySelector('#log-user-filter') as HTMLInputElement).value.toLowerCase();

        const filteredLogs = analytics.logs.filter(log => {
            const typeMatch = logType === 'all' || log.type === logType;
            const userMatch = log.userId.includes(userQuery) || log.userTag.toLowerCase().includes(userQuery);
            return typeMatch && userMatch;
        });

        const tableBody = this.container.querySelector('#logs-table-body');
        if (tableBody) {
            if (filteredLogs.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="4" class="text-center py-8">No logs found for the selected filters.</td></tr>';
                return;
            }
            tableBody.innerHTML = filteredLogs.map(log => `
                <tr class="border-b border-gray-700 hover:bg-white/5">
                    <td class="px-6 py-4">${new Date(log.timestamp).toLocaleString()}</td>
                    <td class="px-6 py-4">${log.userTag} (${log.userId})</td>
                    <td class="px-6 py-4"><span class="px-2 py-1 text-xs rounded-full bg-discord-blurple/50">${log.type}</span></td>
                    <td class="px-6 py-4 font-mono">${log.action}</td>
                </tr>
            `).join('');
        }
    } catch (e) {
        console.error("Failed to update logs and analytics", e);
        this.showNotification('Failed to load logs and analytics data.', 'error');
    }
  }

  private async fetchAnalyticsAndLogs(guildId: string): Promise<ServerAnalytics | null> {
    try {
        const resp = await fetch(`/api/analytics-and-logs?guildId=${guildId}`);
        if (!resp.ok) throw new Error('Failed to fetch analytics and logs');
        return await resp.json();
    } catch (e) {
        console.error("Failed to fetch analytics and logs", e);
        return null;
    }
  }

  private renderPermissionsPage(guildId: string): string {
    // NOTE: This is a static UI. Data fetching and event listeners will be added next.
    return `
      <div class="space-y-8" data-guild-id="${guildId}">
        <!-- Header -->
        <div>
            <h2 class="text-3xl font-bold text-white">Permission Management</h2>
            <p class="text-gray-400 mt-1">Control who can use bot commands and access dashboard features.</p>
        </div>

        <!-- Role-based Permissions -->
        <div class="glass-effect rounded-xl p-6">
            <h3 class="text-lg font-semibold text-white mb-4">Role Permissions</h3>
            <p class="text-sm text-gray-400 mb-4">Select a role to configure its permissions.</p>
            <div class="flex items-center space-x-4">
                <select id="permission-role-select" class="flex-grow bg-discord-dark/50 rounded-lg p-2">
                    <option>Loading roles...</option>
                </select>
            </div>
            
            <div id="permissions-editor" class="mt-6 hidden">
                <!-- Dashboard Access -->
                <div class="mb-6">
                    <h4 class="text-md font-semibold text-white mb-3">Dashboard Access</h4>
                    <div class="flex items-center justify-between p-3 bg-discord-dark/50 rounded-lg">
                        <div>
                            <p class="font-medium">Allow Dashboard Access</p>
                            <p class="text-xs text-gray-400">Allows users with this role to view the server dashboard.</p>
                        </div>
                        <button class="toggle-switch" data-permission="dashboardAccess"></button>
                    </div>
                </div>

                <!-- Module Permissions -->
                <div class="mb-6">
                    <h4 class="text-md font-semibold text-white mb-3">Module Permissions</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div class="flex items-center justify-between p-3 bg-discord-dark/50 rounded-lg">
                            <p>Welcome System</p> <button class="toggle-switch" data-permission="module.welcome"></button>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-discord-dark/50 rounded-lg">
                            <p>Ticket System</p> <button class="toggle-switch" data-permission="module.tickets"></button>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-discord-dark/50 rounded-lg">
                            <p>Moderation</p> <button class="toggle-switch" data-permission="module.moderation"></button>
                        </div>
                         <div class="flex items-center justify-between p-3 bg-discord-dark/50 rounded-lg">
                            <p>Auto Roles</p> <button class="toggle-switch" data-permission="module.autoroles"></button>
                        </div>
                    </div>
                </div>

                <!-- Command Overrides -->
                <div>
                    <h4 class="text-md font-semibold text-white mb-3">Command Overrides</h4>
                    <p class="text-sm text-gray-400 mb-2">Explicitly allow or deny specific commands for this role.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm text-gray-300 mb-1">Allowed Commands</label>
                            <textarea class="w-full h-24 bg-discord-dark/50 rounded-lg p-2" placeholder="play, skip"></textarea>
                        </div>
                        <div>
                            <label class="block text-sm text-gray-300 mb-1">Denied Commands</label>
                            <textarea class="w-full h-24 bg-discord-dark/50 rounded-lg p-2" placeholder="ban, kick"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end mt-8">
            <button id="save-permissions-settings" class="px-6 py-3 bg-discord-green hover:bg-discord-green/80 text-white rounded-lg font-medium">Save Permissions</button>
        </div>
      </div>
    `;
  }

  private async attachPermissionsEventListeners(guildId: string): Promise<void> {
    const roles = await this.fetchGuildRoles(guildId);
    const roleSelect = this.container.querySelector<HTMLSelectElement>('#permission-role-select');
    const editor = this.container.querySelector<HTMLElement>('#permissions-editor');
    const saveButton = this.container.querySelector<HTMLButtonElement>('#save-permissions-settings');

    if (!roleSelect || !editor || !saveButton) return;

    // Populate role dropdown
    roleSelect.innerHTML = '<option value="">Select a role...</option>' + roles.map(r => `<option value="${r.id}">${r.name}</option>`).join('');

    let currentSettings: PermissionSettings | null = null;

    // Role selection change
    roleSelect.addEventListener('change', async (e) => {
        const roleId = (e.target as HTMLSelectElement).value;
        if (!roleId) {
            editor.classList.add('hidden');
            return;
        }
        
        currentSettings = await this.fetchPermissions(guildId, roleId);
        if (!currentSettings) {
            this.showNotification('Could not load permissions for this role.', 'error');
            return;
        }

        // Populate the editor with fetched settings
        this.updatePermissionsEditor(currentSettings);
        editor.classList.remove('hidden');
    });

    // Save button click
    saveButton.addEventListener('click', async () => {
        const roleId = roleSelect.value;
        if (!roleId || !currentSettings) {
            this.showNotification('Please select a role first.', 'error');
            return;
        }

        // Collect data from the form
        const newSettings: PermissionSettings = {
            roleId: roleId,
            dashboardAccess: this.container.querySelector<HTMLButtonElement>('[data-permission="dashboardAccess"]')?.classList.contains('bg-discord-blurple') ?? false,
            modules: {
                welcome: this.container.querySelector<HTMLButtonElement>('[data-permission="module.welcome"]')?.classList.contains('bg-discord-blurple') ?? false,
                tickets: this.container.querySelector<HTMLButtonElement>('[data-permission="module.tickets"]')?.classList.contains('bg-discord-blurple') ?? false,
                moderation: this.container.querySelector<HTMLButtonElement>('[data-permission="module.moderation"]')?.classList.contains('bg-discord-blurple') ?? false,
                autoroles: this.container.querySelector<HTMLButtonElement>('[data-permission="module.autoroles"]')?.classList.contains('bg-discord-blurple') ?? false,
            },
            allowedCommands: this.container.querySelector<HTMLTextAreaElement>('textarea[placeholder="play, skip"]')?.value.split(',').map(c => c.trim()).filter(Boolean) ?? [],
            deniedCommands: this.container.querySelector<HTMLTextAreaElement>('textarea[placeholder="ban, kick"]')?.value.split(',').map(c => c.trim()).filter(Boolean) ?? [],
        };
        
        await this.savePermissions(guildId, newSettings);
    });

    // Add toggle functionality
    this.container.querySelectorAll('#permissions-editor .toggle-switch').forEach(button => {
        button.addEventListener('click', () => {
             const indicator = button.querySelector('.toggle-indicator');
             button.classList.toggle('bg-discord-blurple');
             button.classList.toggle('bg-gray-600');
             if(indicator) indicator.classList.toggle('translate-x-4');
        });
    });
  }
  
  private updatePermissionsEditor(settings: PermissionSettings) {
      const setToggleState = (permission: string, enabled: boolean) => {
          const button = this.container.querySelector<HTMLButtonElement>(`[data-permission="${permission}"]`);
          if (!button) return;
          button.classList.toggle('bg-discord-blurple', enabled);
          button.classList.toggle('bg-gray-600', !enabled);
          const indicator = button.querySelector('.toggle-indicator');
          if(indicator) indicator.classList.toggle('translate-x-4', enabled);
      };

      setToggleState('dashboardAccess', settings.dashboardAccess);
      Object.entries(settings.modules).forEach(([key, value]) => {
          setToggleState(`module.${key}`, value);
      });

      const allowedCommandsInput = this.container.querySelector<HTMLTextAreaElement>('textarea[placeholder="play, skip"]');
      const deniedCommandsInput = this.container.querySelector<HTMLTextAreaElement>('textarea[placeholder="ban, kick"]');

      if (allowedCommandsInput) allowedCommandsInput.value = settings.allowedCommands.join(', ');
      if (deniedCommandsInput) deniedCommandsInput.value = settings.deniedCommands.join(', ');
  }

  private async fetchPermissions(guildId: string, roleId: string): Promise<PermissionSettings | null> {
      try {
          const resp = await fetch(`/api/permissions?guildId=${guildId}&roleId=${roleId}`);
          if (!resp.ok) throw new Error('Failed to fetch permissions');
          return await resp.json();
      } catch (e) {
          console.error("Failed to fetch permissions", e);
          return null;
      }
  }

  private async savePermissions(guildId: string, settings: PermissionSettings): Promise<void> {
      try {
          const response = await fetch(`/api/permissions?guildId=${guildId}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(settings)
          });
          const result = await response.json();
          if (result.success) {
              this.showNotification('Permissions saved successfully!', 'success');
          } else {
              throw new Error(result.message);
          }
      } catch (error) {
          console.error('Failed to save permissions:', error);
          this.showNotification('Failed to save permissions.', 'error');
      }
  }

  private renderKeyManagementPage(guildId: string): string {
    // NOTE: This is a static UI. Data fetching and event listeners will be added next.
    return `
      <div class="space-y-8" data-guild-id="${guildId}">
        <!-- Header -->
        <div>
            <h2 class="text-3xl font-bold text-white">Key Management</h2>
            <p class="text-gray-400 mt-1">Manage licenses for premium modules and custom server features.</p>
        </div>

        <!-- Key Actions -->
        <div class="glass-effect rounded-xl p-6 flex flex-wrap items-center justify-between gap-4">
            <h3 class="text-lg font-semibold text-white">License Control</h3>
            <div class="flex items-center space-x-2">
                <button id="create-key-btn" class="px-4 py-2 bg-discord-green hover:bg-discord-green/80 text-white rounded-lg font-medium">Create Key</button>
                <input type="text" id="redeem-key-input" placeholder="Redeem a key..." class="bg-discord-dark/50 rounded-lg p-2">
                <button id="redeem-key-btn" class="px-4 py-2 bg-discord-blurple hover:bg-discord-blurple/80 text-white rounded-lg font-medium">Redeem</button>
            </div>
        </div>

        <!-- Key List -->
        <div class="glass-effect rounded-xl p-6">
            <h3 class="text-lg font-semibold text-white mb-4">Generated Keys</h3>
             <div class="overflow-x-auto">
                <table class="min-w-full text-sm text-left text-gray-300">
                    <thead class="text-xs text-gray-400 uppercase bg-discord-dark/50">
                        <tr>
                            <th scope="col" class="px-6 py-3">License Key</th>
                            <th scope="col" class="px-6 py-3">Type</th>
                            <th scope="col" class="px-6 py-3">Unlocks</th>
                            <th scope="col" class="px-6 py-3">Status</th>
                            <th scope="col" class="px-6 py-3">Expiry</th>
                            <th scope="col" class="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="keys-table-body">
                        <!-- Key rows will be added dynamically here -->
                        <tr><td colspan="6" class="text-center py-8">Loading keys...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

         <!-- Redemption Logs -->
        <div class="glass-effect rounded-xl p-6">
            <h3 class="text-lg font-semibold text-white mb-4">Redemption History</h3>
             <div class="overflow-x-auto">
                <table class="min-w-full text-sm text-left text-gray-300">
                    <thead class="text-xs text-gray-400 uppercase bg-discord-dark/50">
                        <tr>
                            <th scope="col" class="px-6 py-3">Timestamp</th>
                            <th scope="col" class="px-6 py-3">Key</th>
                            <th scope="col" class="px-6 py-3">Redeemed by</th>
                            <th scope="col" class="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody id="key-logs-table-body">
                        <tr><td colspan="4" class="text-center py-8">Loading history...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    `;
  }

  private attachKeyManagementEventListeners(guildId: string): void {
    this.updateKeyManagementData(guildId); // Initial load

    const createBtn = this.container.querySelector('#create-key-btn');
    const redeemBtn = this.container.querySelector('#redeem-key-btn');

    createBtn?.addEventListener('click', () => {
        // Here you would open a modal to create a new key.
        // For now, we'll just show a notification.
        this.showNotification('Key creation modal would open here.', 'success');
    });

    redeemBtn?.addEventListener('click', () => {
        const keyInput = this.container.querySelector<HTMLInputElement>('#redeem-key-input');
        if (keyInput && keyInput.value) {
            this.showNotification(`Attempting to redeem key: ${keyInput.value}`, 'success');
            // Add actual redemption logic here
            keyInput.value = '';
        } else {
            this.showNotification('Please enter a key to redeem.', 'error');
        }
    });
  }
  
  private async updateKeyManagementData(guildId: string): Promise<void> {
    try {
        const data = await this.fetchKeyManagementData(guildId);
        if (!data) return;

        // Populate keys table
        const keysTableBody = this.container.querySelector('#keys-table-body');
        if (keysTableBody) {
            if (data.keys.length === 0) {
                keysTableBody.innerHTML = '<tr><td colspan="6" class="text-center py-8">No license keys found.</td></tr>';
            } else {
                keysTableBody.innerHTML = data.keys.map(key => this.renderKeyRow(key)).join('');
            }
        }

        // Populate logs table
        const logsTableBody = this.container.querySelector('#key-logs-table-body');
        if (logsTableBody) {
             if (data.logs.length === 0) {
                logsTableBody.innerHTML = '<tr><td colspan="4" class="text-center py-8">No redemption history found.</td></tr>';
            } else {
                logsTableBody.innerHTML = data.logs.map(log => `
                    <tr class="border-b border-gray-700">
                        <td class="px-6 py-4">${new Date(log.timestamp).toLocaleString()}</td>
                        <td class="px-6 py-4 font-mono">${log.key}</td>
                        <td class="px-6 py-4">${log.userTag} (${log.userId})</td>
                        <td class="px-6 py-4"><span class="px-2 py-1 text-xs rounded-full ${log.status === 'Success' ? 'bg-discord-green/50' : 'bg-discord-red/50'}">${log.status}</span></td>
                    </tr>
                `).join('');
            }
        }

    } catch (e) {
        console.error("Failed to update key management data", e);
        this.showNotification('Failed to load key management data.', 'error');
    }
  }
  
  private renderKeyRow(key: LicenseKey): string {
    const statusColor = {
        Active: 'bg-discord-green/50',
        Redeemed: 'bg-discord-blurple/50',
        Expired: 'bg-discord-yellow/50',
        Revoked: 'bg-discord-red/50'
    }[key.status];

    return `
      <tr class="border-b border-gray-700 hover:bg-white/5">
        <td class="px-6 py-4 font-mono">${key.key}</td>
        <td class="px-6 py-4">${key.type}</td>
        <td class="px-6 py-4">${key.unlocks}</td>
        <td class="px-6 py-4"><span class="px-2 py-1 text-xs rounded-full ${statusColor}">${key.status}</span></td>
        <td class="px-6 py-4">${key.expiry ? new Date(key.expiry).toLocaleDateString() : 'Never'}</td>
        <td class="px-6 py-4">
            <button class="p-1 text-gray-400 hover:text-white" title="Edit"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg></button>
            <button class="p-1 text-gray-400 hover:text-white" title="Revoke"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg></button>
        </td>
      </tr>
    `;
  }

  private async fetchKeyManagementData(guildId: string): Promise<{ keys: LicenseKey[], logs: KeyRedemptionLog[] } | null> {
    try {
        const resp = await fetch(`/api/key-management?guildId=${guildId}`);
        if (!resp.ok) throw new Error('Failed to fetch key management data');
        return await resp.json();
    } catch (e) {
        console.error("Failed to fetch key management data", e);
        return null;
    }
  }

  private renderStoreManagementPage(): string {
    return `
      <div class="space-y-8">
        <!-- Header -->
        <div>
          <h2 class="text-3xl font-bold text-white">Store & Payment Management</h2>
          <p class="text-gray-400 mt-1">Manage Velari premium features sales and customer transactions.</p>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="glass-effect rounded-xl p-6">
            <div class="flex items-center">
              <div class="p-3 bg-discord-green/20 rounded-lg">
                <svg class="w-6 h-6 text-discord-green" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-400">Total Revenue</p>
                <p class="text-2xl font-bold text-white" id="total-revenue">$0.00</p>
              </div>
            </div>
          </div>
          
          <div class="glass-effect rounded-xl p-6">
            <div class="flex items-center">
              <div class="p-3 bg-discord-blurple/20 rounded-lg">
                <svg class="w-6 h-6 text-discord-blurple" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-400">Active Subscriptions</p>
                <p class="text-2xl font-bold text-white" id="active-subscriptions">0</p>
              </div>
            </div>
          </div>
          
          <div class="glass-effect rounded-xl p-6">
            <div class="flex items-center">
              <div class="p-3 bg-discord-yellow/20 rounded-lg">
                <svg class="w-6 h-6 text-discord-yellow" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-400">Total Transactions</p>
                <p class="text-2xl font-bold text-white" id="total-transactions">0</p>
              </div>
            </div>
          </div>
          
          <div class="glass-effect rounded-xl p-6">
            <div class="flex items-center">
              <div class="p-3 bg-discord-red/20 rounded-lg">
                <svg class="w-6 h-6 text-discord-red" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-400">Customers</p>
                <p class="text-2xl font-bold text-white" id="total-customers">0</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="glass-effect rounded-xl p-6">
          <nav class="flex space-x-8">
            <button class="tab-btn px-3 py-2 text-sm font-medium rounded-md bg-discord-blurple text-white" data-tab="products">Products</button>
            <button class="tab-btn px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white" data-tab="subscriptions">Subscriptions</button>
            <button class="tab-btn px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white" data-tab="transactions">Transactions</button>
            <button class="tab-btn px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white" data-tab="customers">Customers</button>
            <button class="tab-btn px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white" data-tab="analytics">Analytics</button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div id="tab-content">
          <!-- Products Tab -->
          <div id="products-tab" class="tab-panel">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-semibold text-white">Products</h3>
              <button id="create-product-btn" class="px-4 py-2 bg-discord-green hover:bg-discord-green/80 text-white rounded-lg font-medium">Create Product</button>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm text-left text-gray-300">
                <thead class="text-xs text-gray-400 uppercase bg-discord-dark/50">
                  <tr>
                    <th scope="col" class="px-6 py-3">Name</th>
                    <th scope="col" class="px-6 py-3">Type</th>
                    <th scope="col" class="px-6 py-3">Price</th>
                    <th scope="col" class="px-6 py-3">Status</th>
                    <th scope="col" class="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody id="products-table-body">
                  <tr><td colspan="5" class="text-center py-8">Loading products...</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Subscriptions Tab -->
          <div id="subscriptions-tab" class="tab-panel hidden">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-semibold text-white">Subscriptions</h3>
              <button id="generate-checkout-btn" class="px-4 py-2 bg-discord-blurple hover:bg-discord-blurple/80 text-white rounded-lg font-medium">Generate Checkout Link</button>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm text-left text-gray-300">
                <thead class="text-xs text-gray-400 uppercase bg-discord-dark/50">
                  <tr>
                    <th scope="col" class="px-6 py-3">Customer</th>
                    <th scope="col" class="px-6 py-3">Product</th>
                    <th scope="col" class="px-6 py-3">Status</th>
                    <th scope="col" class="px-6 py-3">Period</th>
                    <th scope="col" class="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody id="subscriptions-table-body">
                  <tr><td colspan="5" class="text-center py-8">Loading subscriptions...</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Transactions Tab -->
          <div id="transactions-tab" class="tab-panel hidden">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-semibold text-white">Transactions</h3>
              <div class="flex space-x-2">
                <select id="transaction-status-filter" class="bg-discord-dark/50 rounded-lg p-2">
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
                <input type="text" id="transaction-search" placeholder="Search by customer..." class="bg-discord-dark/50 rounded-lg p-2">
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm text-left text-gray-300">
                <thead class="text-xs text-gray-400 uppercase bg-discord-dark/50">
                  <tr>
                    <th scope="col" class="px-6 py-3">Date</th>
                    <th scope="col" class="px-6 py-3">Customer</th>
                    <th scope="col" class="px-6 py-3">Product</th>
                    <th scope="col" class="px-6 py-3">Amount</th>
                    <th scope="col" class="px-6 py-3">Status</th>
                    <th scope="col" class="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody id="transactions-table-body">
                  <tr><td colspan="6" class="text-center py-8">Loading transactions...</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Customers Tab -->
          <div id="customers-tab" class="tab-panel hidden">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-semibold text-white">Customers</h3>
              <div class="flex space-x-2">
                <input type="text" id="customer-search" placeholder="Search by email or Discord ID..." class="bg-discord-dark/50 rounded-lg p-2">
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm text-left text-gray-300">
                <thead class="text-xs text-gray-400 uppercase bg-discord-dark/50">
                  <tr>
                    <th scope="col" class="px-6 py-3">Name</th>
                    <th scope="col" class="px-6 py-3">Email</th>
                    <th scope="col" class="px-6 py-3">Discord ID</th>
                    <th scope="col" class="px-6 py-3">Total Spent</th>
                    <th scope="col" class="px-6 py-3">Subscriptions</th>
                    <th scope="col" class="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody id="customers-table-body">
                  <tr><td colspan="6" class="text-center py-8">Loading customers...</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Analytics Tab -->
          <div id="analytics-tab" class="tab-panel hidden">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Top Products -->
              <div class="glass-effect rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white mb-4">Top Products</h3>
                <div id="top-products-list" class="space-y-3">
                  <div class="animate-pulse">
                    <div class="h-4 bg-discord-dark/50 rounded w-3/4"></div>
                    <div class="space-y-2 mt-2">
                      <div class="h-3 bg-discord-dark/50 rounded"></div>
                      <div class="h-3 bg-discord-dark/50 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Recent Transactions -->
              <div class="glass-effect rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
                <div id="recent-transactions-list" class="space-y-3">
                  <div class="animate-pulse">
                    <div class="h-4 bg-discord-dark/50 rounded w-3/4"></div>
                    <div class="space-y-2 mt-2">
                      <div class="h-3 bg-discord-dark/50 rounded"></div>
                      <div class="h-3 bg-discord-dark/50 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private attachStoreManagementEventListeners(): void {
    this.updateStoreData(); // Initial load

    // Tab navigation
    const tabBtns = this.container.querySelectorAll('.tab-btn');
    const tabPanels = this.container.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = (btn as HTMLElement).dataset.tab;
        
        // Update button states
        tabBtns.forEach(b => {
          b.classList.remove('bg-discord-blurple', 'text-white');
          b.classList.add('text-gray-300');
        });
        btn.classList.add('bg-discord-blurple', 'text-white');
        btn.classList.remove('text-gray-300');

        // Show target panel
        tabPanels.forEach(panel => {
          panel.classList.add('hidden');
        });
        const targetPanel = this.container.querySelector(`#${targetTab}-tab`);
        if (targetPanel) {
          targetPanel.classList.remove('hidden');
        }
      });
    });

    // Action buttons
    const createProductBtn = this.container.querySelector('#create-product-btn');
    const generateCheckoutBtn = this.container.querySelector('#generate-checkout-btn');

    createProductBtn?.addEventListener('click', () => {
      this.showNotification('Product creation modal would open here.', 'success');
    });

    generateCheckoutBtn?.addEventListener('click', () => {
      this.showNotification('Checkout link generator would open here.', 'success');
    });

    // Search and filter functionality
    const transactionSearch = this.container.querySelector('#transaction-search');
    const transactionStatusFilter = this.container.querySelector('#transaction-status-filter');
    const customerSearch = this.container.querySelector('#customer-search');

    transactionSearch?.addEventListener('input', () => this.updateStoreData());
    transactionStatusFilter?.addEventListener('change', () => this.updateStoreData());
    customerSearch?.addEventListener('input', () => this.updateStoreData());
  }

  private async updateStoreData(): Promise<void> {
    try {
      const [analytics, products, subscriptions, transactions, customers] = await Promise.all([
        this.fetchStoreAnalytics(),
        this.fetchProducts(),
        this.fetchSubscriptions(),
        this.fetchTransactions(),
        this.fetchCustomers()
      ]);

      if (analytics) {
        this.updateStoreStats(analytics);
        this.updateAnalyticsTab(analytics);
      }

      if (products) {
        this.updateProductsTable(products);
      }

      if (subscriptions) {
        this.updateSubscriptionsTable(subscriptions);
      }

      if (transactions) {
        this.updateTransactionsTable(transactions);
      }

      if (customers) {
        this.updateCustomersTable(customers);
      }

    } catch (e) {
      console.error("Failed to update store data", e);
      this.showNotification('Failed to load store data.', 'error');
    }
  }

  private updateStoreStats(analytics: SalesAnalytics): void {
    const totalRevenueEl = this.container.querySelector('#total-revenue');
    const activeSubscriptionsEl = this.container.querySelector('#active-subscriptions');
    const totalTransactionsEl = this.container.querySelector('#total-transactions');
    const totalCustomersEl = this.container.querySelector('#total-customers');

    if (totalRevenueEl) totalRevenueEl.textContent = `$${(analytics.totalRevenue / 100).toFixed(2)}`;
    if (activeSubscriptionsEl) activeSubscriptionsEl.textContent = analytics.activeSubscriptions.toString();
    if (totalTransactionsEl) totalTransactionsEl.textContent = analytics.totalTransactions.toString();
    if (totalCustomersEl) totalCustomersEl.textContent = analytics.recentTransactions.length.toString();
  }

  private updateProductsTable(products: Product[]): void {
    const tableBody = this.container.querySelector('#products-table-body');
    if (!tableBody) return;

    if (products.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="5" class="text-center py-8">No products found.</td></tr>';
      return;
    }

    tableBody.innerHTML = products.map(product => `
      <tr class="border-b border-gray-700 hover:bg-white/5">
        <td class="px-6 py-4">
          <div>
            <div class="font-medium text-white">${product.name}</div>
            <div class="text-sm text-gray-400">${product.description}</div>
          </div>
        </td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full bg-discord-blurple/50">${product.type}</span>
        </td>
        <td class="px-6 py-4">$${(product.price / 100).toFixed(2)} ${product.currency}</td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full ${product.active ? 'bg-discord-green/50' : 'bg-discord-red/50'}">${product.active ? 'Active' : 'Inactive'}</span>
        </td>
        <td class="px-6 py-4">
          <button class="p-1 text-gray-400 hover:text-white" title="Edit"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg></button>
          <button class="p-1 text-gray-400 hover:text-white" title="Toggle Status"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg></button>
        </td>
      </tr>
    `).join('');
  }

  private updateSubscriptionsTable(subscriptions: Subscription[]): void {
    const tableBody = this.container.querySelector('#subscriptions-table-body');
    if (!tableBody) return;

    if (subscriptions.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="5" class="text-center py-8">No subscriptions found.</td></tr>';
      return;
    }

    tableBody.innerHTML = subscriptions.map(sub => `
      <tr class="border-b border-gray-700 hover:bg-white/5">
        <td class="px-6 py-4">${sub.customerId}</td>
        <td class="px-6 py-4">${sub.productId}</td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full ${sub.status === 'active' ? 'bg-discord-green/50' : 'bg-discord-red/50'}">${sub.status}</span>
        </td>
        <td class="px-6 py-4">${new Date(sub.currentPeriodStart).toLocaleDateString()} - ${new Date(sub.currentPeriodEnd).toLocaleDateString()}</td>
        <td class="px-6 py-4">
          <button class="p-1 text-gray-400 hover:text-white" title="Cancel"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
        </td>
      </tr>
    `).join('');
  }

  private updateTransactionsTable(transactions: Transaction[]): void {
    const tableBody = this.container.querySelector('#transactions-table-body');
    if (!tableBody) return;

    if (transactions.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="6" class="text-center py-8">No transactions found.</td></tr>';
      return;
    }

    tableBody.innerHTML = transactions.map(txn => `
      <tr class="border-b border-gray-700 hover:bg-white/5">
        <td class="px-6 py-4">${new Date(txn.createdAt).toLocaleString()}</td>
        <td class="px-6 py-4">${txn.customerId}</td>
        <td class="px-6 py-4">${txn.productId}</td>
        <td class="px-6 py-4">$${(txn.amount / 100).toFixed(2)} ${txn.currency}</td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full ${this.getTransactionStatusColor(txn.status)}">${txn.status}</span>
        </td>
        <td class="px-6 py-4">
          ${txn.status === 'completed' ? '<button class="p-1 text-gray-400 hover:text-white" title="Refund"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/></svg></button>' : ''}
        </td>
      </tr>
    `).join('');
  }

  private updateCustomersTable(customers: Customer[]): void {
    const tableBody = this.container.querySelector('#customers-table-body');
    if (!tableBody) return;

    if (customers.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="6" class="text-center py-8">No customers found.</td></tr>';
      return;
    }

    tableBody.innerHTML = customers.map(customer => `
      <tr class="border-b border-gray-700 hover:bg-white/5">
        <td class="px-6 py-4">${customer.name}</td>
        <td class="px-6 py-4">${customer.email}</td>
        <td class="px-6 py-4">${customer.discordId || 'N/A'}</td>
        <td class="px-6 py-4">$${(customer.totalSpent / 100).toFixed(2)}</td>
        <td class="px-6 py-4">${customer.subscriptionCount}</td>
        <td class="px-6 py-4">
          <button class="p-1 text-gray-400 hover:text-white" title="View Details"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/></svg></button>
        </td>
      </tr>
    `).join('');
  }

  private updateAnalyticsTab(analytics: SalesAnalytics): void {
    // Update top products
    const topProductsList = this.container.querySelector('#top-products-list');
    if (topProductsList) {
      topProductsList.innerHTML = analytics.topProducts.map(product => `
        <div class="flex justify-between items-center p-3 bg-discord-dark/50 rounded-lg">
          <div>
            <div class="font-medium text-white">${product.productName}</div>
            <div class="text-sm text-gray-400">${product.sales} sales</div>
          </div>
          <div class="text-right">
            <div class="font-medium text-white">$${(product.revenue / 100).toFixed(2)}</div>
          </div>
        </div>
      `).join('');
    }

    // Update recent transactions
    const recentTransactionsList = this.container.querySelector('#recent-transactions-list');
    if (recentTransactionsList) {
      recentTransactionsList.innerHTML = analytics.recentTransactions.map(txn => `
        <div class="flex justify-between items-center p-3 bg-discord-dark/50 rounded-lg">
          <div>
            <div class="font-medium text-white">${txn.customerId}</div>
            <div class="text-sm text-gray-400">${new Date(txn.createdAt).toLocaleDateString()}</div>
          </div>
          <div class="text-right">
            <div class="font-medium text-white">$${(txn.amount / 100).toFixed(2)}</div>
            <div class="text-sm text-gray-400">${txn.status}</div>
          </div>
        </div>
      `).join('');
    }
  }

  private getTransactionStatusColor(status: string): string {
    switch (status) {
      case 'completed': return 'bg-discord-green/50';
      case 'pending': return 'bg-discord-yellow/50';
      case 'failed': return 'bg-discord-red/50';
      case 'refunded': return 'bg-gray-500/50';
      default: return 'bg-gray-500/50';
    }
  }

  private async fetchStoreAnalytics(): Promise<SalesAnalytics | null> {
    try {
      const resp = await fetch('/api/store/analytics');
      if (!resp.ok) throw new Error('Failed to fetch store analytics');
      return await resp.json();
    } catch (e) {
      console.error("Failed to fetch store analytics", e);
      return null;
    }
  }

  private async fetchProducts(): Promise<Product[] | null> {
    try {
      const resp = await fetch('/api/store/products');
      if (!resp.ok) throw new Error('Failed to fetch products');
      return await resp.json();
    } catch (e) {
      console.error("Failed to fetch products", e);
      return null;
    }
  }

  private async fetchSubscriptions(): Promise<Subscription[] | null> {
    try {
      const resp = await fetch('/api/store/subscriptions');
      if (!resp.ok) throw new Error('Failed to fetch subscriptions');
      return await resp.json();
    } catch (e) {
      console.error("Failed to fetch subscriptions", e);
      return null;
    }
  }

  private async fetchTransactions(): Promise<Transaction[] | null> {
    try {
      const resp = await fetch('/api/store/transactions');
      if (!resp.ok) throw new Error('Failed to fetch transactions');
      return await resp.json();
    } catch (e) {
      console.error("Failed to fetch transactions", e);
      return null;
    }
  }

  private async fetchCustomers(): Promise<Customer[] | null> {
    try {
      const resp = await fetch('/api/store/customers');
      if (!resp.ok) throw new Error('Failed to fetch customers');
      return await resp.json();
    } catch (e) {
      console.error("Failed to fetch customers", e);
      return null;
    }
  }

  private renderCreatorStorefrontsPage(guildId: string): string {
    return `
      <div class="space-y-8" data-guild-id="${guildId}">
        <!-- Header -->
        <div>
          <h2 class="text-3xl font-bold text-white">Creator Storefronts</h2>
          <p class="text-gray-400 mt-1">Create and manage your server's own store to sell roles, keys, files, and services.</p>
        </div>

        <!-- Store Status -->
        <div class="glass-effect rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-white">Store Status</h3>
              <p class="text-sm text-gray-400">Enable your store to start selling products</p>
            </div>
            <button id="toggle-store-btn" class="px-4 py-2 bg-discord-green hover:bg-discord-green/80 text-white rounded-lg font-medium">Enable Store</button>
          </div>
          <div class="mt-4 text-sm text-gray-300">
            <p>Your store URL: <span class="font-mono bg-discord-dark/50 px-2 py-1 rounded">velari.gg/yourserver</span></p>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="glass-effect rounded-xl p-6">
            <div class="flex items-center">
              <div class="p-3 bg-discord-green/20 rounded-lg">
                <svg class="w-6 h-6 text-discord-green" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-400">Total Revenue</p>
                <p class="text-2xl font-bold text-white" id="store-revenue">$0.00</p>
              </div>
            </div>
          </div>
          
          <div class="glass-effect rounded-xl p-6">
            <div class="flex items-center">
              <div class="p-3 bg-discord-blurple/20 rounded-lg">
                <svg class="w-6 h-6 text-discord-blurple" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-400">Total Orders</p>
                <p class="text-2xl font-bold text-white" id="store-orders">0</p>
              </div>
            </div>
          </div>
          
          <div class="glass-effect rounded-xl p-6">
            <div class="flex items-center">
              <div class="p-3 bg-discord-yellow/20 rounded-lg">
                <svg class="w-6 h-6 text-discord-yellow" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-400">Customers</p>
                <p class="text-2xl font-bold text-white" id="store-customers">0</p>
              </div>
            </div>
          </div>
          
          <div class="glass-effect rounded-xl p-6">
            <div class="flex items-center">
              <div class="p-3 bg-discord-red/20 rounded-lg">
                <svg class="w-6 h-6 text-discord-red" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-400">Products</p>
                <p class="text-2xl font-bold text-white" id="store-products">0</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="glass-effect rounded-xl p-6">
          <nav class="flex space-x-8">
            <button class="tab-btn px-3 py-2 text-sm font-medium rounded-md bg-discord-blurple text-white" data-tab="setup">Store Setup</button>
            <button class="tab-btn px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white" data-tab="products">Products</button>
            <button class="tab-btn px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white" data-tab="orders">Orders</button>
            <button class="tab-btn px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white" data-tab="customers">Customers</button>
            <button class="tab-btn px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white" data-tab="promocodes">Promo Codes</button>
            <button class="tab-btn px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white" data-tab="analytics">Analytics</button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div id="storefront-tab-content">
          <!-- Setup Tab -->
          <div id="setup-tab" class="tab-panel">
            <div class="space-y-6">
              <!-- Basic Info -->
              <div class="glass-effect rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white mb-4">Store Information</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Store Name</label>
                    <input type="text" id="store-name" class="w-full bg-discord-dark/50 rounded-lg p-2" placeholder="My Awesome Store">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Custom URL</label>
                    <div class="flex">
                      <span class="bg-discord-dark/50 px-3 py-2 rounded-l-lg text-gray-400">velari.gg/</span>
                      <input type="text" id="store-url" class="flex-1 bg-discord-dark/50 rounded-r-lg p-2" placeholder="yourserver">
                    </div>
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <textarea id="store-description" class="w-full h-24 bg-discord-dark/50 rounded-lg p-2" placeholder="Describe your store..."></textarea>
                  </div>
                </div>
              </div>

              <!-- Payment Settings -->
              <div class="glass-effect rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white mb-4">Payment Settings</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Currency</label>
                    <select id="store-currency" class="w-full bg-discord-dark/50 rounded-lg p-2">
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Payment Processor</label>
                    <select id="store-processor" class="w-full bg-discord-dark/50 rounded-lg p-2">
                      <option value="stripe">Stripe</option>
                      <option value="paypal">PayPal</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Policies -->
              <div class="glass-effect rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white mb-4">Policies</h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Terms of Service</label>
                    <textarea id="store-tos" class="w-full h-32 bg-discord-dark/50 rounded-lg p-2" placeholder="Enter your terms of service..."></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Refund Policy</label>
                    <textarea id="store-refund-policy" class="w-full h-32 bg-discord-dark/50 rounded-lg p-2" placeholder="Enter your refund policy..."></textarea>
                  </div>
                </div>
              </div>

              <!-- Save Button -->
              <div class="flex justify-end">
                <button id="save-store-settings" class="px-6 py-3 bg-discord-blurple hover:bg-discord-blurple/80 text-white rounded-lg font-medium">Save Settings</button>
              </div>
            </div>
          </div>

          <!-- Products Tab -->
          <div id="products-tab" class="tab-panel hidden">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-semibold text-white">Products</h3>
              <button id="add-product-btn" class="px-4 py-2 bg-discord-green hover:bg-discord-green/80 text-white rounded-lg font-medium">Add Product</button>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm text-left text-gray-300">
                <thead class="text-xs text-gray-400 uppercase bg-discord-dark/50">
                  <tr>
                    <th scope="col" class="px-6 py-3">Product</th>
                    <th scope="col" class="px-6 py-3">Type</th>
                    <th scope="col" class="px-6 py-3">Price</th>
                    <th scope="col" class="px-6 py-3">Stock</th>
                    <th scope="col" class="px-6 py-3">Status</th>
                    <th scope="col" class="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody id="store-products-table-body">
                  <tr><td colspan="6" class="text-center py-8">Loading products...</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Orders Tab -->
          <div id="orders-tab" class="tab-panel hidden">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-semibold text-white">Orders</h3>
              <div class="flex space-x-2">
                <select id="order-status-filter" class="bg-discord-dark/50 rounded-lg p-2">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm text-left text-gray-300">
                <thead class="text-xs text-gray-400 uppercase bg-discord-dark/50">
                  <tr>
                    <th scope="col" class="px-6 py-3">Order ID</th>
                    <th scope="col" class="px-6 py-3">Customer</th>
                    <th scope="col" class="px-6 py-3">Items</th>
                    <th scope="col" class="px-6 py-3">Total</th>
                    <th scope="col" class="px-6 py-3">Status</th>
                    <th scope="col" class="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody id="store-orders-table-body">
                  <tr><td colspan="6" class="text-center py-8">Loading orders...</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Customers Tab -->
          <div id="customers-tab" class="tab-panel hidden">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-semibold text-white">Customers</h3>
              <input type="text" id="customer-search" placeholder="Search customers..." class="bg-discord-dark/50 rounded-lg p-2">
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm text-left text-gray-300">
                <thead class="text-xs text-gray-400 uppercase bg-discord-dark/50">
                  <tr>
                    <th scope="col" class="px-6 py-3">Discord ID</th>
                    <th scope="col" class="px-6 py-3">Email</th>
                    <th scope="col" class="px-6 py-3">Total Spent</th>
                    <th scope="col" class="px-6 py-3">Orders</th>
                    <th scope="col" class="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody id="store-customers-table-body">
                  <tr><td colspan="5" class="text-center py-8">Loading customers...</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Promo Codes Tab -->
          <div id="promocodes-tab" class="tab-panel hidden">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-semibold text-white">Promo Codes</h3>
              <button id="add-promo-btn" class="px-4 py-2 bg-discord-green hover:bg-discord-green/80 text-white rounded-lg font-medium">Create Code</button>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm text-left text-gray-300">
                <thead class="text-xs text-gray-400 uppercase bg-discord-dark/50">
                  <tr>
                    <th scope="col" class="px-6 py-3">Code</th>
                    <th scope="col" class="px-6 py-3">Type</th>
                    <th scope="col" class="px-6 py-3">Value</th>
                    <th scope="col" class="px-6 py-3">Uses</th>
                    <th scope="col" class="px-6 py-3">Status</th>
                    <th scope="col" class="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody id="store-promocodes-table-body">
                  <tr><td colspan="6" class="text-center py-8">Loading promo codes...</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Analytics Tab -->
          <div id="analytics-tab" class="tab-panel hidden">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Top Products -->
              <div class="glass-effect rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white mb-4">Top Products</h3>
                <div id="store-top-products-list" class="space-y-3">
                  <div class="animate-pulse">
                    <div class="h-4 bg-discord-dark/50 rounded w-3/4"></div>
                    <div class="space-y-2 mt-2">
                      <div class="h-3 bg-discord-dark/50 rounded"></div>
                      <div class="h-3 bg-discord-dark/50 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Recent Orders -->
              <div class="glass-effect rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white mb-4">Recent Orders</h3>
                <div id="store-recent-orders-list" class="space-y-3">
                  <div class="animate-pulse">
                    <div class="h-4 bg-discord-dark/50 rounded w-3/4"></div>
                    <div class="space-y-2 mt-2">
                      <div class="h-3 bg-discord-dark/50 rounded"></div>
                      <div class="h-3 bg-discord-dark/50 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private attachCreatorStorefrontsEventListeners(guildId: string): void {
    // Tab switching
    const tabButtons = this.container.querySelectorAll('.tab-btn');
    const tabPanels = this.container.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Update button styles
        tabButtons.forEach(btn => {
          btn.classList.remove('bg-discord-blurple', 'text-white');
          btn.classList.add('text-gray-300', 'hover:text-white');
        });
        button.classList.add('bg-discord-blurple', 'text-white');
        button.classList.remove('text-gray-300', 'hover:text-white');
        
        // Show target panel
        tabPanels.forEach(panel => {
          panel.classList.add('hidden');
        });
        const targetPanel = this.container.querySelector(`#${targetTab}-tab`);
        if (targetPanel) {
          targetPanel.classList.remove('hidden');
        }

        // Load data for the active tab
        this.loadStorefrontTabData(guildId, targetTab || 'setup');
      });
    });

    // Store toggle button
    const toggleStoreBtn = this.container.querySelector('#toggle-store-btn');
    if (toggleStoreBtn) {
      toggleStoreBtn.addEventListener('click', () => {
        this.toggleStoreStatus(guildId);
      });
    }

    // Save store settings
    const saveSettingsBtn = this.container.querySelector('#save-store-settings');
    if (saveSettingsBtn) {
      saveSettingsBtn.addEventListener('click', () => {
        this.saveStoreSettings(guildId);
      });
    }

    // Add product button
    const addProductBtn = this.container.querySelector('#add-product-btn');
    if (addProductBtn) {
      addProductBtn.addEventListener('click', () => {
        this.showAddProductModal(guildId);
      });
    }

    // Add promo code button
    const addPromoBtn = this.container.querySelector('#add-promo-btn');
    if (addPromoBtn) {
      addPromoBtn.addEventListener('click', () => {
        this.showAddPromoModal(guildId);
      });
    }

    // Order status filter
    const orderStatusFilter = this.container.querySelector('#order-status-filter');
    if (orderStatusFilter) {
      orderStatusFilter.addEventListener('change', () => {
        this.filterOrders(guildId, (orderStatusFilter as HTMLSelectElement).value);
      });
    }

    // Customer search
    const customerSearchInput = this.container.querySelector('#customer-search');
    if (customerSearchInput) {
      customerSearchInput.addEventListener('input', () => {
        this.searchCustomers(guildId, (customerSearchInput as HTMLInputElement).value);
      });
    }
  }

  private async searchCustomers(_guildId: string, query: string): Promise<void> {
    // Placeholder for customer search
    console.log(`Searching customers with query: ${query}`);
  }

  private async loadStorefrontTabData(guildId: string, tab: string): Promise<void> {
    try {
      switch (tab) {
        case 'products':
          const products = await this.fetchStoreProducts(guildId);
          if (products) {
            this.updateStoreProductsTable(products);
          }
          break;
        case 'orders':
          const orders = await this.fetchStoreOrders(guildId);
          if (orders) {
            this.updateStoreOrdersTable(orders);
          }
          break;
        case 'customers':
          const customers = await this.fetchStoreCustomers(guildId);
          if (customers) {
            this.updateStoreCustomersTable(customers);
          }
          break;
        case 'promocodes':
          const promoCodes = await this.fetchStorePromoCodes(guildId);
          if (promoCodes) {
            this.updateStorePromoCodesTable(promoCodes);
          }
          break;
        case 'analytics':
          const analytics = await this.fetchStorefrontAnalytics(guildId);
          if (analytics) {
            this.updateStoreAnalyticsTab(analytics);
          }
          break;
      }
    } catch (error) {
      console.error(`Failed to load ${tab} data:`, error);
    }
  }

  private async fetchStorefront(guildId: string): Promise<Storefront | null> {
    try {
      const resp = await fetch(`/api/storefronts?guildId=${guildId}`);
      if (!resp.ok) throw new Error('Failed to fetch storefront');
      return await resp.json();
    } catch (e) {
      console.error("Failed to fetch storefront", e);
      return null;
    }
  }

  private async fetchStoreProducts(guildId: string): Promise<StoreProduct[] | null> {
    try {
      const resp = await fetch(`/api/storefronts/products?guildId=${guildId}`);
      if (!resp.ok) throw new Error('Failed to fetch store products');
      return await resp.json();
    } catch (e) {
      console.error("Failed to fetch store products", e);
      return null;
    }
  }

  private async fetchStoreOrders(guildId: string): Promise<StoreOrder[] | null> {
    try {
      const resp = await fetch(`/api/storefronts/orders?guildId=${guildId}`);
      if (!resp.ok) throw new Error('Failed to fetch store orders');
      return await resp.json();
    } catch (e) {
      console.error("Failed to fetch store orders", e);
      return null;
    }
  }

  private async fetchStoreCustomers(guildId: string): Promise<StoreCustomer[] | null> {
    try {
      const resp = await fetch(`/api/storefronts/customers?guildId=${guildId}`);
      if (!resp.ok) throw new Error('Failed to fetch store customers');
      return await resp.json();
    } catch (e) {
      console.error("Failed to fetch store customers", e);
      return null;
    }
  }

  private async fetchStorePromoCodes(guildId: string): Promise<PromoCode[] | null> {
    try {
      const resp = await fetch(`/api/storefronts/promocodes?guildId=${guildId}`);
      if (!resp.ok) throw new Error('Failed to fetch store promo codes');
      return await resp.json();
    } catch (e) {
      console.error("Failed to fetch store promo codes", e);
      return null;
    }
  }

  private async fetchStorefrontAnalytics(guildId: string): Promise<StoreAnalytics | null> {
    try {
      const resp = await fetch(`/api/storefronts/analytics?guildId=${guildId}`);
      if (!resp.ok) throw new Error('Failed to fetch store analytics');
      return await resp.json();
    } catch (e) {
      console.error("Failed to fetch store analytics", e);
      return null;
    }
  }

  private updateStorefrontUI(storefront: Storefront): void {
    // Update store status button
    const toggleBtn = this.container.querySelector('#toggle-store-btn');
    if (toggleBtn) {
      if (storefront.status === 'active') {
        toggleBtn.textContent = 'Disable Store';
        toggleBtn.classList.remove('bg-discord-green', 'hover:bg-discord-green/80');
        toggleBtn.classList.add('bg-discord-red', 'hover:bg-discord-red/80');
      } else {
        toggleBtn.textContent = 'Enable Store';
        toggleBtn.classList.remove('bg-discord-red', 'hover:bg-discord-red/80');
        toggleBtn.classList.add('bg-discord-green', 'hover:bg-discord-green/80');
      }
    }

    // Update store URL
    const storeUrl = this.container.querySelector('.font-mono');
    if (storeUrl) {
      storeUrl.textContent = `velari.gg/${storefront.customUrl}`;
    }

    // Update form fields
    const nameInput = this.container.querySelector('#store-name') as HTMLInputElement;
    if (nameInput) nameInput.value = storefront.name;

    const urlInput = this.container.querySelector('#store-url') as HTMLInputElement;
    if (urlInput) urlInput.value = storefront.customUrl;

    const descInput = this.container.querySelector('#store-description') as HTMLTextAreaElement;
    if (descInput) descInput.value = storefront.description;

    const currencySelect = this.container.querySelector('#store-currency') as HTMLSelectElement;
    if (currencySelect) currencySelect.value = storefront.currency;

    const processorSelect = this.container.querySelector('#store-processor') as HTMLSelectElement;
    if (processorSelect) processorSelect.value = storefront.paymentProcessor;

    const tosInput = this.container.querySelector('#store-tos') as HTMLTextAreaElement;
    if (tosInput) tosInput.value = storefront.tos;

    const refundInput = this.container.querySelector('#store-refund-policy') as HTMLTextAreaElement;
    if (refundInput) refundInput.value = storefront.refundPolicy;
  }

  private updateStorefrontStats(analytics: StoreAnalytics): void {
    const revenueEl = this.container.querySelector('#store-revenue');
    if (revenueEl) revenueEl.textContent = `$${(analytics.totalRevenue / 100).toFixed(2)}`;

    const ordersEl = this.container.querySelector('#store-orders');
    if (ordersEl) ordersEl.textContent = analytics.totalOrders.toString();

    const customersEl = this.container.querySelector('#store-customers');
    if (customersEl) customersEl.textContent = analytics.activeCustomers.toString();

    const productsEl = this.container.querySelector('#store-products');
    if (productsEl) productsEl.textContent = analytics.topProducts.length.toString();
  }

  private updateStoreProductsTable(products: StoreProduct[]): void {
    const tableBody = this.container.querySelector('#store-products-table-body');
    if (!tableBody) return;

    if (products.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="6" class="text-center py-8">No products found.</td></tr>';
      return;
    }

    tableBody.innerHTML = products.map(product => `
      <tr class="border-b border-gray-700 hover:bg-white/5">
        <td class="px-6 py-4">
          <div class="flex items-center">
            ${product.imageUrl ? `<img src="${product.imageUrl}" class="w-8 h-8 rounded mr-3">` : ''}
            <div>
              <div class="font-medium text-white">${product.name}</div>
              <div class="text-sm text-gray-400">${product.description}</div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full bg-discord-blurple/50">${product.type}</span>
        </td>
        <td class="px-6 py-4">$${(product.price / 100).toFixed(2)}</td>
        <td class="px-6 py-4">${product.stock === null ? '∞' : product.stock}</td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full ${product.active ? 'bg-discord-green/50' : 'bg-discord-red/50'}">${product.active ? 'Active' : 'Inactive'}</span>
        </td>
        <td class="px-6 py-4">
          <button class="p-1 text-gray-400 hover:text-white mr-2" title="Edit"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/></svg></button>
          <button class="p-1 text-gray-400 hover:text-white" title="Delete"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/></svg></button>
        </td>
      </tr>
    `).join('');
  }

  private updateStoreOrdersTable(orders: StoreOrder[]): void {
    const tableBody = this.container.querySelector('#store-orders-table-body');
    if (!tableBody) return;

    if (orders.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="6" class="text-center py-8">No orders found.</td></tr>';
      return;
    }

    tableBody.innerHTML = orders.map(order => `
      <tr class="border-b border-gray-700 hover:bg-white/5">
        <td class="px-6 py-4 font-mono text-sm">${order.id}</td>
        <td class="px-6 py-4">
          <div>
            <div class="font-medium text-white">${order.customerEmail}</div>
            <div class="text-sm text-gray-400">${order.customerDiscordId}</div>
          </div>
        </td>
        <td class="px-6 py-4">
          <div class="text-sm">
            ${order.items.map(item => `${item.productName} (x${item.quantity})`).join(', ')}
          </div>
        </td>
        <td class="px-6 py-4">$${(order.totalAmount / 100).toFixed(2)}</td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full ${this.getOrderStatusColor(order.status)}">${order.status}</span>
        </td>
        <td class="px-6 py-4">
          <button class="p-1 text-gray-400 hover:text-white mr-2" title="View Details"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/></svg></button>
          ${order.status === 'completed' ? '<button class="p-1 text-gray-400 hover:text-white" title="Refund"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/></svg></button>' : ''}
        </td>
      </tr>
    `).join('');
  }

  private updateStoreCustomersTable(customers: StoreCustomer[]): void {
    const tableBody = this.container.querySelector('#store-customers-table-body');
    if (!tableBody) return;

    if (customers.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="5" class="text-center py-8">No customers found.</td></tr>';
      return;
    }

    tableBody.innerHTML = customers.map(customer => `
      <tr class="border-b border-gray-700 hover:bg-white/5">
        <td class="px-6 py-4 font-mono text-sm">${customer.discordId}</td>
        <td class="px-6 py-4">${customer.email}</td>
        <td class="px-6 py-4">$${(customer.totalSpent / 100).toFixed(2)}</td>
        <td class="px-6 py-4">${customer.orderCount}</td>
        <td class="px-6 py-4">
          <button class="p-1 text-gray-400 hover:text-white" title="View Details"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/></svg></button>
        </td>
      </tr>
    `).join('');
  }

  private updateStorePromoCodesTable(promoCodes: PromoCode[]): void {
    const tableBody = this.container.querySelector('#store-promocodes-table-body');
    if (!tableBody) return;

    if (promoCodes.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="6" class="text-center py-8">No promo codes found.</td></tr>';
      return;
    }

    tableBody.innerHTML = promoCodes.map(promo => `
      <tr class="border-b border-gray-700 hover:bg-white/5">
        <td class="px-6 py-4 font-mono text-sm">${promo.code}</td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full bg-discord-blurple/50">${promo.type}</span>
        </td>
        <td class="px-6 py-4">
          ${promo.type === 'percent' ? `${promo.value}%` : `$${(promo.value / 100).toFixed(2)}`}
        </td>
        <td class="px-6 py-4">${promo.currentUses}/${promo.maxUses || '∞'}</td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full ${promo.active ? 'bg-discord-green/50' : 'bg-discord-red/50'}">${promo.active ? 'Active' : 'Inactive'}</span>
        </td>
        <td class="px-6 py-4">
          <button class="p-1 text-gray-400 hover:text-white mr-2" title="Edit"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/></svg></button>
          <button class="p-1 text-gray-400 hover:text-white" title="Delete"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/></svg></button>
        </td>
      </tr>
    `).join('');
  }

  private updateStoreAnalyticsTab(analytics: StoreAnalytics): void {
    // Update top products
    const topProductsList = this.container.querySelector('#store-top-products-list');
    if (topProductsList) {
      topProductsList.innerHTML = analytics.topProducts.map(product => `
        <div class="flex justify-between items-center p-3 bg-discord-dark/50 rounded-lg">
          <div>
            <div class="font-medium text-white">${product.productName}</div>
            <div class="text-sm text-gray-400">${product.sales} sales</div>
          </div>
          <div class="text-right">
            <div class="font-medium text-white">$${(product.revenue / 100).toFixed(2)}</div>
          </div>
        </div>
      `).join('');
    }

    // Update recent orders
    const recentOrdersList = this.container.querySelector('#store-recent-orders-list');
    if (recentOrdersList) {
      recentOrdersList.innerHTML = analytics.recentOrders.map(order => `
        <div class="flex justify-between items-center p-3 bg-discord-dark/50 rounded-lg">
          <div>
            <div class="font-medium text-white">${order.customerEmail}</div>
            <div class="text-sm text-gray-400">${new Date(order.createdAt).toLocaleDateString()}</div>
          </div>
          <div class="text-right">
            <div class="font-medium text-white">$${(order.totalAmount / 100).toFixed(2)}</div>
            <div class="text-sm text-gray-400">${order.status}</div>
          </div>
        </div>
      `).join('');
    }
  }

  private getOrderStatusColor(status: string): string {
    switch (status) {
      case 'completed': return 'bg-discord-green/50';
      case 'pending': return 'bg-discord-yellow/50';
      case 'cancelled': return 'bg-discord-red/50';
      case 'refunded': return 'bg-gray-500/50';
      default: return 'bg-gray-500/50';
    }
  }

  private async toggleStoreStatus(guildId: string): Promise<void> {
    try {
      const resp = await fetch(`/api/storefronts/toggle?guildId=${guildId}`, {
        method: 'POST'
      });
      if (!resp.ok) throw new Error('Failed to toggle store status');
      
      // Reload storefront data
      await this.loadStorefrontData(guildId);
      this.showNotification('Store status updated successfully');
    } catch (error) {
      console.error('Failed to toggle store status:', error);
      this.showNotification('Failed to update store status', 'error');
    }
  }

  private async saveStoreSettings(guildId: string): Promise<void> {
    try {
      const settings = {
        name: (this.container.querySelector('#store-name') as HTMLInputElement)?.value,
        customUrl: (this.container.querySelector('#store-url') as HTMLInputElement)?.value,
        description: (this.container.querySelector('#store-description') as HTMLTextAreaElement)?.value,
        currency: (this.container.querySelector('#store-currency') as HTMLSelectElement)?.value,
        paymentProcessor: (this.container.querySelector('#store-processor') as HTMLSelectElement)?.value,
        tos: (this.container.querySelector('#store-tos') as HTMLTextAreaElement)?.value,
        refundPolicy: (this.container.querySelector('#store-refund-policy') as HTMLTextAreaElement)?.value
      };

      const resp = await fetch(`/api/storefronts/settings?guildId=${guildId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      
      if (!resp.ok) throw new Error('Failed to save store settings');
      
      this.showNotification('Store settings saved successfully');
    } catch (error) {
      console.error('Failed to save store settings:', error);
      this.showNotification('Failed to save store settings', 'error');
    }
  }

  private showAddProductModal(_guildId: string): void {
    // Placeholder for product creation modal
    this.showNotification('Product creation modal would open here');
  }

  private showAddPromoModal(_guildId: string): void {
    // Placeholder for promo code creation modal
    this.showNotification('Promo code creation modal would open here');
  }

  private async filterOrders(_guildId: string, status: string): Promise<void> {
    // Placeholder for order filtering
    console.log(`Filtering orders by status: ${status}`);
  }

  private async loadStorefrontData(guildId: string): Promise<void> {
    try {
      // Load storefront info
      const storefront = await this.fetchStorefront(guildId);
      if (storefront) {
        this.updateStorefrontUI(storefront);
      }

      // Load analytics
      const analytics = await this.fetchStorefrontAnalytics(guildId);
      if (analytics) {
        this.updateStorefrontStats(analytics);
      }

      // Load initial tab data
      this.loadStorefrontTabData(guildId, 'setup');
    } catch (error) {
      console.error('Failed to load storefront data:', error);
    }
  }
}