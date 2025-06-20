var w=Object.defineProperty;var S=(u,t,e)=>t in u?w(u,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):u[t]=e;var p=(u,t,e)=>S(u,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function e(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=e(o);fetch(o.href,a)}})();class x{constructor(){p(this,"CLIENT_ID","1381850832034725989");p(this,"REDIRECT_URI","http://localhost:5173/callback");p(this,"BOT_CLIENT_ID","1381850832034725989");p(this,"CLIENT_SECRET","cQiiMzBtjnuV3vCayI9Dr52i51_XG5vv");p(this,"API_BASE","https://discord.com/api/v10")}getAuthUrl(){return`https://discord.com/api/oauth2/authorize?${new URLSearchParams({client_id:this.CLIENT_ID,redirect_uri:this.REDIRECT_URI,response_type:"code",scope:"identify guilds"}).toString()}`}async exchangeCodeForToken(t){const e=await fetch(`${this.API_BASE}/oauth2/token`,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({client_id:this.CLIENT_ID,client_secret:this.CLIENT_SECRET,grant_type:"authorization_code",code:t,redirect_uri:this.REDIRECT_URI})});if(!e.ok)throw new Error("Failed to exchange code for token");return e.json()}async getUserInfo(t){const e=await fetch(`${this.API_BASE}/users/@me`,{headers:{Authorization:`Bearer ${t}`}});if(!e.ok)throw new Error("Failed to get user info");return e.json()}async getUserGuilds(t){const e=await fetch(`${this.API_BASE}/users/@me/guilds`,{headers:{Authorization:`Bearer ${t}`}});if(!e.ok)throw new Error("Failed to get user guilds");return e.json()}getBotInviteUrl(t){return`https://discord.com/api/oauth2/authorize?${new URLSearchParams({client_id:this.BOT_CLIENT_ID,permissions:"8",scope:"bot",guild_id:t}).toString()}`}}class k{constructor(t){p(this,"container");p(this,"discordAPI");this.container=t,this.discordAPI=new x,this.render()}render(){this.container.innerHTML=`
      <div class="min-h-screen flex items-center justify-center px-4">
        <div class="glass-effect rounded-2xl p-8 md:p-12 max-w-md w-full text-center">
          <!-- Logo/Brand -->
          <div class="mb-8">
            <div class="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <img src="/Velari_Logo.png" alt="Velari Logo" class="w-full h-full rounded-full"/>
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
    `,this.attachEventListeners()}attachEventListeners(){const t=this.container.querySelector("#discord-login");t&&t.addEventListener("click",()=>{this.handleDiscordLogin()})}handleDiscordLogin(){const t=this.discordAPI.getAuthUrl();window.location.href=t}}class ${constructor(t,e,s){p(this,"container");p(this,"discordAPI");p(this,"onLogout");p(this,"user",null);p(this,"guilds",[]);this.container=t,this.discordAPI=e,this.onLogout=s,this.init()}async init(){await this.loadUserData(),this.render()}async loadUserData(){try{const t=localStorage.getItem("discord_token");if(!t){this.onLogout();return}this.user=await this.discordAPI.getUserInfo(t);const e=await this.discordAPI.getUserGuilds(t),s=8;this.guilds=e.filter(o=>(parseInt(o.permissions)&s)===s),await Promise.all(this.guilds.map(async o=>{try{const a=await fetch(`/api/check-bot-in-guild?guildId=${o.id}`);if(!a.ok){console.error("API error:",a.status,a.statusText),o.botInGuild=!1;return}const l=await a.json();o.botInGuild=l.inGuild}catch(a){console.error("Error checking bot status:",a),o.botInGuild=!1}}))}catch(t){console.error("Failed to load user data:",t),localStorage.removeItem("discord_token"),this.onLogout()}}render(){var t;this.container.innerHTML=`
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
            <h2 class="text-3xl font-bold text-white mb-2">Welcome back, ${((t=this.user)==null?void 0:t.username)||"User"}!</h2>
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
                  <p class="text-2xl font-bold text-white">${this.guilds.filter(e=>e.owner).length}</p>
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
    `,this.attachEventListeners()}renderServers(){return this.guilds.length===0?`
        <div class="col-span-full text-center py-12">
          <div class="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-300 mb-2">No servers found</h3>
          <p class="text-gray-400">You don't have any servers with administrator permissions.</p>
        </div>
      `:this.guilds.map(t=>`
      <div class="glass-effect rounded-xl p-6 hover:shadow-lg transition-all duration-200">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-discord-blurple to-purple-600 rounded-full flex items-center justify-center">
              ${t.icon?`<img src="https://cdn.discordapp.com/icons/${t.id}/${t.icon}.png" alt="${t.name}" class="w-12 h-12 rounded-full">`:`<span class="text-white font-bold text-lg">${t.name.charAt(0).toUpperCase()}</span>`}
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white">${t.name}</h3>
              <p class="text-sm text-gray-400">${t.owner?"Owner":"Administrator"}</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            ${t.botInGuild?'<span class="px-2 py-1 bg-discord-green/20 text-discord-green text-xs rounded-full">Bot Online</span>':'<span class="px-2 py-1 bg-discord-red/20 text-discord-red text-xs rounded-full">Bot Offline</span>'}
          </div>
        </div>
        
        <div class="space-y-3">
          ${t.botInGuild?`<a href="#" class="view-dashboard-link block w-full px-4 py-2 bg-discord-blurple hover:bg-discord-blurple/80 text-white rounded-lg font-medium text-center transition-colors" data-guild-id="${t.id}">View Dashboard</a>`:`<button class="invite-btn w-full px-4 py-2 bg-discord-green hover:bg-discord-green/80 text-white rounded-lg font-medium transition-colors" data-guild-id="${t.id}" data-guild-name="${t.name}">Invite Velari</button>`}
        </div>
      </div>
    `).join("")}attachEventListeners(){const t=this.container.querySelector("#logout-btn");t&&t.addEventListener("click",()=>{localStorage.removeItem("discord_token"),this.onLogout()});const e=this.container.querySelector("#refresh-btn");e&&e.addEventListener("click",async()=>{await this.loadUserData(),this.render()}),this.container.querySelectorAll(".invite-btn").forEach(a=>{a.addEventListener("click",l=>{const r=l.currentTarget,i=r.getAttribute("data-guild-id"),d=r.getAttribute("data-guild-name");i&&this.handleInviteBot(i,d||"")})}),this.container.querySelectorAll(".view-dashboard-link").forEach(a=>{a.addEventListener("click",l=>{l.preventDefault();const i=l.currentTarget.getAttribute("data-guild-id");i&&this.renderServerDashboard(i,"home")})})}handleInviteBot(t,e){const s=this.discordAPI.getBotInviteUrl(t);window.open(s,"_blank"),this.showNotification(`Invite link generated for ${e}!`,"success"),setTimeout(async()=>{await this.loadUserData(),this.render()},5e3)}showNotification(t,e="success"){const s=document.createElement("div");s.className=`fixed top-4 right-4 px-6 py-4 rounded-lg text-white font-medium z-50 transition-all duration-300 ${e==="success"?"bg-discord-green":"bg-discord-red"}`,s.textContent=t,document.body.appendChild(s),setTimeout(()=>{s.remove()},3e3)}async renderServerDashboard(t,e="home"){const s=this.guilds.find(a=>a.id===t);if(!s)return;const o=async()=>{switch(e){case"home":return this.renderDashboardHomePage();case"welcome":return await this.renderWelcomeSystemPage(t);case"tickets":return await this.renderTicketSystemPage(t);case"moderation":return await this.renderModerationSystemPage(t);case"embeds":return this.renderEmbedBuilderPage(t);case"bot-settings":return await this.renderBotSettingsPage(t);case"autoroles":return await this.renderAutoRolesPage(t);case"logs":return this.renderLogsAndAnalyticsPage(t);case"permissions":return this.renderPermissionsPage(t);case"keys":return this.renderKeyManagementPage(t);case"store":return this.renderStoreManagementPage();case"storefronts":return this.renderCreatorStorefrontsPage(t);default:return this.renderDashboardHomePage()}};this.container.innerHTML=`
      <div class="min-h-screen flex bg-gradient-to-br from-discord-darkest via-discord-dark to-discord-darker text-white">
        <!-- Sidebar -->
        <aside class="w-64 bg-discord-darker text-white flex-shrink-0 p-6">
          <div class="mb-8">
            <label for="server-switcher-select" class="text-sm text-gray-400 mb-2 block">Current Server</label>
            <select id="server-switcher-select" name="server-switcher" class="w-full bg-discord-dark/50 border border-transparent rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-discord-blurple">
              ${this.guilds.map(a=>`<option value="${a.id}" ${a.id===s.id?"selected":""}>${a.name}</option>`).join("")}
            </select>
          </div>
          <nav class="space-y-2">
            <a href="#" data-page="home" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${e==="home"?"bg-white/10 text-white":"hover:bg-white/10"}">
              <span>🏠</span>
              <span>Dashboard Home</span>
            </a>
            <a href="#" data-page="welcome" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${e==="welcome"?"bg-white/10 text-white":"hover:bg-white/10"}">
              <span>👋</span>
              <span>Welcome System</span>
            </a>
            <a href="#" data-page="tickets" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${e==="tickets"?"bg-white/10 text-white":"hover:bg-white/10"}">
              <span>🎫</span>
              <span>Ticket System</span>
            </a>
            <a href="#" data-page="moderation" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${e==="moderation"?"bg-white/10 text-white":"hover:bg-white/10"}">
              <span>🛡️</span>
              <span>Moderation System</span>
            </a>
            <a href="#" data-page="embeds" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${e==="embeds"?"bg-white/10 text-white":"hover:bg-white/10"}">
              <span>📝</span>
              <span>Embed Builder</span>
            </a>
            <a href="#" data-page="bot-settings" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${e==="bot-settings"?"bg-white/10 text-white":"hover:bg-white/10"}">
              <span>🤖</span>
              <span>Bot Settings</span>
            </a>
            <a href="#" data-page="autoroles" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${e==="autoroles"?"bg-white/10 text-white":"hover:bg-white/10"}">
              <span>🎭</span>
              <span>Auto Roles & Reaction Roles</span>
            </a>
            <a href="#" data-page="logs" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${e==="logs"?"bg-white/10 text-white":"hover:bg-white/10"}">
              <span>📊</span>
              <span>Logs & Analytics</span>
            </a>
            <a href="#" data-page="permissions" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${e==="permissions"?"bg-white/10 text-white":"hover:bg-white/10"}">
              <span>🔑</span>
              <span>Permission Management</span>
            </a>
             <a href="#" data-page="keys" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${e==="keys"?"bg-white/10 text-white":"hover:bg-white/10"}">
              <span>🔐</span>
              <span>Key Management</span>
            </a>
            
             ${s.owner?`
              <a href="#" data-page="storefronts" class="flex items-center space-x-3 px-3 py-2 rounded-lg ${e==="storefronts"?"bg-white/10 text-white":"hover:bg-white/10"}">
                <span>🛍️</span>
                <span>Creator Storefronts</span>
                 <span class="text-xs bg-discord-green px-2 py-1 rounded-full">Owner</span>
              </a>
            `:""}
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
                <h1 class="text-2xl font-bold text-white">${s.name} Dashboard</h1>
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
            ${await o()}
          </main>
        </div>
      </div>
    `,this.attachServerDashboardEventListeners(t,e)}renderDashboardHomePage(){return`
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
            ${this.renderModuleToggle("welcome","Welcome","M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z","text-discord-green")}
            ${this.renderModuleToggle("tickets","Tickets","M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z","text-discord-blurple")}
            ${this.renderModuleToggle("moderation","Moderation","M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z","text-discord-red")}
            ${this.renderModuleToggle("autoroles","Auto Roles","M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z","text-discord-yellow")}
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
    `}renderModuleToggle(t,e,s,o){return`
      <div class="module-toggle bg-discord-dark/50 hover:bg-discord-dark rounded-lg p-4 transition-colors text-left" data-module="${t}">
        <div class="flex items-center justify-between mb-2">
          <svg class="w-6 h-6 ${o}" fill="currentColor" viewBox="0 0 20 20">
            <path d="${s}"/>
          </svg>
          <button class="toggle-switch relative inline-flex items-center h-4 w-8 rounded-full transition-colors bg-gray-600">
            <span class="toggle-indicator absolute left-0 inline-block w-4 h-4 transform bg-white rounded-full transition-transform"></span>
          </button>
        </div>
        <h3 class="text-white font-medium">${e}</h3>
      </div>
    `}async renderWelcomeSystemPage(t){const[e,s]=await Promise.all([this.fetchWelcomeSettings(t),this.fetchGuildChannels(t)]),o=(a,l)=>{const r=e?e[a]:l,i=String(a);return`
        <button class="toggle-switch relative inline-flex items-center h-4 w-8 rounded-full transition-colors ${r?"bg-discord-blurple":"bg-gray-600"}" data-setting="${i}">
          <span class="toggle-indicator absolute left-0 inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${r?"translate-x-4":""}"></span>
        </button>
      `};return`
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
              ${o("enabled",!1)}
            </div>
          </div>

          <div class="border-t border-white/10 p-6">
            <h3 class="text-lg font-semibold text-white mb-2">Welcome Channel</h3>
            <p class="text-sm text-gray-400 mb-4">Select the channel where welcome messages will be sent.</p>
            <select id="welcome-channel-select" class="w-full md:w-1/2 bg-discord-dark/50 border border-transparent rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-discord-blurple">
              ${s.filter(a=>a.type===0).map(a=>`<option value="${a.id}" ${(e==null?void 0:e.channelId)===a.id?"selected":""}>#${a.name}</option>`).join("")}
            </select>
          </div>

          <div class="border-t border-white/10 p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-white">Send Welcome in DMs</h3>
                <p class="text-sm text-gray-400">Send a copy of the welcome message directly to the new member.</p>
              </div>
              ${o("dmEnabled",!1)}
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
    `}async renderTicketSystemPage(t){const[e,s,o]=await Promise.all([this.fetchTicketSettings(t),this.fetchGuildChannels(t),this.fetchGuildRoles(t)]),a=s.filter(i=>i.type===4),l=s.filter(i=>i.type===0),r=(i,d)=>{const n=e?e[i]:d,c=String(i);return`
        <button class="toggle-switch relative inline-flex items-center h-4 w-8 rounded-full transition-colors ${n?"bg-discord-blurple":"bg-gray-600"}" data-setting="${c}">
          <span class="toggle-indicator absolute left-0 inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${n?"translate-x-4":""}"></span>
        </button>
      `};return`
      <div class="space-y-8" data-guild-id="${t}">
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
              ${r("enabled",!0)}
            </div>
          </div>
  
          <div class="border-t border-white/10 p-6">
            <h3 class="text-lg font-semibold text-white mb-2">Ticket Category</h3>
            <p class="text-sm text-gray-400 mb-4">Select the category where new ticket channels will be created.</p>
            <select id="ticket-category-select" class="w-full md:w-1/2 bg-discord-dark/50 border border-transparent rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-discord-blurple">
              ${a.map(i=>`<option value="${i.id}" ${(e==null?void 0:e.categoryId)===i.id?"selected":""}>${i.name}</option>`).join("")}
            </select>
          </div>
        </div>
        
        <!-- Staff Roles -->
        <div class="glass-effect rounded-xl p-6">
          <h3 class="text-lg font-semibold text-white mb-2">Staff Roles</h3>
          <p class="text-sm text-gray-400 mb-4">These roles will have permission to view and manage tickets.</p>
          <div id="staff-roles-list" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            ${o.map(i=>`
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" class="form-checkbox h-5 w-5 rounded bg-discord-dark/50 border-white/20 text-discord-blurple focus:ring-discord-blurple/50" data-role-id="${i.id}" ${e!=null&&e.staffRoleIds.includes(i.id)?"checked":""}>
                <span class="text-white" style="color: #${i.color.toString(16).padStart(6,"0")}">${i.name}</span>
              </label>
            `).join("")}
          </div>
        </div>
  
        <!-- Ticket Reasons -->
        <div class="glass-effect rounded-xl p-6">
          <h3 class="text-lg font-semibold text-white mb-2">Ticket Reason Buttons</h3>
          <p class="text-sm text-gray-400 mb-4">Configure the buttons users click to open a ticket. (e.g., "Bug Report", "User Report")</p>
          <div id="ticket-reasons-list" class="space-y-3">
            ${(e==null?void 0:e.reasons.map(i=>`
              <div class="flex items-center space-x-3" data-reason-id="${i.id}">
                <input type="text" class="reason-emoji w-16 bg-discord-dark/50 rounded-lg px-3 py-2 text-center" value="${i.emoji}">
                <input type="text" class="reason-label flex-grow bg-discord-dark/50 rounded-lg px-3 py-2" value="${i.label}">
                <button class="remove-reason-btn p-2 text-gray-400 hover:text-white hover:bg-red-600/50 rounded-full transition-colors">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
            `).join(""))||'<p class="text-gray-400">No reasons configured.</p>'}
          </div>
          <button id="add-ticket-reason" class="mt-4 px-4 py-2 bg-discord-dark/50 hover:bg-discord-dark text-white rounded-lg transition-colors text-sm">Add Reason</button>
        </div>
  
        <!-- Closing & Transcripts -->
        <div class="glass-effect rounded-xl">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-white mb-2">Close Message</h3>
            <p class="text-sm text-gray-400 mb-4">This message will be sent when a ticket is closed.</p>
            <textarea id="ticket-close-message" class="w-full h-24 bg-discord-dark/50 border border-transparent rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-discord-blurple" placeholder="Your ticket has been closed by a staff member.">${(e==null?void 0:e.closeMessage)||""}</textarea>
          </div>
          <div class="border-t border-white/10 p-6">
             <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-white">Enable Transcripts</h3>
                  <p class="text-sm text-gray-400">Save a transcript when a ticket is closed.</p>
                </div>
                ${r("transcriptsEnabled",!1)}
            </div>
          </div>
          <div class="border-t border-white/10 p-6">
            <h3 class="text-lg font-semibold text-white mb-2">Transcript Channel</h3>
            <p class="text-sm text-gray-400 mb-4">Select a channel to send transcripts to. (Requires transcripts to be enabled)</p>
            <select id="transcript-channel-select" class="w-full md:w-1/2 bg-discord-dark/50 border border-transparent rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-discord-blurple">
              ${l.map(i=>`<option value="${i.id}" ${(e==null?void 0:e.transcriptChannelId)===i.id?"selected":""}>#${i.name}</option>`).join("")}
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
    `}async fetchTicketSettings(t){try{const e=await fetch(`/api/ticket-settings?guildId=${t}`);if(!e.ok)throw new Error("Failed to fetch ticket settings");return await e.json()}catch(e){return console.error("Failed to fetch ticket settings",e),null}}attachTicketSystemEventListeners(){const t=document.querySelector(".space-y-8[data-guild-id]");if(!t)return;const e=t.dataset.guildId;t.querySelectorAll(".toggle-switch").forEach(o=>{o.addEventListener("click",()=>{const a=o.querySelector(".toggle-indicator"),l=o.classList.toggle("bg-discord-blurple");o.classList.toggle("bg-gray-600",!l),a.classList.toggle("translate-x-4",!l)})});const s=t.querySelector("#save-ticket-settings");s&&s.addEventListener("click",async()=>{var l,r;if(!e)return;const o=Array.from(t.querySelectorAll("#ticket-reasons-list > div")).map(i=>({id:i.dataset.reasonId,emoji:i.querySelector(".reason-emoji").value,label:i.querySelector(".reason-label").value})),a={enabled:(l=t.querySelector('[data-setting="enabled"]'))==null?void 0:l.classList.contains("bg-discord-blurple"),categoryId:t.querySelector("#ticket-category-select").value,staffRoleIds:Array.from(t.querySelectorAll("#staff-roles-list input:checked")).map(i=>i.dataset.roleId),reasons:o,closeMessage:t.querySelector("#ticket-close-message").value,transcriptsEnabled:(r=t.querySelector('[data-setting="transcriptsEnabled"]'))==null?void 0:r.classList.contains("bg-discord-blurple"),transcriptChannelId:t.querySelector("#transcript-channel-select").value};try{const d=await(await fetch(`/api/ticket-settings?guildId=${e}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})).json();if(d.success)this.showNotification("Ticket settings saved successfully!","success");else throw new Error(d.message)}catch(i){console.error("Failed to save ticket settings:",i),this.showNotification("Failed to save settings.","error")}})}async fetchWelcomeSettings(t){try{const e=await fetch(`/api/welcome-settings?guildId=${t}`);if(!e.ok)throw new Error("Failed to fetch settings");return await e.json()}catch(e){return console.error("Failed to fetch welcome settings",e),null}}async fetchGuildChannels(t){try{const e=await fetch(`/api/guild-channels?guildId=${t}`);if(!e.ok)throw new Error("Failed to fetch channels");return await e.json()}catch(e){return console.error("Failed to fetch guild channels",e),[]}}async fetchGuildRoles(t){try{const e=await fetch(`/api/guild-roles?guildId=${t}`);if(!e.ok)throw new Error("Failed to fetch roles");return await e.json()}catch(e){return console.error("Failed to fetch guild roles",e),[]}}attachWelcomeSystemEventListeners(){const t=document.querySelector(".space-y-8[data-guild-id]");if(!t)return;const e=t.dataset.guildId;t.querySelectorAll(".toggle-switch").forEach(o=>{o.addEventListener("click",()=>{const a=o.querySelector(".toggle-indicator"),l=o.classList.toggle("bg-discord-blurple");o.classList.toggle("bg-gray-600",!l),a.classList.toggle("translate-x-4",!l)})});const s=t.querySelector("#save-welcome-settings");s&&s.addEventListener("click",async()=>{var a,l;if(!e)return;const o={enabled:(a=t.querySelector('[data-setting="enabled"]'))==null?void 0:a.classList.contains("bg-discord-blurple"),channelId:t.querySelector("#welcome-channel-select").value,dmEnabled:(l=t.querySelector('[data-setting="dmEnabled"]'))==null?void 0:l.classList.contains("bg-discord-blurple"),message:t.querySelector("#welcome-message-input").value,bannerUrl:t.querySelector("#welcome-banner-url").value,autoRoleIds:Array.from(t.querySelectorAll("#auto-roles-list input:checked")).map(r=>r.dataset.roleId)};try{const i=await(await fetch(`/api/welcome-settings?guildId=${e}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})).json();if(i.success)this.showNotification("Welcome settings saved successfully!","success");else throw new Error(i.message)}catch(r){console.error("Failed to save welcome settings:",r),this.showNotification("Failed to save settings.","error")}})}attachServerDashboardEventListeners(t,e){const s=this.container.querySelector("#back-to-servers");s&&s.addEventListener("click",l=>{l.preventDefault(),this.render()});const o=this.container.querySelector("#server-switcher-select");if(o&&o.addEventListener("change",l=>{const r=l.target.value;r&&this.renderServerDashboard(r,e)}),this.container.querySelectorAll("aside nav a").forEach(l=>{l.addEventListener("click",r=>{r.preventDefault();const i=r.currentTarget.dataset.page;i&&this.renderServerDashboard(t,i)})}),e==="home"){this.updateDashboardStats(t),this.loadActivityLogs(t),document.querySelectorAll(".module-toggle").forEach(d=>{d.addEventListener("click",async n=>{const c=n.currentTarget,g=c.dataset.module,h=c.querySelector(".toggle-switch"),b=c.querySelector(".toggle-indicator"),m=h.classList.contains("bg-discord-blurple");try{if(!(await fetch("/api/toggle-module",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("discord_token")}`},body:JSON.stringify({guildId:t,module:g,enabled:!m})})).ok)throw new Error("Failed to toggle module");h.classList.toggle("bg-gray-600",m),h.classList.toggle("bg-discord-blurple",!m),b.classList.toggle("translate-x-4",!m),this.showNotification(`${g} module ${m?"disabled":"enabled"}`)}catch(v){console.error("Error toggling module:",v),this.showNotification("Failed to toggle module","error")}})});const l=setInterval(()=>{this.updateDashboardStats(t)},3e4),r=setInterval(()=>{this.loadActivityLogs(t)},1e4),i=this.render.bind(this);this.render=()=>{clearInterval(l),clearInterval(r),i()}}else e==="welcome"?this.attachWelcomeSystemEventListeners():e==="tickets"?this.attachTicketSystemEventListeners():e==="moderation"?this.attachModerationSystemEventListeners():e==="bot-settings"?this.attachBotSettingsEventListeners():e==="autoroles"?this.attachAutoRolesEventListeners():e==="logs"?this.attachLogsAndAnalyticsEventListeners(t):e==="permissions"?this.attachPermissionsEventListeners(t):e==="keys"?this.attachKeyManagementEventListeners(t):e==="store"?this.attachStoreManagementEventListeners():e==="storefronts"&&this.attachCreatorStorefrontsEventListeners(t)}async updateDashboardStats(t){try{const e=await fetch(`/api/server-stats?guildId=${t}`,{headers:{Authorization:`Bearer ${localStorage.getItem("discord_token")}`}});if(!e.ok)throw new Error("Failed to fetch server stats");const s=await e.json(),o=document.getElementById("member-count"),a=document.getElementById("bot-uptime"),l=document.getElementById("commands-count");o&&(o.textContent=s.memberCount.toLocaleString()),a&&(a.textContent=s.uptime),l&&(l.textContent=s.commandsUsed.toLocaleString())}catch(e){console.error("Error updating dashboard stats:",e),this.showNotification("Failed to load server statistics","error")}}async loadActivityLogs(t){try{const e=await fetch(`/api/activity-logs?guildId=${t}`,{headers:{Authorization:`Bearer ${localStorage.getItem("discord_token")}`}});if(!e.ok)throw new Error("Failed to fetch activity logs");const s=await e.json(),o=document.getElementById("activity-logs");o&&(o.innerHTML=s.map(a=>`
          <div class="bg-discord-dark/50 rounded-lg p-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-400">${new Date(a.timestamp).toLocaleString()}</span>
              <span class="px-2 py-1 text-xs rounded-full ${a.type==="warning"?"bg-discord-yellow/20 text-discord-yellow":a.type==="error"?"bg-discord-red/20 text-discord-red":"bg-discord-green/20 text-discord-green"}">${a.type}</span>
            </div>
            <p class="text-white mt-2">${a.message}</p>
          </div>
        `).join(""))}catch(e){console.error("Error loading activity logs:",e),this.showNotification("Failed to load activity logs","error")}}async renderModerationSystemPage(t){const[e,s,o]=await Promise.all([this.fetchModerationSettings(t),this.fetchGuildChannels(t),this.fetchGuildRoles(t)]),a=(r,i)=>{const d=e?e[r]:i,n=String(r);return`
        <button class="toggle-switch relative inline-flex items-center h-4 w-8 rounded-full transition-colors ${d?"bg-discord-blurple":"bg-gray-600"}" data-setting="${n}">
          <span class="toggle-indicator absolute left-0 inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${d?"translate-x-4":""}"></span>
        </button>
      `},l=s.filter(r=>r.type===0);return`
      <div class="space-y-8" data-guild-id="${t}">
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
              ${l.map(r=>`<option value="${r.id}" ${(e==null?void 0:e.logChannelId)===r.id?"selected":""}>#${r.name}</option>`).join("")}
            </select>
          </div>
          <div class="border-t border-white/10 p-6">
            <h3 class="text-lg font-semibold text-white mb-2">Mute Role</h3>
            <p class="text-sm text-gray-400 mb-4">Select the role to be used for muting members. The bot will need permissions to manage this role.</p>
            <select id="mute-role-select" class="w-full md:w-1/2 bg-discord-dark/50 border border-transparent rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-discord-blurple">
              ${o.map(r=>`<option value="${r.id}" ${(e==null?void 0:e.muteRoleId)===r.id?"selected":""}>${r.name}</option>`).join("")}
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
              ${a("antiSpamEnabled",!1)}
            </div>
            <div class="flex items-center justify-between p-4 bg-discord-dark/50 rounded-lg">
              <div>
                <h4 class="font-medium text-white">Raid Protection</h4>
                <p class="text-sm text-gray-400">Automatically lock down the server if a large number of joins is detected.</p>
              </div>
              ${a("raidProtectionEnabled",!1)}
            </div>
            <div>
              <h4 class="font-medium text-white mt-4">Banned Words Filter</h4>
              <p class="text-sm text-gray-400 mb-2">Automatically delete messages containing these words (comma-separated).</p>
              <textarea id="banned-words-list" class="w-full h-24 bg-discord-dark/50 border border-transparent rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-discord-blurple" placeholder="word1, phrase two, another one">${(e==null?void 0:e.bannedWords.join(", "))||""}</textarea>
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
                <option value="none" ${(e==null?void 0:e.strikeActions["3"])==="none"?"selected":""}>None</option>
                <option value="timeout-10m" ${(e==null?void 0:e.strikeActions["3"])==="timeout-10m"?"selected":""}>Timeout (10 Minutes)</option>
                <option value="kick" ${(e==null?void 0:e.strikeActions["3"])==="kick"?"selected":""}>Kick</option>
                <option value="ban" ${(e==null?void 0:e.strikeActions["3"])==="ban"?"selected":""}>Ban</option>
              </select>
            </div>
            <div class="flex items-center justify-between">
              <label for="strike-action-2" class="text-gray-300">After 5 strikes:</label>
              <select id="strike-action-2" class="w-1/2 bg-discord-dark/50 rounded-lg px-4 py-2" data-strikes="5">
                <option value="none" ${(e==null?void 0:e.strikeActions["5"])==="none"?"selected":""}>None</option>
                <option value="timeout-1h" ${(e==null?void 0:e.strikeActions["5"])==="timeout-1h"?"selected":""}>Timeout (1 Hour)</option>
                <option value="kick" ${(e==null?void 0:e.strikeActions["5"])==="kick"?"selected":""}>Kick</option>
                <option value="ban" ${(e==null?void 0:e.strikeActions["5"])==="ban"?"selected":""}>Ban</option>
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
    `}async fetchModerationSettings(t){try{const e=await fetch(`/api/moderation-settings?guildId=${t}`);if(!e.ok)throw new Error("Failed to fetch moderation settings");return await e.json()}catch(e){return console.error("Failed to fetch moderation settings",e),null}}attachModerationSystemEventListeners(){const t=document.querySelector(".space-y-8[data-guild-id]");if(!t)return;const e=t.dataset.guildId;t.querySelectorAll(".toggle-switch").forEach(o=>{o.addEventListener("click",()=>{const a=o.querySelector(".toggle-indicator"),l=o.classList.toggle("bg-discord-blurple");o.classList.toggle("bg-gray-600",!l),a.classList.toggle("translate-x-4",!l)})});const s=t.querySelector("#save-moderation-settings");s&&s.addEventListener("click",async()=>{var l,r;if(!e)return;const o={};t.querySelectorAll("[data-strikes]").forEach(i=>{o[i.dataset.strikes]=i.value});const a={logChannelId:t.querySelector("#mod-log-channel-select").value,muteRoleId:t.querySelector("#mute-role-select").value,antiSpamEnabled:(l=t.querySelector('[data-setting="antiSpamEnabled"]'))==null?void 0:l.classList.contains("bg-discord-blurple"),raidProtectionEnabled:(r=t.querySelector('[data-setting="raidProtectionEnabled"]'))==null?void 0:r.classList.contains("bg-discord-blurple"),bannedWords:t.querySelector("#banned-words-list").value.split(",").map(i=>i.trim()).filter(Boolean),strikeActions:o};try{const d=await(await fetch(`/api/moderation-settings?guildId=${e}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)})).json();if(d.success)this.showNotification("Moderation settings saved successfully!","success");else throw new Error(d.message)}catch(i){console.error("Failed to save moderation settings:",i),this.showNotification("Failed to save settings.","error")}})}renderEmbedBuilderPage(t){return`
      <div class="space-y-8" data-guild-id="${t}">
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
    `}async renderBotSettingsPage(t){const e=await this.fetchBotSettings(t);return`
      <div class="space-y-8" data-guild-id="${t}">
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
                      <input type="text" id="bot-prefix" class="w-full md:w-1/4 bg-discord-dark/50 rounded-lg p-2" placeholder="!" value="${(e==null?void 0:e.prefix)||""}">
                  </div>
                  <div>
                      <label for="bot-language" class="block text-sm font-medium text-gray-300 mb-1">Language</label>
                      <select id="bot-language" class="w-full md:w-1/2 bg-discord-dark/50 rounded-lg p-2">
                          <option value="en-US" ${(e==null?void 0:e.language)==="en-US"?"selected":""}>English (US)</option>
                          <option value="es-ES" ${(e==null?void 0:e.language)==="es-ES"?"selected":""}>Español</option>
                          <option value="fr-FR" ${(e==null?void 0:e.language)==="fr-FR"?"selected":""}>Français</option>
                      </select>
                  </div>
                   <div>
                      <label for="bot-timezone" class="block text-sm font-medium text-gray-300 mb-1">Timezone</label>
                      <select id="bot-timezone" class="w-full md:w-1/2 bg-discord-dark/50 rounded-lg p-2">
                          <option value="UTC" ${(e==null?void 0:e.timezone)==="UTC"?"selected":""}>UTC</option>
                          <option value="PST" ${(e==null?void 0:e.timezone)==="PST"?"selected":""}>Pacific Standard Time</option>
                          <option value="EST" ${(e==null?void 0:e.timezone)==="EST"?"selected":""}>Eastern Standard Time</option>
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
                      <input type="text" id="bot-name" class="w-full md:w-1/2 bg-discord-dark/50 rounded-lg p-2" placeholder="Velari" value="${(e==null?void 0:e.name)||""}">
                  </div>
                  <div>
                      <label for="bot-avatar" class="block text-sm font-medium text-gray-300 mb-1">Bot Avatar URL</label>
                      <input type="text" id="bot-avatar" class="w-full bg-discord-dark/50 rounded-lg p-2" placeholder="https://example.com/avatar.png" value="${(e==null?void 0:e.avatar)||""}">
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
                      <textarea id="command-whitelist" class="w-full h-32 bg-discord-dark/50 rounded-lg p-2" placeholder="play, skip, queue">${(e==null?void 0:e.commandWhitelist.join(", "))||""}</textarea>
                  </div>
                   <div>
                      <label for="command-blacklist" class="block text-sm font-medium text-gray-300 mb-1">Blacklisted Commands</label>
                      <p class="text-xs text-gray-400 mb-2">These commands cannot be used.</p>
                      <textarea id="command-blacklist" class="w-full h-32 bg-discord-dark/50 rounded-lg p-2" placeholder="ban, kick">${(e==null?void 0:e.commandBlacklist.join(", "))||""}</textarea>
                  </div>
              </div>
          </div>
  
          <!-- Save Button -->
          <div class="flex justify-end mt-8">
              <button id="save-bot-settings" class="px-6 py-3 bg-discord-blurple hover:bg-discord-blurple/80 text-white rounded-lg font-medium transition-colors">Save Changes</button>
          </div>
      </div>
    `}async fetchBotSettings(t){try{const e=await fetch(`/api/bot-settings?guildId=${t}`);if(!e.ok)throw new Error("Failed to fetch bot settings");return await e.json()}catch(e){return console.error("Failed to fetch bot settings",e),this.showNotification("Failed to load bot settings.","error"),null}}attachBotSettingsEventListeners(){const t=this.container.querySelector(".space-y-8[data-guild-id]");if(!t)return;const e=t.dataset.guildId,s=t.querySelector("#save-bot-settings");s&&s.addEventListener("click",async()=>{if(!e)return;const o=r=>t.querySelector(`#${r}`).value,a=r=>t.querySelector(`#${r}`).value,l={prefix:o("bot-prefix"),language:o("bot-language"),timezone:o("bot-timezone"),name:o("bot-name"),avatar:o("bot-avatar"),commandWhitelist:a("command-whitelist").split(",").map(r=>r.trim()).filter(Boolean),commandBlacklist:a("command-blacklist").split(",").map(r=>r.trim()).filter(Boolean)};try{const i=await(await fetch(`/api/bot-settings?guildId=${e}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)})).json();if(i.success)this.showNotification("Bot settings saved successfully!","success");else throw new Error(i.message)}catch(r){console.error("Failed to save bot settings:",r),this.showNotification("Failed to save settings.","error")}})}async renderAutoRolesPage(t){const[e,s,o]=await Promise.all([this.fetchAutoRolesSettings(t),this.fetchGuildChannels(t),this.fetchGuildRoles(t)]),a=l=>`
            <div class="bg-discord-dark/50 rounded-lg p-4" data-menu-id="${l.id}">
                <input type="text" class="w-full bg-transparent text-white text-lg font-semibold mb-2" value="${l.embedTitle}">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">Channel & Message ID</label>
                        <div class="flex space-x-2">
                            <select class="w-1/2 bg-discord-darker rounded-lg p-2">
                                ${s.filter(r=>r.type===0).map(r=>`<option value="${r.id}" ${r.id===l.channelId?"selected":""}>#${r.name}</option>`).join("")}
                            </select>
                            <input type="text" class="w-1/2 bg-discord-darker rounded-lg p-2" placeholder="Message ID" value="${l.messageId}">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">Emoji & Role Mappings</label>
                        <div class="space-y-2 reaction-role-mappings">
                        ${l.mappings.map(r=>`
                            <div class="flex items-center space-x-2">
                                <input type="text" class="w-16 bg-discord-darker rounded-lg p-2 text-center" value="${r.emoji}">
                                <select class="flex-grow bg-discord-darker rounded-lg p-2">
                                    ${o.map(i=>`<option value="${i.id}" ${i.id===r.roleId?"selected":""}>${i.name}</option>`).join("")}
                                </select>
                                <button class="remove-mapping-btn p-2 text-gray-400 hover:text-white hover:bg-red-600/50 rounded-full transition-colors">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>
                        `).join("")}
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
        `;return`
        <div class="space-y-8" data-guild-id="${t}">
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
                    <button class="toggle-switch relative inline-flex items-center h-4 w-8 rounded-full transition-colors ${e!=null&&e.autoRoleOnJoinEnabled?"bg-discord-blurple":"bg-gray-600"}" data-setting="autoRoleOnJoinEnabled">
                        <span class="toggle-indicator absolute left-0 inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${e!=null&&e.autoRoleOnJoinEnabled?"translate-x-4":""}"></span>
                    </button>
                </div>
                <div class="mt-4">
                    <label for="auto-role-select" class="block text-sm font-medium text-gray-300 mb-1">Role to Assign</label>
                    <select id="auto-role-select" class="w-full md:w-1/2 bg-discord-dark/50 rounded-lg p-2">
                        <option value="">None</option>
                        ${o.map(l=>`<option value="${l.id}" ${(e==null?void 0:e.autoRoleOnJoinId)===l.id?"selected":""}>${l.name}</option>`).join("")}
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
                    ${e&&e.reactionRoleMenus.length>0?e.reactionRoleMenus.map(a).join(""):'<p class="text-gray-400">No reaction role menus have been created yet.</p>'}
                </div>
            </div>

            <!-- Save Button -->
            <div class="flex justify-end mt-8">
                <button id="save-autoroles-settings" class="px-6 py-3 bg-discord-green hover:bg-discord-green/80 text-white rounded-lg font-medium transition-colors">Save All Changes</button>
            </div>
        </div>
    `}async fetchAutoRolesSettings(t){try{const e=await fetch(`/api/autoroles-settings?guildId=${t}`);if(!e.ok)throw new Error("Failed to fetch auto-roles settings");return await e.json()}catch(e){return console.error("Failed to fetch auto-roles settings",e),this.showNotification("Failed to load auto-roles settings.","error"),null}}attachAutoRolesEventListeners(){const t=this.container.querySelector(".space-y-8[data-guild-id]");if(!t)return;const e=t.dataset.guildId;t.querySelectorAll(".toggle-switch").forEach(a=>{a.addEventListener("click",()=>{const l=a.querySelector(".toggle-indicator");a.classList.toggle("bg-discord-blurple"),a.classList.toggle("bg-gray-600"),l&&l.classList.toggle("translate-x-4")})});const s=t.querySelector("#add-reaction-menu");s==null||s.addEventListener("click",()=>{this.showNotification("Creating a new menu... (UI placeholder)","success")});const o=t.querySelector("#save-autoroles-settings");o==null||o.addEventListener("click",async()=>{e&&this.showNotification("Saving... (functionality to be fully implemented)","success")})}renderLogsAndAnalyticsPage(t){return`
      <div class="space-y-8" data-guild-id="${t}">
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
    `}attachLogsAndAnalyticsEventListeners(t){this.updateLogsAndAnalytics(t);const e=this.container.querySelector("#log-type-filter"),s=this.container.querySelector("#log-user-filter");e==null||e.addEventListener("change",()=>this.updateLogsAndAnalytics(t)),s==null||s.addEventListener("input",()=>this.updateLogsAndAnalytics(t))}async updateLogsAndAnalytics(t){try{const e=await this.fetchAnalyticsAndLogs(t);if(!e)return;const s=this.container.querySelector("#server-growth-stat"),o=this.container.querySelector("#engagement-stat"),a=this.container.querySelector("#top-command-stat");s&&(s.textContent=e.serverGrowth),o&&(o.textContent=e.engagement),a&&(a.textContent=e.topCommand);const l=this.container.querySelector("#log-type-filter").value,r=this.container.querySelector("#log-user-filter").value.toLowerCase(),i=e.logs.filter(n=>{const c=l==="all"||n.type===l,g=n.userId.includes(r)||n.userTag.toLowerCase().includes(r);return c&&g}),d=this.container.querySelector("#logs-table-body");if(d){if(i.length===0){d.innerHTML='<tr><td colspan="4" class="text-center py-8">No logs found for the selected filters.</td></tr>';return}d.innerHTML=i.map(n=>`
                <tr class="border-b border-gray-700 hover:bg-white/5">
                    <td class="px-6 py-4">${new Date(n.timestamp).toLocaleString()}</td>
                    <td class="px-6 py-4">${n.userTag} (${n.userId})</td>
                    <td class="px-6 py-4"><span class="px-2 py-1 text-xs rounded-full bg-discord-blurple/50">${n.type}</span></td>
                    <td class="px-6 py-4 font-mono">${n.action}</td>
                </tr>
            `).join("")}}catch(e){console.error("Failed to update logs and analytics",e),this.showNotification("Failed to load logs and analytics data.","error")}}async fetchAnalyticsAndLogs(t){try{const e=await fetch(`/api/analytics-and-logs?guildId=${t}`);if(!e.ok)throw new Error("Failed to fetch analytics and logs");return await e.json()}catch(e){return console.error("Failed to fetch analytics and logs",e),null}}renderPermissionsPage(t){return`
      <div class="space-y-8" data-guild-id="${t}">
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
    `}async attachPermissionsEventListeners(t){const e=await this.fetchGuildRoles(t),s=this.container.querySelector("#permission-role-select"),o=this.container.querySelector("#permissions-editor"),a=this.container.querySelector("#save-permissions-settings");if(!s||!o||!a)return;s.innerHTML='<option value="">Select a role...</option>'+e.map(r=>`<option value="${r.id}">${r.name}</option>`).join("");let l=null;s.addEventListener("change",async r=>{const i=r.target.value;if(!i){o.classList.add("hidden");return}if(l=await this.fetchPermissions(t,i),!l){this.showNotification("Could not load permissions for this role.","error");return}this.updatePermissionsEditor(l),o.classList.remove("hidden")}),a.addEventListener("click",async()=>{var d,n,c,g,h,b,m;const r=s.value;if(!r||!l){this.showNotification("Please select a role first.","error");return}const i={roleId:r,dashboardAccess:((d=this.container.querySelector('[data-permission="dashboardAccess"]'))==null?void 0:d.classList.contains("bg-discord-blurple"))??!1,modules:{welcome:((n=this.container.querySelector('[data-permission="module.welcome"]'))==null?void 0:n.classList.contains("bg-discord-blurple"))??!1,tickets:((c=this.container.querySelector('[data-permission="module.tickets"]'))==null?void 0:c.classList.contains("bg-discord-blurple"))??!1,moderation:((g=this.container.querySelector('[data-permission="module.moderation"]'))==null?void 0:g.classList.contains("bg-discord-blurple"))??!1,autoroles:((h=this.container.querySelector('[data-permission="module.autoroles"]'))==null?void 0:h.classList.contains("bg-discord-blurple"))??!1},allowedCommands:((b=this.container.querySelector('textarea[placeholder="play, skip"]'))==null?void 0:b.value.split(",").map(v=>v.trim()).filter(Boolean))??[],deniedCommands:((m=this.container.querySelector('textarea[placeholder="ban, kick"]'))==null?void 0:m.value.split(",").map(v=>v.trim()).filter(Boolean))??[]};await this.savePermissions(t,i)}),this.container.querySelectorAll("#permissions-editor .toggle-switch").forEach(r=>{r.addEventListener("click",()=>{const i=r.querySelector(".toggle-indicator");r.classList.toggle("bg-discord-blurple"),r.classList.toggle("bg-gray-600"),i&&i.classList.toggle("translate-x-4")})})}updatePermissionsEditor(t){const e=(a,l)=>{const r=this.container.querySelector(`[data-permission="${a}"]`);if(!r)return;r.classList.toggle("bg-discord-blurple",l),r.classList.toggle("bg-gray-600",!l);const i=r.querySelector(".toggle-indicator");i&&i.classList.toggle("translate-x-4",l)};e("dashboardAccess",t.dashboardAccess),Object.entries(t.modules).forEach(([a,l])=>{e(`module.${a}`,l)});const s=this.container.querySelector('textarea[placeholder="play, skip"]'),o=this.container.querySelector('textarea[placeholder="ban, kick"]');s&&(s.value=t.allowedCommands.join(", ")),o&&(o.value=t.deniedCommands.join(", "))}async fetchPermissions(t,e){try{const s=await fetch(`/api/permissions?guildId=${t}&roleId=${e}`);if(!s.ok)throw new Error("Failed to fetch permissions");return await s.json()}catch(s){return console.error("Failed to fetch permissions",s),null}}async savePermissions(t,e){try{const o=await(await fetch(`/api/permissions?guildId=${t}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json();if(o.success)this.showNotification("Permissions saved successfully!","success");else throw new Error(o.message)}catch(s){console.error("Failed to save permissions:",s),this.showNotification("Failed to save permissions.","error")}}renderKeyManagementPage(t){return`
      <div class="space-y-8" data-guild-id="${t}">
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
    `}attachKeyManagementEventListeners(t){this.updateKeyManagementData(t);const e=this.container.querySelector("#create-key-btn"),s=this.container.querySelector("#redeem-key-btn");e==null||e.addEventListener("click",()=>{this.showNotification("Key creation modal would open here.","success")}),s==null||s.addEventListener("click",()=>{const o=this.container.querySelector("#redeem-key-input");o&&o.value?(this.showNotification(`Attempting to redeem key: ${o.value}`,"success"),o.value=""):this.showNotification("Please enter a key to redeem.","error")})}async updateKeyManagementData(t){try{const e=await this.fetchKeyManagementData(t);if(!e)return;const s=this.container.querySelector("#keys-table-body");s&&(e.keys.length===0?s.innerHTML='<tr><td colspan="6" class="text-center py-8">No license keys found.</td></tr>':s.innerHTML=e.keys.map(a=>this.renderKeyRow(a)).join(""));const o=this.container.querySelector("#key-logs-table-body");o&&(e.logs.length===0?o.innerHTML='<tr><td colspan="4" class="text-center py-8">No redemption history found.</td></tr>':o.innerHTML=e.logs.map(a=>`
                    <tr class="border-b border-gray-700">
                        <td class="px-6 py-4">${new Date(a.timestamp).toLocaleString()}</td>
                        <td class="px-6 py-4 font-mono">${a.key}</td>
                        <td class="px-6 py-4">${a.userTag} (${a.userId})</td>
                        <td class="px-6 py-4"><span class="px-2 py-1 text-xs rounded-full ${a.status==="Success"?"bg-discord-green/50":"bg-discord-red/50"}">${a.status}</span></td>
                    </tr>
                `).join(""))}catch(e){console.error("Failed to update key management data",e),this.showNotification("Failed to load key management data.","error")}}renderKeyRow(t){const e={Active:"bg-discord-green/50",Redeemed:"bg-discord-blurple/50",Expired:"bg-discord-yellow/50",Revoked:"bg-discord-red/50"}[t.status];return`
      <tr class="border-b border-gray-700 hover:bg-white/5">
        <td class="px-6 py-4 font-mono">${t.key}</td>
        <td class="px-6 py-4">${t.type}</td>
        <td class="px-6 py-4">${t.unlocks}</td>
        <td class="px-6 py-4"><span class="px-2 py-1 text-xs rounded-full ${e}">${t.status}</span></td>
        <td class="px-6 py-4">${t.expiry?new Date(t.expiry).toLocaleDateString():"Never"}</td>
        <td class="px-6 py-4">
            <button class="p-1 text-gray-400 hover:text-white" title="Edit"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg></button>
            <button class="p-1 text-gray-400 hover:text-white" title="Revoke"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg></button>
        </td>
      </tr>
    `}async fetchKeyManagementData(t){try{const e=await fetch(`/api/key-management?guildId=${t}`);if(!e.ok)throw new Error("Failed to fetch key management data");return await e.json()}catch(e){return console.error("Failed to fetch key management data",e),null}}renderStoreManagementPage(){return`
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
    `}attachStoreManagementEventListeners(){this.updateStoreData();const t=this.container.querySelectorAll(".tab-btn"),e=this.container.querySelectorAll(".tab-panel");t.forEach(i=>{i.addEventListener("click",()=>{const d=i.dataset.tab;t.forEach(c=>{c.classList.remove("bg-discord-blurple","text-white"),c.classList.add("text-gray-300")}),i.classList.add("bg-discord-blurple","text-white"),i.classList.remove("text-gray-300"),e.forEach(c=>{c.classList.add("hidden")});const n=this.container.querySelector(`#${d}-tab`);n&&n.classList.remove("hidden")})});const s=this.container.querySelector("#create-product-btn"),o=this.container.querySelector("#generate-checkout-btn");s==null||s.addEventListener("click",()=>{this.showNotification("Product creation modal would open here.","success")}),o==null||o.addEventListener("click",()=>{this.showNotification("Checkout link generator would open here.","success")});const a=this.container.querySelector("#transaction-search"),l=this.container.querySelector("#transaction-status-filter"),r=this.container.querySelector("#customer-search");a==null||a.addEventListener("input",()=>this.updateStoreData()),l==null||l.addEventListener("change",()=>this.updateStoreData()),r==null||r.addEventListener("input",()=>this.updateStoreData())}async updateStoreData(){try{const[t,e,s,o,a]=await Promise.all([this.fetchStoreAnalytics(),this.fetchProducts(),this.fetchSubscriptions(),this.fetchTransactions(),this.fetchCustomers()]);t&&(this.updateStoreStats(t),this.updateAnalyticsTab(t)),e&&this.updateProductsTable(e),s&&this.updateSubscriptionsTable(s),o&&this.updateTransactionsTable(o),a&&this.updateCustomersTable(a)}catch(t){console.error("Failed to update store data",t),this.showNotification("Failed to load store data.","error")}}updateStoreStats(t){const e=this.container.querySelector("#total-revenue"),s=this.container.querySelector("#active-subscriptions"),o=this.container.querySelector("#total-transactions"),a=this.container.querySelector("#total-customers");e&&(e.textContent=`$${(t.totalRevenue/100).toFixed(2)}`),s&&(s.textContent=t.activeSubscriptions.toString()),o&&(o.textContent=t.totalTransactions.toString()),a&&(a.textContent=t.recentTransactions.length.toString())}updateProductsTable(t){const e=this.container.querySelector("#products-table-body");if(e){if(t.length===0){e.innerHTML='<tr><td colspan="5" class="text-center py-8">No products found.</td></tr>';return}e.innerHTML=t.map(s=>`
      <tr class="border-b border-gray-700 hover:bg-white/5">
        <td class="px-6 py-4">
          <div>
            <div class="font-medium text-white">${s.name}</div>
            <div class="text-sm text-gray-400">${s.description}</div>
          </div>
        </td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full bg-discord-blurple/50">${s.type}</span>
        </td>
        <td class="px-6 py-4">$${(s.price/100).toFixed(2)} ${s.currency}</td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full ${s.active?"bg-discord-green/50":"bg-discord-red/50"}">${s.active?"Active":"Inactive"}</span>
        </td>
        <td class="px-6 py-4">
          <button class="p-1 text-gray-400 hover:text-white" title="Edit"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg></button>
          <button class="p-1 text-gray-400 hover:text-white" title="Toggle Status"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg></button>
        </td>
      </tr>
    `).join("")}}updateSubscriptionsTable(t){const e=this.container.querySelector("#subscriptions-table-body");if(e){if(t.length===0){e.innerHTML='<tr><td colspan="5" class="text-center py-8">No subscriptions found.</td></tr>';return}e.innerHTML=t.map(s=>`
      <tr class="border-b border-gray-700 hover:bg-white/5">
        <td class="px-6 py-4">${s.customerId}</td>
        <td class="px-6 py-4">${s.productId}</td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full ${s.status==="active"?"bg-discord-green/50":"bg-discord-red/50"}">${s.status}</span>
        </td>
        <td class="px-6 py-4">${new Date(s.currentPeriodStart).toLocaleDateString()} - ${new Date(s.currentPeriodEnd).toLocaleDateString()}</td>
        <td class="px-6 py-4">
          <button class="p-1 text-gray-400 hover:text-white" title="Cancel"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
        </td>
      </tr>
    `).join("")}}updateTransactionsTable(t){const e=this.container.querySelector("#transactions-table-body");if(e){if(t.length===0){e.innerHTML='<tr><td colspan="6" class="text-center py-8">No transactions found.</td></tr>';return}e.innerHTML=t.map(s=>`
      <tr class="border-b border-gray-700 hover:bg-white/5">
        <td class="px-6 py-4">${new Date(s.createdAt).toLocaleString()}</td>
        <td class="px-6 py-4">${s.customerId}</td>
        <td class="px-6 py-4">${s.productId}</td>
        <td class="px-6 py-4">$${(s.amount/100).toFixed(2)} ${s.currency}</td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full ${this.getTransactionStatusColor(s.status)}">${s.status}</span>
        </td>
        <td class="px-6 py-4">
          ${s.status==="completed"?'<button class="p-1 text-gray-400 hover:text-white" title="Refund"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/></svg></button>':""}
        </td>
      </tr>
    `).join("")}}updateCustomersTable(t){const e=this.container.querySelector("#customers-table-body");if(e){if(t.length===0){e.innerHTML='<tr><td colspan="6" class="text-center py-8">No customers found.</td></tr>';return}e.innerHTML=t.map(s=>`
      <tr class="border-b border-gray-700 hover:bg-white/5">
        <td class="px-6 py-4">${s.name}</td>
        <td class="px-6 py-4">${s.email}</td>
        <td class="px-6 py-4">${s.discordId||"N/A"}</td>
        <td class="px-6 py-4">$${(s.totalSpent/100).toFixed(2)}</td>
        <td class="px-6 py-4">${s.subscriptionCount}</td>
        <td class="px-6 py-4">
          <button class="p-1 text-gray-400 hover:text-white" title="View Details"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/></svg></button>
        </td>
      </tr>
    `).join("")}}updateAnalyticsTab(t){const e=this.container.querySelector("#top-products-list");e&&(e.innerHTML=t.topProducts.map(o=>`
        <div class="flex justify-between items-center p-3 bg-discord-dark/50 rounded-lg">
          <div>
            <div class="font-medium text-white">${o.productName}</div>
            <div class="text-sm text-gray-400">${o.sales} sales</div>
          </div>
          <div class="text-right">
            <div class="font-medium text-white">$${(o.revenue/100).toFixed(2)}</div>
          </div>
        </div>
      `).join(""));const s=this.container.querySelector("#recent-transactions-list");s&&(s.innerHTML=t.recentTransactions.map(o=>`
        <div class="flex justify-between items-center p-3 bg-discord-dark/50 rounded-lg">
          <div>
            <div class="font-medium text-white">${o.customerId}</div>
            <div class="text-sm text-gray-400">${new Date(o.createdAt).toLocaleDateString()}</div>
          </div>
          <div class="text-right">
            <div class="font-medium text-white">$${(o.amount/100).toFixed(2)}</div>
            <div class="text-sm text-gray-400">${o.status}</div>
          </div>
        </div>
      `).join(""))}getTransactionStatusColor(t){switch(t){case"completed":return"bg-discord-green/50";case"pending":return"bg-discord-yellow/50";case"failed":return"bg-discord-red/50";case"refunded":return"bg-gray-500/50";default:return"bg-gray-500/50"}}async fetchStoreAnalytics(){try{const t=await fetch("/api/store/analytics");if(!t.ok)throw new Error("Failed to fetch store analytics");return await t.json()}catch(t){return console.error("Failed to fetch store analytics",t),null}}async fetchProducts(){try{const t=await fetch("/api/store/products");if(!t.ok)throw new Error("Failed to fetch products");return await t.json()}catch(t){return console.error("Failed to fetch products",t),null}}async fetchSubscriptions(){try{const t=await fetch("/api/store/subscriptions");if(!t.ok)throw new Error("Failed to fetch subscriptions");return await t.json()}catch(t){return console.error("Failed to fetch subscriptions",t),null}}async fetchTransactions(){try{const t=await fetch("/api/store/transactions");if(!t.ok)throw new Error("Failed to fetch transactions");return await t.json()}catch(t){return console.error("Failed to fetch transactions",t),null}}async fetchCustomers(){try{const t=await fetch("/api/store/customers");if(!t.ok)throw new Error("Failed to fetch customers");return await t.json()}catch(t){return console.error("Failed to fetch customers",t),null}}renderCreatorStorefrontsPage(t){return`
      <div class="space-y-8" data-guild-id="${t}">
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
    `}attachCreatorStorefrontsEventListeners(t){const e=this.container.querySelectorAll(".tab-btn"),s=this.container.querySelectorAll(".tab-panel");e.forEach(n=>{n.addEventListener("click",()=>{const c=n.getAttribute("data-tab");e.forEach(h=>{h.classList.remove("bg-discord-blurple","text-white"),h.classList.add("text-gray-300","hover:text-white")}),n.classList.add("bg-discord-blurple","text-white"),n.classList.remove("text-gray-300","hover:text-white"),s.forEach(h=>{h.classList.add("hidden")});const g=this.container.querySelector(`#${c}-tab`);g&&g.classList.remove("hidden"),this.loadStorefrontTabData(t,c||"setup")})});const o=this.container.querySelector("#toggle-store-btn");o&&o.addEventListener("click",()=>{this.toggleStoreStatus(t)});const a=this.container.querySelector("#save-store-settings");a&&a.addEventListener("click",()=>{this.saveStoreSettings(t)});const l=this.container.querySelector("#add-product-btn");l&&l.addEventListener("click",()=>{this.showAddProductModal(t)});const r=this.container.querySelector("#add-promo-btn");r&&r.addEventListener("click",()=>{this.showAddPromoModal(t)});const i=this.container.querySelector("#order-status-filter");i&&i.addEventListener("change",()=>{this.filterOrders(t,i.value)});const d=this.container.querySelector("#customer-search");d&&d.addEventListener("input",()=>{this.searchCustomers(t,d.value)})}async searchCustomers(t,e){console.log(`Searching customers with query: ${e}`)}async loadStorefrontTabData(t,e){try{switch(e){case"products":const s=await this.fetchStoreProducts(t);s&&this.updateStoreProductsTable(s);break;case"orders":const o=await this.fetchStoreOrders(t);o&&this.updateStoreOrdersTable(o);break;case"customers":const a=await this.fetchStoreCustomers(t);a&&this.updateStoreCustomersTable(a);break;case"promocodes":const l=await this.fetchStorePromoCodes(t);l&&this.updateStorePromoCodesTable(l);break;case"analytics":const r=await this.fetchStorefrontAnalytics(t);r&&this.updateStoreAnalyticsTab(r);break}}catch(s){console.error(`Failed to load ${e} data:`,s)}}async fetchStorefront(t){try{const e=await fetch(`/api/storefronts?guildId=${t}`);if(!e.ok)throw new Error("Failed to fetch storefront");return await e.json()}catch(e){return console.error("Failed to fetch storefront",e),null}}async fetchStoreProducts(t){try{const e=await fetch(`/api/storefronts/products?guildId=${t}`);if(!e.ok)throw new Error("Failed to fetch store products");return await e.json()}catch(e){return console.error("Failed to fetch store products",e),null}}async fetchStoreOrders(t){try{const e=await fetch(`/api/storefronts/orders?guildId=${t}`);if(!e.ok)throw new Error("Failed to fetch store orders");return await e.json()}catch(e){return console.error("Failed to fetch store orders",e),null}}async fetchStoreCustomers(t){try{const e=await fetch(`/api/storefronts/customers?guildId=${t}`);if(!e.ok)throw new Error("Failed to fetch store customers");return await e.json()}catch(e){return console.error("Failed to fetch store customers",e),null}}async fetchStorePromoCodes(t){try{const e=await fetch(`/api/storefronts/promocodes?guildId=${t}`);if(!e.ok)throw new Error("Failed to fetch store promo codes");return await e.json()}catch(e){return console.error("Failed to fetch store promo codes",e),null}}async fetchStorefrontAnalytics(t){try{const e=await fetch(`/api/storefronts/analytics?guildId=${t}`);if(!e.ok)throw new Error("Failed to fetch store analytics");return await e.json()}catch(e){return console.error("Failed to fetch store analytics",e),null}}updateStorefrontUI(t){const e=this.container.querySelector("#toggle-store-btn");e&&(t.status==="active"?(e.textContent="Disable Store",e.classList.remove("bg-discord-green","hover:bg-discord-green/80"),e.classList.add("bg-discord-red","hover:bg-discord-red/80")):(e.textContent="Enable Store",e.classList.remove("bg-discord-red","hover:bg-discord-red/80"),e.classList.add("bg-discord-green","hover:bg-discord-green/80")));const s=this.container.querySelector(".font-mono");s&&(s.textContent=`velari.gg/${t.customUrl}`);const o=this.container.querySelector("#store-name");o&&(o.value=t.name);const a=this.container.querySelector("#store-url");a&&(a.value=t.customUrl);const l=this.container.querySelector("#store-description");l&&(l.value=t.description);const r=this.container.querySelector("#store-currency");r&&(r.value=t.currency);const i=this.container.querySelector("#store-processor");i&&(i.value=t.paymentProcessor);const d=this.container.querySelector("#store-tos");d&&(d.value=t.tos);const n=this.container.querySelector("#store-refund-policy");n&&(n.value=t.refundPolicy)}updateStorefrontStats(t){const e=this.container.querySelector("#store-revenue");e&&(e.textContent=`$${(t.totalRevenue/100).toFixed(2)}`);const s=this.container.querySelector("#store-orders");s&&(s.textContent=t.totalOrders.toString());const o=this.container.querySelector("#store-customers");o&&(o.textContent=t.activeCustomers.toString());const a=this.container.querySelector("#store-products");a&&(a.textContent=t.topProducts.length.toString())}updateStoreProductsTable(t){const e=this.container.querySelector("#store-products-table-body");if(e){if(t.length===0){e.innerHTML='<tr><td colspan="6" class="text-center py-8">No products found.</td></tr>';return}e.innerHTML=t.map(s=>`
      <tr class="border-b border-gray-700 hover:bg-white/5">
        <td class="px-6 py-4">
          <div class="flex items-center">
            ${s.imageUrl?`<img src="${s.imageUrl}" class="w-8 h-8 rounded mr-3">`:""}
            <div>
              <div class="font-medium text-white">${s.name}</div>
              <div class="text-sm text-gray-400">${s.description}</div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full bg-discord-blurple/50">${s.type}</span>
        </td>
        <td class="px-6 py-4">$${(s.price/100).toFixed(2)}</td>
        <td class="px-6 py-4">${s.stock===null?"∞":s.stock}</td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full ${s.active?"bg-discord-green/50":"bg-discord-red/50"}">${s.active?"Active":"Inactive"}</span>
        </td>
        <td class="px-6 py-4">
          <button class="p-1 text-gray-400 hover:text-white mr-2" title="Edit"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/></svg></button>
          <button class="p-1 text-gray-400 hover:text-white" title="Delete"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/></svg></button>
        </td>
      </tr>
    `).join("")}}updateStoreOrdersTable(t){const e=this.container.querySelector("#store-orders-table-body");if(e){if(t.length===0){e.innerHTML='<tr><td colspan="6" class="text-center py-8">No orders found.</td></tr>';return}e.innerHTML=t.map(s=>`
      <tr class="border-b border-gray-700 hover:bg-white/5">
        <td class="px-6 py-4 font-mono text-sm">${s.id}</td>
        <td class="px-6 py-4">
          <div>
            <div class="font-medium text-white">${s.customerEmail}</div>
            <div class="text-sm text-gray-400">${s.customerDiscordId}</div>
          </div>
        </td>
        <td class="px-6 py-4">
          <div class="text-sm">
            ${s.items.map(o=>`${o.productName} (x${o.quantity})`).join(", ")}
          </div>
        </td>
        <td class="px-6 py-4">$${(s.totalAmount/100).toFixed(2)}</td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full ${this.getOrderStatusColor(s.status)}">${s.status}</span>
        </td>
        <td class="px-6 py-4">
          <button class="p-1 text-gray-400 hover:text-white mr-2" title="View Details"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/></svg></button>
          ${s.status==="completed"?'<button class="p-1 text-gray-400 hover:text-white" title="Refund"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/></svg></button>':""}
        </td>
      </tr>
    `).join("")}}updateStoreCustomersTable(t){const e=this.container.querySelector("#store-customers-table-body");if(e){if(t.length===0){e.innerHTML='<tr><td colspan="5" class="text-center py-8">No customers found.</td></tr>';return}e.innerHTML=t.map(s=>`
      <tr class="border-b border-gray-700 hover:bg-white/5">
        <td class="px-6 py-4 font-mono text-sm">${s.discordId}</td>
        <td class="px-6 py-4">${s.email}</td>
        <td class="px-6 py-4">$${(s.totalSpent/100).toFixed(2)}</td>
        <td class="px-6 py-4">${s.orderCount}</td>
        <td class="px-6 py-4">
          <button class="p-1 text-gray-400 hover:text-white" title="View Details"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/></svg></button>
        </td>
      </tr>
    `).join("")}}updateStorePromoCodesTable(t){const e=this.container.querySelector("#store-promocodes-table-body");if(e){if(t.length===0){e.innerHTML='<tr><td colspan="6" class="text-center py-8">No promo codes found.</td></tr>';return}e.innerHTML=t.map(s=>`
      <tr class="border-b border-gray-700 hover:bg-white/5">
        <td class="px-6 py-4 font-mono text-sm">${s.code}</td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full bg-discord-blurple/50">${s.type}</span>
        </td>
        <td class="px-6 py-4">
          ${s.type==="percent"?`${s.value}%`:`$${(s.value/100).toFixed(2)}`}
        </td>
        <td class="px-6 py-4">${s.currentUses}/${s.maxUses||"∞"}</td>
        <td class="px-6 py-4">
          <span class="px-2 py-1 text-xs rounded-full ${s.active?"bg-discord-green/50":"bg-discord-red/50"}">${s.active?"Active":"Inactive"}</span>
        </td>
        <td class="px-6 py-4">
          <button class="p-1 text-gray-400 hover:text-white mr-2" title="Edit"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/></svg></button>
          <button class="p-1 text-gray-400 hover:text-white" title="Delete"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/></svg></button>
        </td>
      </tr>
    `).join("")}}updateStoreAnalyticsTab(t){const e=this.container.querySelector("#store-top-products-list");e&&(e.innerHTML=t.topProducts.map(o=>`
        <div class="flex justify-between items-center p-3 bg-discord-dark/50 rounded-lg">
          <div>
            <div class="font-medium text-white">${o.productName}</div>
            <div class="text-sm text-gray-400">${o.sales} sales</div>
          </div>
          <div class="text-right">
            <div class="font-medium text-white">$${(o.revenue/100).toFixed(2)}</div>
          </div>
        </div>
      `).join(""));const s=this.container.querySelector("#store-recent-orders-list");s&&(s.innerHTML=t.recentOrders.map(o=>`
        <div class="flex justify-between items-center p-3 bg-discord-dark/50 rounded-lg">
          <div>
            <div class="font-medium text-white">${o.customerEmail}</div>
            <div class="text-sm text-gray-400">${new Date(o.createdAt).toLocaleDateString()}</div>
          </div>
          <div class="text-right">
            <div class="font-medium text-white">$${(o.totalAmount/100).toFixed(2)}</div>
            <div class="text-sm text-gray-400">${o.status}</div>
          </div>
        </div>
      `).join(""))}getOrderStatusColor(t){switch(t){case"completed":return"bg-discord-green/50";case"pending":return"bg-discord-yellow/50";case"cancelled":return"bg-discord-red/50";case"refunded":return"bg-gray-500/50";default:return"bg-gray-500/50"}}async toggleStoreStatus(t){try{if(!(await fetch(`/api/storefronts/toggle?guildId=${t}`,{method:"POST"})).ok)throw new Error("Failed to toggle store status");await this.loadStorefrontData(t),this.showNotification("Store status updated successfully")}catch(e){console.error("Failed to toggle store status:",e),this.showNotification("Failed to update store status","error")}}async saveStoreSettings(t){var e,s,o,a,l,r,i;try{const d={name:(e=this.container.querySelector("#store-name"))==null?void 0:e.value,customUrl:(s=this.container.querySelector("#store-url"))==null?void 0:s.value,description:(o=this.container.querySelector("#store-description"))==null?void 0:o.value,currency:(a=this.container.querySelector("#store-currency"))==null?void 0:a.value,paymentProcessor:(l=this.container.querySelector("#store-processor"))==null?void 0:l.value,tos:(r=this.container.querySelector("#store-tos"))==null?void 0:r.value,refundPolicy:(i=this.container.querySelector("#store-refund-policy"))==null?void 0:i.value};if(!(await fetch(`/api/storefronts/settings?guildId=${t}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)})).ok)throw new Error("Failed to save store settings");this.showNotification("Store settings saved successfully")}catch(d){console.error("Failed to save store settings:",d),this.showNotification("Failed to save store settings","error")}}showAddProductModal(t){this.showNotification("Product creation modal would open here")}showAddPromoModal(t){this.showNotification("Promo code creation modal would open here")}async filterOrders(t,e){console.log(`Filtering orders by status: ${e}`)}async loadStorefrontData(t){try{const e=await this.fetchStorefront(t);e&&this.updateStorefrontUI(e);const s=await this.fetchStorefrontAnalytics(t);s&&this.updateStorefrontStats(s),this.loadStorefrontTabData(t,"setup")}catch(e){console.error("Failed to load storefront data:",e)}}}class L{constructor(t){p(this,"container");this.container=t,this.render()}render(){this.container.innerHTML=`
      <div class="min-h-screen bg-gradient-to-b from-[#6366f1] to-[#4f46e5]">
        <!-- Navigation -->
        <nav class="px-6 py-4">
          <div class="container mx-auto flex justify-between items-center">
            <div class="flex items-center">
              <img src="/Velari_Logo.png" alt="Velari Logo" class="h-12 w-12 rounded-full"/>
              <span class="ml-3 text-2xl font-bold text-white">Velari</span>
            </div>
            <button id="add-to-server" class="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold py-2 px-6 rounded-lg transition-colors">
              Add to Your Server
            </button>
          </div>
        </nav>

        <!-- Hero Section -->
        <div class="container mx-auto px-6 py-20">
          <div class="text-center">
            <div class="flex justify-center mb-8">
              <img src="/Velari_Logo.png" alt="Velari Logo" class="h-24 w-24 rounded-full shadow-lg"/>
            </div>
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
              The Ultimate Discord Bot for Your Community
            </h1>
            <p class="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
              Enhance your Discord server with powerful moderation tools, engaging games, and customizable features that bring your community together.
            </p>
            <button id="hero-cta" class="bg-white text-indigo-600 hover:bg-indigo-50 text-lg font-semibold py-3 px-8 rounded-lg transition-colors">
              Get Started Free
            </button>
          </div>
        </div>

        <!-- Features Section -->
        <div class="container mx-auto px-6 py-20">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div class="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <div class="text-white text-4xl mb-4">🛡️</div>
              <h3 class="text-2xl font-bold text-white mb-4">Smart Moderation</h3>
              <p class="text-white/90">Automated moderation tools to keep your server safe and welcoming for everyone.</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <div class="text-white text-4xl mb-4">🎮</div>
              <h3 class="text-2xl font-bold text-white mb-4">Fun Games</h3>
              <p class="text-white/90">Engage your community with interactive games and challenges that bring people together.</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <div class="text-white text-4xl mb-4">⚙️</div>
              <h3 class="text-2xl font-bold text-white mb-4">Custom Commands</h3>
              <p class="text-white/90">Create and customize commands to match your server's unique needs and style.</p>
            </div>
          </div>
        </div>
      </div>
    `;const t=this.container.querySelector("#add-to-server"),e=this.container.querySelector("#hero-cta");t&&e&&(t.addEventListener("click",()=>this.handleAddToServer()),e.addEventListener("click",()=>this.handleAddToServer()))}handleAddToServer(){window.location.href="/auth"}}class C{constructor(t){p(this,"container");p(this,"discordAPI");this.container=t,this.discordAPI=new x,this.init()}init(){const t=window.location.pathname,e=localStorage.getItem("discord_token");t==="/auth"?this.showWelcome():e?this.showDashboard():this.showLandingPage()}showLandingPage(){this.clearContainer(),new L(this.container)}showWelcome(){this.clearContainer(),new k(this.container)}showDashboard(){this.clearContainer(),new $(this.container,this.discordAPI,()=>{this.showWelcome()})}clearContainer(){this.container.innerHTML=""}}class y{static async handleCallback(){const t=new URLSearchParams(window.location.search),e=t.get("code"),s=t.get("error");if(s)return console.error("OAuth error:",s),!1;if(!e)return!1;try{const o=await this.discordAPI.exchangeCodeForToken(e);return localStorage.setItem("discord_token",o.access_token),window.history.replaceState({},document.title,window.location.pathname),!0}catch(o){return console.error("Failed to exchange code for token:",o),!1}}static isAuthenticated(){return!!localStorage.getItem("discord_token")}static logout(){localStorage.removeItem("discord_token"),window.location.href="/"}static getToken(){return localStorage.getItem("discord_token")}}p(y,"discordAPI",new x);async function f(){const u=document.getElementById("root");if(!u){console.error("Root element not found");return}if(new URLSearchParams(window.location.search).has("code"))if(await y.handleCallback()){window.location.href="/";return}else{alert("Authentication failed. Please try again."),window.location.href="/";return}new C(u)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",f):f();
//# sourceMappingURL=index-Bro1UmNa.js.map
