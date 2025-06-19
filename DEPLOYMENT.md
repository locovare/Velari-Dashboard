# Deployment Guide for Velari Dashboard

## 🚀 Production Deployment

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/velari-dashboard.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables in Vercel dashboard:
     - `VITE_DISCORD_CLIENT_ID`
     - `VITE_DISCORD_CLIENT_SECRET`
     - `VITE_DISCORD_BOT_CLIENT_ID`
     - `VITE_DISCORD_REDIRECT_URI` (update to your Vercel domain)

3. **Update Discord OAuth**
   - Go to Discord Developer Portal
   - Update redirect URI to: `https://your-app.vercel.app/callback`

### Option 2: Netlify

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist/` folder
   - Set environment variables in Netlify dashboard
   - Update redirect URI in Discord Developer Portal

### Option 3: Custom Server

1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Serve with Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /path/to/velari-dashboard/dist;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

3. **Serve with Node.js**
   ```bash
   npm install -g serve
   serve -s dist -l 3000
   ```

## 🔧 Environment Variables

Create a `.env` file in production:

```env
VITE_DISCORD_CLIENT_ID=your_production_client_id
VITE_DISCORD_CLIENT_SECRET=your_production_client_secret
VITE_DISCORD_BOT_CLIENT_ID=your_production_bot_client_id
VITE_DISCORD_REDIRECT_URI=https://your-domain.com/callback
```

## 🔒 Security Considerations

1. **HTTPS Only**: Always use HTTPS in production
2. **Environment Variables**: Never commit `.env` files
3. **CORS**: Configure proper CORS policies
4. **Rate Limiting**: Implement rate limiting for API calls
5. **Token Storage**: Consider server-side token storage for production

## 📊 Monitoring

- Set up error tracking (Sentry, LogRocket)
- Monitor API rate limits
- Track user engagement metrics
- Set up uptime monitoring

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🐛 Troubleshooting

**Build Errors**
- Check TypeScript compilation
- Verify all dependencies are installed
- Ensure environment variables are set

**OAuth Issues**
- Verify redirect URIs match exactly
- Check client ID and secret
- Ensure Discord app has correct scopes

**Performance Issues**
- Enable gzip compression
- Use CDN for static assets
- Optimize images and bundle size

## 📈 Analytics

Consider adding analytics to track usage:

```typescript
// Google Analytics
import { gtag } from 'gtag'

// Track page views
gtag('config', 'GA_MEASUREMENT_ID')

// Track custom events
gtag('event', 'bot_invited', {
  server_id: guildId,
  server_name: guildName
})
```

## 🔄 Updates

To update the dashboard:

1. Pull latest changes
2. Update dependencies: `npm update`
3. Test locally: `npm run dev`
4. Build: `npm run build`
5. Deploy to production

## 📞 Support

For deployment issues:
- Check Vercel/Netlify logs
- Verify environment variables
- Test OAuth flow locally first
- Review Discord Developer Portal settings 