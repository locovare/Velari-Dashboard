import '../style.css'

export class LandingPage {
  private container: HTMLElement

  constructor(container: HTMLElement) {
    this.container = container
    this.render()
  }

  private render() {
    this.container.innerHTML = `
      <div class="min-h-screen bg-gradient-to-b from-[#6366f1] to-[#4f46e5]">
        <!-- Navigation -->
        <nav class="px-6 py-4">
          <div class="container mx-auto flex justify-between items-center">
            <div class="flex items-center">
              <img src="@Velari_Logo.png" alt="Velari Logo" class="h-12 w-12 rounded-full"/>
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
              <img src="@Velari_Logo.png" alt="Velari Logo" class="h-24 w-24 rounded-full shadow-lg"/>
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
    `

    // Add event listeners
    const addToServerBtn = this.container.querySelector('#add-to-server')
    const heroCta = this.container.querySelector('#hero-cta')
    
    if (addToServerBtn && heroCta) {
      addToServerBtn.addEventListener('click', () => this.handleAddToServer())
      heroCta.addEventListener('click', () => this.handleAddToServer())
    }
  }

  private handleAddToServer() {
    // Redirect to the login/auth page
    window.location.href = '/auth'
  }
} 