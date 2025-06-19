import { WelcomeScreen } from './components/WelcomeScreen'
import { Dashboard } from './components/Dashboard'
import { DiscordAPI } from './services/DiscordAPI'

export class App {
  private container: HTMLElement
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
    new WelcomeScreen(this.container)
  }

  public showDashboard(): void {
    this.clearContainer()
    new Dashboard(this.container, this.discordAPI, () => {
      this.showWelcome()
    })
  }

  private clearContainer(): void {
    this.container.innerHTML = ''
  }
} 