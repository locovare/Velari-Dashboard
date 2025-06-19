# Velari Discord Bot Dashboard

A modern, responsive dashboard for managing your Discord bot Velari. Built with HTML, Tailwind CSS, and TypeScript.

## Features

- 🔐 **Discord OAuth Integration** - Secure login with Discord
- 🖥️ **Modern UI** - Beautiful, responsive design with glass morphism effects
- 📊 **Server Management** - View all your Discord servers
- 🤖 **Bot Invitation** - One-click bot invitation to your servers
- 📱 **Mobile Responsive** - Works perfectly on all devices
- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance

## Screenshots

### Welcome Screen
- Clean, modern welcome page with Discord OAuth login
- Feature highlights and branding

### Dashboard
- User profile display
- Server statistics
- Server list with invite functionality
- Real-time data refresh

## Tech Stack

- **Frontend**: HTML5, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom Discord theme
- **Authentication**: Discord OAuth 2.0

## Prerequisites

Before running this dashboard, you need:

1. A Discord Application (Bot) created at [Discord Developer Portal](https://discord.com/developers/applications)
2. Your bot's Client ID and Client Secret
3. Node.js (v16 or higher)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd velari-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Discord OAuth

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application or select your existing one
3. Go to the "OAuth2" section
4. Add `http://localhost:3000/callback` to the redirect URLs
5. Copy your Client ID and Client Secret

### 4. Update Configuration

Edit `src/services/DiscordAPI.ts` and replace the placeholder values:

```typescript
private readonly CLIENT_ID = 'YOUR_DISCORD_CLIENT_ID' // Replace with your client ID
private readonly BOT_CLIENT_ID = 'YOUR_BOT_CLIENT_ID' // Replace with your bot's client ID
// In the exchangeCodeForToken method, replace:
client_secret: 'YOUR_CLIENT_SECRET', // Replace with your client secret
```

### 5. Start Development Server

```bash
npm run dev
```

The dashboard will be available at `http://localhost:3000`

## Project Structure

```
velari-dashboard/
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.ts    # Welcome page with OAuth login
│   │   └── Dashboard.ts        # Main dashboard component
│   ├── services/
│   │   └── DiscordAPI.ts       # Discord API integration
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   ├── utils/
│   │   └── auth.ts            # Authentication utilities
│   ├── App.ts                 # Main application class
│   ├── main.ts               # Application entry point
│   └── style.css             # Global styles and Tailwind imports
├── index.html                # Main HTML file
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite build configuration
```

## Environment Variables

For production deployment, consider using environment variables for sensitive data:

```bash
VITE_DISCORD_CLIENT_ID=your_client_id
VITE_DISCORD_CLIENT_SECRET=your_client_secret
VITE_DISCORD_BOT_CLIENT_ID=your_bot_client_id
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Netlify

1. Build the project: `npm run build`
2. Upload the `dist/` folder to Netlify
3. Set environment variables in Netlify dashboard

### Custom Server

1. Build the project: `npm run build`
2. Serve the `dist/` folder with your web server
3. Ensure your server handles client-side routing

## API Endpoints

The dashboard uses Discord's OAuth2 API endpoints:

- `GET /api/oauth2/authorize` - OAuth authorization
- `POST /api/oauth2/token` - Token exchange
- `GET /api/users/@me` - Get user info
- `GET /api/users/@me/guilds` - Get user's guilds

## Security Considerations

- Never expose your client secret in client-side code
- Use environment variables for sensitive data
- Implement proper CORS policies
- Consider rate limiting for API calls
- Validate all user inputs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Discord Developer Documentation](https://discord.com/developers/docs)
2. Review the browser console for error messages
3. Ensure your OAuth configuration is correct
4. Verify your bot has the necessary permissions

## Changelog

### v1.0.0
- Initial release
- Discord OAuth integration
- Server management dashboard
- Bot invitation functionality
- Responsive design
- TypeScript implementation 