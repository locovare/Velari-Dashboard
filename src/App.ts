import { WelcomeScreen } from './components/WelcomeScreen'
import { Dashboard } from './components/Dashboard'
import { DiscordAPI } from './services/DiscordAPI'

export class App {
  private container: HTMLElement
  private currentScreen: WelcomeScreen | Dashboard | null = null
  private discordAPI: DiscordAPI

  constructor(container: HTMLElement) {
    this.container = container
    this.discordAPI = new DiscordAPI()
    this.init()
  }

  private init(): void {
    // Check if user is already authenticated
    const token = localStorage.getItem('discord_token')
    if (token) {
      this.showDashboard()
    } else {
      this.showWelcome()
    }
  }

  public showWelcome(): void {
    this.clearContainer()
    this.currentScreen = new WelcomeScreen(this.container, () => {
      this.showDashboard()
    })
  }

  public showDashboard(): void {
    this.clearContainer()
    this.currentScreen = new Dashboard(this.container, this.discordAPI, () => {
      this.showWelcome()
    })
  }

  private clearContainer(): void {
    this.container.innerHTML = ''
  }
} 