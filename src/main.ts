import './style.css'
import { App } from './App'
import { AuthUtils } from './utils/auth'

async function initApp() {
  const root = document.getElementById('root')
  if (!root) {
    console.error('Root element not found')
    return
  }

  // Check if this is an OAuth callback
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.has('code')) {
    // Handle OAuth callback
    const success = await AuthUtils.handleCallback()
    if (success) {
      // Redirect to dashboard after successful authentication
      window.location.href = '/'
      return
    } else {
      // Show error and redirect to welcome
      alert('Authentication failed. Please try again.')
      window.location.href = '/'
      return
    }
  }

  // Initialize the main application
  new App(root)
}

// Initialize the application when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp)
} else {
  initApp()
} 