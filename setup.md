# Quick Setup Guide for Velari Dashboard

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
Copy `env.example` to `.env` and fill in your Discord credentials:
```bash
cp env.example .env
```

### 3. Get Discord Credentials
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application or select your existing one
3. Go to "OAuth2" → "General"
4. Copy your Client ID and Client Secret
5. Add `http://localhost:3000/callback` to Redirects

### 4. Update .env File
```env
VITE_DISCORD_CLIENT_ID=your_client_id_here
VITE_DISCORD_CLIENT_SECRET=your_client_secret_here
VITE_DISCORD_BOT_CLIENT_ID=your_bot_client_id_here
VITE_DISCORD_REDIRECT_URI=http://localhost:3000/callback
```

### 5. Start Development Server
```bash
npm run dev
```

### 6. Open Your Browser
Navigate to `http://localhost:3000`

## 🎉 You're Done!

Your Velari dashboard should now be running with:
- ✅ Discord OAuth login
- ✅ Server list display
- ✅ Bot invitation functionality
- ✅ Modern, responsive UI

## 🔧 Troubleshooting

**"Authentication failed" error?**
- Check your Client ID and Secret in `.env`
- Verify redirect URI matches Discord Developer Portal
- Ensure your Discord app has OAuth2 enabled

**"Cannot find module" errors?**
- Run `npm install` again
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**Port 3000 already in use?**
- Change the port in `vite.config.ts` or kill the process using port 3000

## 📚 Next Steps

- Customize the bot permissions in `DiscordAPI.ts`
- Add more features to the dashboard
- Deploy to production (see README.md for deployment options) 