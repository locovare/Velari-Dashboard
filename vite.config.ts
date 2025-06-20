import { defineConfig } from 'vite'
import { corsMiddleware } from './src/middleware/cors'
import path from 'path'
import dotenv from 'dotenv'
import { BotSettings, AutoRolesSettings, ReactionRoleMenu, ServerAnalytics, PermissionSettings, LicenseKey, KeyRedemptionLog, Product, Subscription, Transaction, Customer, SalesAnalytics, Storefront, StoreProduct, StoreOrder, StoreCustomer, PromoCode, StoreAnalytics } from './src/types'

// Load environment variables
dotenv.config()

// A simple hash function to generate deterministic mock data
const simpleHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 5173,
    strictPort: false,
    cors: true,
    proxy: {
      // We are handling /api calls manually in the middleware below
      // so we don't need a proxy for it.
      // Leaving this empty for now, but could be used for other proxies.
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  plugins: [
    {
      name: 'configure-server',
      configureServer(server) {
        // Add CORS middleware
        server.middlewares.use(corsMiddleware())
        
        // Add body-parser middleware
        server.middlewares.use((req, res, next) => {
          if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                (req as any).body = JSON.parse(body);
              } catch (e) {
                (req as any).body = {};
              }
              next();
            });
          } else {
            next();
          }
        });

        // Mock API Endpoints
        server.middlewares.use(async (req, res, next) => {
          if (!req.url) {
            return next();
          }

          if (req.url.startsWith('/api/check-bot-in-guild')) {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const guildId = url.searchParams.get('guildId');
            const botToken = process.env.VITE_DISCORD_BOT_TOKEN;

            if (!guildId || !botToken) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ inGuild: false, error: 'Missing required parameters' }));
              return;
            }

            try {
              const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}`, {
                headers: {
                  Authorization: `Bot ${botToken}`,
                },
              });

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ inGuild: response.ok }));
            } catch (error) {
              console.error('Error checking bot status:', error);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ inGuild: false, error: 'Failed to check bot status' }));
            }
            return;
          }

          if (req.url.startsWith('/api/server-stats')) {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const guildId = url.searchParams.get('guildId');
            const botToken = process.env.VITE_DISCORD_BOT_TOKEN;

            if (!guildId) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Missing guildId' }));
              return;
            }

            // Mock non-essential data
            const hash = simpleHash(guildId);
            const commandsUsed = (hash % 9501) + 500;
            const uptime = '99.9%';
            let memberCount = (hash % 20000) + 500; // Default mock member count

            if (botToken) {
              try {
                const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, {
                  headers: {
                    Authorization: `Bot ${botToken}`,
                  },
                });

                if (response.ok) {
                  const guildData = await response.json();
                  if (guildData.approximate_member_count) {
                    memberCount = guildData.approximate_member_count;
                  }
                }
              } catch (error) {
                console.error('Failed to fetch real member count, using mock data.', error);
              }
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              memberCount,
              uptime,
              commandsUsed,
            }));
            return;
          }

          if (req.url.startsWith('/api/activity-logs')) {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const guildId = url.searchParams.get('guildId') || '0';
            const hash = simpleHash(guildId);
            
            const user1 = `User#${1000 + (hash % 9000)}`;
            const user2 = `User#${1000 + (Math.floor(hash / 2)) % 9000}`;
            const command = ['!play', '!kick', '!ban', '!mute', '!poll'][(hash % 5)];

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify([
              { timestamp: new Date().toISOString(), type: 'success', message: `${user1} joined the server.` },
              { timestamp: new Date(Date.now() - 60000 * 5).toISOString(), type: 'warning', message: 'High CPU usage detected.' },
              { timestamp: new Date(Date.now() - 60000 * 10).toISOString(), type: 'success', message: 'Bot was restarted successfully.' },
              { timestamp: new Date(Date.now() - 60000 * 15).toISOString(), type: 'error', message: `Failed to process command ${command} from ${user2}.` }
            ]));
            return;
          }

          if (req.url.startsWith('/api/toggle-module')) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
            return;
          }

          if (req.url.startsWith('/api/guild-channels')) {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const guildId = url.searchParams.get('guildId') || '0';
            const hash = simpleHash(guildId);
            const channelNames = ['general', 'welcome', 'announcements', 'lounge', 'support', 'transcripts'];
            const channels = channelNames.map((name, i) => ({
              id: `${(hash + i)}`,
              name: `${name}`,
              type: 0 // Text channel
            }));

            // Add some categories
            const categoryNames = ['Support Tickets', 'User Reports', 'Staff Area'];
            const categories = categoryNames.map((name, i) => ({
                id: `cat-${(hash + i)}`,
                name: name,
                type: 4 // Category
            }));

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify([...channels, ...categories]));
            return;
          }

          if (req.url.startsWith('/api/guild-roles')) {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const guildId = url.searchParams.get('guildId') || '0';
            const hash = simpleHash(guildId);
            const roleNames = ['Member', 'Moderator', 'Admin', 'VIP', 'Newbie'];
            const roles = roleNames.map((name, i) => ({
              id: `${(hash + i)}`,
              name: `${name}`,
              color: Math.floor(hash / (i+1)) % 16777215,
            }));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(roles));
            return;
          }

          if (req.url.startsWith('/api/moderation-settings')) {
            if (req.method === 'POST') {
              // Simulate saving the settings
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, message: 'Moderation settings saved!' }));
              return;
            }
            // GET request
            const url = new URL(req.url, `http://${req.headers.host}`);
            const guildId = url.searchParams.get('guildId') || '0';
            const hash = simpleHash(guildId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              logChannelId: `${(hash + 5)}`,
              muteRoleId: `${(hash)}`,
              antiSpamEnabled: hash % 2 === 0,
              raidProtectionEnabled: hash % 3 === 0,
              bannedWords: ['badword', 'spam', 'unallowed'],
              strikeActions: {
                '3': 'timeout-10m',
                '5': 'ban'
              }
            }));
            return;
          }

          if (req.url.startsWith('/api/ticket-settings')) {
            if (req.method === 'POST') {
              // Simulate saving the settings
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, message: 'Ticket settings saved!' }));
              return;
            }
            // GET request
            const url = new URL(req.url, `http://${req.headers.host}`);
            const guildId = url.searchParams.get('guildId') || '0';
            const hash = simpleHash(guildId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              enabled: hash % 2 === 0,
              categoryId: `cat-${hash % 3}`,
              staffRoleIds: [`${(hash + 1)}`, `${(hash + 2)}`],
              reasons: [
                { id: 'reason-1', label: 'Bug Report', emoji: '🐛' },
                { id: 'reason-2', label: 'User Report', emoji: '👤' },
                { id: 'reason-3', label: 'General Support', emoji: '❓' }
              ],
              closeMessage: 'Your ticket has been reviewed and closed. Thank you!',
              transcriptsEnabled: hash % 2 !== 0,
              transcriptChannelId: `${(hash + 3)}`
            }));
            return;
          }

          if (req.url.startsWith('/api/welcome-settings')) {
            if (req.method === 'POST') {
              // Simulate saving the settings
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, message: 'Settings saved!' }));
              return;
            }
            // GET request
            const url = new URL(req.url, `http://${req.headers.host}`);
            const guildId = url.searchParams.get('guildId') || '0';
            const hash = simpleHash(guildId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              enabled: hash % 2 === 0,
              channelId: `${(hash)}`,
              dmEnabled: hash % 3 === 0,
              message: `Welcome {user} to ${guildId}! You're member #{memberCount}!`,
              bannerUrl: hash % 5 === 0 ? `https://picsum.photos/seed/${guildId}/800/200` : '',
              autoRoleIds: [`${(hash + 1)}`, `${(hash + 4)}`]
            }));
            return;
          }

          if (req.url.startsWith('/api/embed-templates')) {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const guildId = url.searchParams.get('guildId') || '0';
            const hash = simpleHash(guildId);
            
            if (req.method === 'POST') {
              // Simulate saving a template
              console.log('Saved embed template:', (req as any).body);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, message: 'Template saved!' }));
              return;
            }

            // GET request
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify([
              { id: `tpl-${hash}-1`, name: 'Welcome Embed' },
              { id: `tpl-${hash}-2`, name: 'Announcement' },
              { id: `tpl-${hash}-3`, name: 'Rules' }
            ]));
            return;
          }

          if (req.url.startsWith('/api/send-embed')) {
            if (req.method === 'POST') {
              // Simulate sending the embed
              console.log('Sending embed:', (req as any).body);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, message: 'Embed sent!' }));
              return;
            }
          }

          if (req.url.startsWith('/api/bot-settings')) {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const guildId = url.searchParams.get('guildId');

            if (!guildId) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'Missing guildId' }));
              return;
            }

            if (req.method === 'GET') {
              const seed = guildId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
              const settings: BotSettings = {
                prefix: '!',
                language: 'en-US',
                timezone: 'UTC',
                name: `Velari Bot ${seed % 100}`,
                avatar: `https://i.pravatar.cc/150?u=${guildId}`,
                commandWhitelist: ['play', 'skip', 'queue'],
                commandBlacklist: ['ban', 'kick']
              };
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(settings));
              return;
            }

            if (req.method === 'POST') {
              const body = (req as any).body;
              console.log(`[POST /api/bot-settings] Received for guild ${guildId}:`, body);
              // Here you would save the settings to a database
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, message: 'Bot settings saved successfully!' }));
              return;
            }
          }

          if (req.url.startsWith('/api/autoroles-settings')) {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const guildId = url.searchParams.get('guildId');

            if (!guildId) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Missing guildId' }));
                return;
            }

            if (req.method === 'GET') {
                const hash = simpleHash(guildId);
                const settings: AutoRolesSettings = {
                    autoRoleOnJoinEnabled: hash % 3 === 0,
                    autoRoleOnJoinId: `${(hash)}`,
                    reactionRoleMenus: [
                        {
                            id: `menu-${hash}-1`,
                            messageId: '123456789012345678',
                            channelId: `${hash + 1}`,
                            embedTitle: 'Get Your Roles!',
                            embedDescription: 'React to get your desired roles.',
                            embedColor: '#5865F2',
                            stackRoles: true,
                            removeOnUnreact: true,
                            roleLimit: 2,
                            mappings: [
                                { emoji: '🔴', roleId: `${hash + 2}` },
                                { emoji: '🟢', roleId: `${hash + 3}` },
                                { emoji: '🔵', roleId: `${hash + 4}` },
                            ]
                        }
                    ]
                };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(settings));
                return;
            }

            if (req.method === 'POST') {
                const body = (req as any).body;
                console.log(`[POST /api/autoroles-settings] Received for guild ${guildId}:`, body);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Auto roles settings saved!' }));
                return;
            }
          }

          if (req.url.startsWith('/api/analytics-and-logs')) {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const guildId = url.searchParams.get('guildId');

            if (!guildId) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Missing guildId' }));
                return;
            }
            
            const hash = simpleHash(guildId);
            const logs = [
                { id: `log-${hash}-1`, timestamp: new Date(Date.now() - 60000 * 2).toISOString(), userId: '267385848323375105', userTag: 'User#1234', type: 'moderation', action: 'Banned `AnotherUser#5678` for spam.' },
                { id: `log-${hash}-2`, timestamp: new Date(Date.now() - 60000 * 5).toISOString(), userId: '367385848323375106', userTag: 'Admin#0001', type: 'tickets', action: 'Closed ticket #1138 (`Bug Report`).' },
                { id: `log-${hash}-3`, timestamp: new Date(Date.now() - 60000 * 10).toISOString(), userId: '467385848323375107', userTag: 'NewUser#9999', type: 'joins_leaves', action: 'Joined the server.' },
                { id: `log-${hash}-4`, timestamp: new Date(Date.now() - 60000 * 12).toISOString(), userId: '567385848323375108', userTag: 'OldUser#0002', type: 'joins_leaves', action: 'Left the server.' },
                { id: `log-${hash}-5`, timestamp: new Date(Date.now() - 60000 * 15).toISOString(), userId: '267385848323375105', userTag: 'User#1234', type: 'messages', action: 'Deleted a message in #general.' },
            ];

            const analytics: ServerAnalytics = {
                serverGrowth: `${(hash % 15) + 1}%`,
                engagement: `${(hash % 40) + 50}%`,
                topCommand: ['/play', '/kick', '/ban', '/poll', '/help'][hash % 5],
                logs: logs
            };
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(analytics));
            return;
          }

          if (req.url.startsWith('/api/permissions')) {
              const url = new URL(req.url, `http://${req.headers.host}`);
              const guildId = url.searchParams.get('guildId');
              const roleId = url.searchParams.get('roleId');

              if (!guildId) {
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ message: 'Missing guildId' }));
                  return;
              }

              if (req.method === 'GET') {
                  if (!roleId) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Missing roleId' }));
                    return;
                  }
                  
                  const hash = simpleHash(guildId + roleId);
                  const settings: PermissionSettings = {
                      roleId: roleId,
                      dashboardAccess: hash % 4 === 0, // Admins get access
                      modules: {
                          welcome: hash % 2 === 0,
                          tickets: hash % 2 === 0,
                          moderation: hash % 3 === 0,
                          autoroles: hash % 2 === 0,
                      },
                      allowedCommands: ['play', 'skip', 'queue', 'help'],
                      deniedCommands: ['ban', 'kick']
                  };
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify(settings));
                  return;
              }

              if (req.method === 'POST') {
                  const body = (req as any).body;
                  console.log(`[POST /api/permissions] Received for guild ${guildId}:`, body);
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: true, message: 'Permissions saved!' }));
                  return;
              }
          }

          if (req.url.startsWith('/api/key-management')) {
              const url = new URL(req.url, `http://${req.headers.host}`);
              const guildId = url.searchParams.get('guildId');

              if (!guildId) {
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ message: 'Missing guildId' }));
                  return;
              }

              if (req.method === 'GET') {
                  const hash = simpleHash(guildId);
                  const keys: LicenseKey[] = [
                      { id: `key-${hash}-1`, key: `VELARI-${hash}-PREM`, type: 'Premium', unlocks: 'All Modules', status: 'Redeemed', expiry: null, uses: 1, maxUses: 1, redeemedBy: '267385848323375105', redeemedAt: new Date().toISOString() },
                      { id: `key-${hash}-2`, key: `VELARI-${hash}-TRIAL`, type: 'Trial', unlocks: 'Ticket System', status: 'Active', expiry: new Date(Date.now() + 86400000 * 7).toISOString(), uses: 0, maxUses: 1, redeemedBy: null, redeemedAt: null },
                      { id: `key-${hash}-3`, key: `VELARI-${hash}-CUSTOM`, type: 'Custom', unlocks: 'VIP Role', status: 'Expired', expiry: new Date(Date.now() - 86400000).toISOString(), uses: 1, maxUses: 1, redeemedBy: '367385848323375106', redeemedAt: null },
                  ];
                  const logs: KeyRedemptionLog[] = [
                      { id: `klog-${hash}-1`, timestamp: new Date().toISOString(), key: `VELARI-${hash}-PREM`, userId: '267385848323375105', userTag: 'User#1234', status: 'Success' },
                      { id: `klog-${hash}-2`, timestamp: new Date(Date.now() - 60000 * 20).toISOString(), key: `FAKE-KEY`, userId: '467385848323375107', userTag: 'Someone#9999', status: 'Failed: Invalid Key' },
                  ];
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ keys, logs }));
                  return;
              }
              
              if (req.method === 'POST') {
                  // This could be creating or redeeming a key
                  console.log(`[POST /api/key-management] Received for guild ${guildId}:`, (req as any).body);
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: true, message: 'Action completed successfully!' }));
                  return;
              }
          }

          if (req.url.startsWith('/api/store')) {
              const url = new URL(req.url, `http://${req.headers.host}`);
              const path = url.pathname.replace('/api/store', '');
              const hash = simpleHash('store'); // Use consistent hash for store data

              if (req.method === 'GET') {
                  if (path === '/products') {
                      const products: Product[] = [
                          { id: `prod-${hash}-1`, name: 'Velari Premium', description: 'Full access to all premium features', type: 'monthly', price: 999, currency: 'USD', features: ['All Modules', 'Priority Support', 'Custom Branding'], active: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
                          { id: `prod-${hash}-2`, name: 'Premium Key Bundle', description: '10 premium license keys', type: 'one-time', price: 4999, currency: 'USD', features: ['10 Premium Keys', 'Bulk Discount'], active: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
                          { id: `prod-${hash}-3`, name: 'Custom Bot Setup', description: 'Professional bot setup service', type: 'one-time', price: 19999, currency: 'USD', features: ['Custom Configuration', 'Migration Support', 'Training Session'], active: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
                      ];
                      res.writeHead(200, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify(products));
                      return;
                  }

                  if (path === '/subscriptions') {
                      const subscriptions: Subscription[] = [
                          { id: `sub-${hash}-1`, customerId: `cust-${hash}-1`, productId: `prod-${hash}-1`, status: 'active', currentPeriodStart: new Date().toISOString(), currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), cancelAtPeriodEnd: false, createdAt: new Date().toISOString() },
                          { id: `sub-${hash}-2`, customerId: `cust-${hash}-2`, productId: `prod-${hash}-1`, status: 'cancelled', currentPeriodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), currentPeriodEnd: new Date().toISOString(), cancelAtPeriodEnd: true, createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() },
                      ];
                      res.writeHead(200, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify(subscriptions));
                      return;
                  }

                  if (path === '/transactions') {
                      const transactions: Transaction[] = [
                          { id: `txn-${hash}-1`, customerId: `cust-${hash}-1`, productId: `prod-${hash}-1`, amount: 999, currency: 'USD', status: 'completed', paymentProvider: 'stripe', checkoutSessionId: 'cs_test_123', createdAt: new Date().toISOString() },
                          { id: `txn-${hash}-2`, customerId: `cust-${hash}-2`, productId: `prod-${hash}-2`, amount: 4999, currency: 'USD', status: 'completed', paymentProvider: 'paypal', createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
                          { id: `txn-${hash}-3`, customerId: `cust-${hash}-3`, productId: `prod-${hash}-1`, amount: 999, currency: 'USD', status: 'refunded', paymentProvider: 'stripe', refundedAt: new Date().toISOString(), refundAmount: 999, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
                      ];
                      res.writeHead(200, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify(transactions));
                      return;
                  }

                  if (path === '/customers') {
                      const customers: Customer[] = [
                          { id: `cust-${hash}-1`, email: 'john@example.com', name: 'John Doe', discordId: '123456789', totalSpent: 2997, subscriptionCount: 1, createdAt: new Date().toISOString(), lastPurchaseAt: new Date().toISOString() },
                          { id: `cust-${hash}-2`, email: 'jane@example.com', name: 'Jane Smith', discordId: '987654321', totalSpent: 4999, subscriptionCount: 0, createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), lastPurchaseAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
                          { id: `cust-${hash}-3`, email: 'bob@example.com', name: 'Bob Johnson', discordId: '456789123', totalSpent: 999, subscriptionCount: 0, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), lastPurchaseAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
                      ];
                      res.writeHead(200, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify(customers));
                      return;
                  }

                  if (path === '/analytics') {
                      const analytics: SalesAnalytics = {
                          totalRevenue: 8995,
                          monthlyRevenue: 1998,
                          totalTransactions: 3,
                          activeSubscriptions: 1,
                          topProducts: [
                              { productId: `prod-${hash}-1`, productName: 'Velari Premium', sales: 2, revenue: 1998 },
                              { productId: `prod-${hash}-2`, productName: 'Premium Key Bundle', sales: 1, revenue: 4999 },
                          ],
                          recentTransactions: [
                              { id: `txn-${hash}-1`, customerId: `cust-${hash}-1`, productId: `prod-${hash}-1`, amount: 999, currency: 'USD', status: 'completed', paymentProvider: 'stripe', createdAt: new Date().toISOString() },
                              { id: `txn-${hash}-2`, customerId: `cust-${hash}-2`, productId: `prod-${hash}-2`, amount: 4999, currency: 'USD', status: 'completed', paymentProvider: 'paypal', createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
                          ]
                      };
                      res.writeHead(200, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify(analytics));
                      return;
                  }
              }

              if (req.method === 'POST') {
                  console.log(`[POST /api/store${path}] Received:`, (req as any).body);
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: true, message: 'Action completed successfully!' }));
                  return;
              }
          }

          if (req.url.startsWith('/api/storefronts')) {
              const url = new URL(req.url, `http://${req.headers.host}`);
              const path = url.pathname.replace('/api/storefronts', '');
              const guildId = url.searchParams.get('guildId');
              const hash = simpleHash(guildId || 'storefront');

              if (req.method === 'GET') {
                  if (path === '') {
                      // Get storefront for guild
                      const storefront: Storefront = {
                          id: `store-${hash}`,
                          guildId: guildId || '123456789',
                          name: 'My Awesome Store',
                          description: 'The best store for Discord roles and services!',
                          bannerUrl: 'https://example.com/banner.png',
                          customUrl: 'yourserver',
                          currency: 'USD',
                          paymentProcessor: 'stripe',
                          status: 'active',
                          tos: 'By purchasing from this store, you agree to our terms of service...',
                          refundPolicy: 'Refunds are available within 7 days of purchase...',
                          payoutDestination: {
                              type: 'paypal',
                              email: 'owner@example.com'
                          },
                          settings: {
                              requireApproval: false,
                              staffOnly: false,
                              enablePromoCodes: true,
                              enableSubscriptions: true,
                              autoAssignRoles: true,
                              dmConfirmations: true
                          },
                          createdAt: new Date().toISOString(),
                          updatedAt: new Date().toISOString()
                      };
                      res.writeHead(200, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify(storefront));
                      return;
                  }

                  if (path === '/products') {
                      const products: StoreProduct[] = [
                          { id: `prod-${hash}-1`, storefrontId: `store-${hash}`, name: 'VIP Role', description: 'Get exclusive VIP access', imageUrl: 'https://example.com/vip.png', type: 'role', price: 999, stock: null, tags: ['role', 'vip'], category: 'Roles', deliveryType: 'auto-role', deliveryData: { roleId: '123456789' }, visibility: 'public', requireApproval: false, active: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
                          { id: `prod-${hash}-2`, storefrontId: `store-${hash}`, name: 'Premium Key', description: 'Access to premium features', imageUrl: 'https://example.com/key.png', type: 'key', price: 1999, stock: 50, tags: ['key', 'premium'], category: 'Keys', deliveryType: 'dm-key', deliveryData: { keyTemplate: 'PREMIUM-{CODE}' }, visibility: 'public', requireApproval: false, active: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
                          { id: `prod-${hash}-3`, storefrontId: `store-${hash}`, name: 'Custom Artwork', description: 'Professional Discord artwork', imageUrl: 'https://example.com/art.png', type: 'file', price: 4999, stock: null, tags: ['file', 'art'], category: 'Services', deliveryType: 'file-download', deliveryData: { fileUrl: 'https://example.com/download/art.zip' }, visibility: 'public', requireApproval: true, active: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
                      ];
                      res.writeHead(200, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify(products));
                      return;
                  }

                  if (path === '/orders') {
                      const orders: StoreOrder[] = [
                          { id: `order-${hash}-1`, storefrontId: `store-${hash}`, customerId: `cust-${hash}-1`, customerDiscordId: '123456789', customerEmail: 'customer@example.com', items: [{ productId: `prod-${hash}-1`, productName: 'VIP Role', quantity: 1, price: 999 }], totalAmount: 999, currency: 'USD', status: 'completed', paymentProcessor: 'stripe', deliveryData: { rolesAssigned: ['123456789'], keysDelivered: [], filesDownloaded: [] }, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
                          { id: `order-${hash}-2`, storefrontId: `store-${hash}`, customerId: `cust-${hash}-2`, customerDiscordId: '987654321', customerEmail: 'another@example.com', items: [{ productId: `prod-${hash}-2`, productName: 'Premium Key', quantity: 1, price: 1999 }], totalAmount: 1999, currency: 'USD', status: 'pending', paymentProcessor: 'paypal', deliveryData: { rolesAssigned: [], keysDelivered: [], filesDownloaded: [] }, createdAt: new Date(Date.now() - 3600000).toISOString(), updatedAt: new Date(Date.now() - 3600000).toISOString() }
                      ];
                      res.writeHead(200, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify(orders));
                      return;
                  }

                  if (path === '/customers') {
                      const customers: StoreCustomer[] = [
                          { id: `cust-${hash}-1`, storefrontId: `store-${hash}`, discordId: '123456789', email: 'customer@example.com', totalSpent: 999, orderCount: 1, activeSubscriptions: 0, createdAt: new Date().toISOString(), lastPurchaseAt: new Date().toISOString() },
                          { id: `cust-${hash}-2`, storefrontId: `store-${hash}`, discordId: '987654321', email: 'another@example.com', totalSpent: 1999, orderCount: 1, activeSubscriptions: 0, createdAt: new Date(Date.now() - 86400000).toISOString(), lastPurchaseAt: new Date(Date.now() - 3600000).toISOString() }
                      ];
                      res.writeHead(200, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify(customers));
                      return;
                  }

                  if (path === '/promocodes') {
                      const promoCodes: PromoCode[] = [
                          { id: `promo-${hash}-1`, storefrontId: `store-${hash}`, code: 'WELCOME10', type: 'percent', value: 10, maxUses: 100, currentUses: 25, validFrom: new Date().toISOString(), validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), active: true, createdAt: new Date().toISOString() },
                          { id: `promo-${hash}-2`, storefrontId: `store-${hash}`, code: 'SAVE5', type: 'flat', value: 500, maxUses: 50, currentUses: 10, validFrom: new Date().toISOString(), validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), active: true, createdAt: new Date().toISOString() }
                      ];
                      res.writeHead(200, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify(promoCodes));
                      return;
                  }

                  if (path === '/subscriptions') {
                      const subscriptions: Subscription[] = [
                          { id: `sub-${hash}-1`, customerId: `cust-${hash}-1`, productId: `prod-${hash}-1`, status: 'active', currentPeriodStart: new Date().toISOString(), currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), cancelAtPeriodEnd: false, createdAt: new Date().toISOString() }
                      ];
                      res.writeHead(200, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify(subscriptions));
                      return;
                  }

                  if (path === '/analytics') {
                      const analytics: StoreAnalytics = {
                          totalRevenue: 2998,
                          monthlyRevenue: 999,
                          totalOrders: 2,
                          activeCustomers: 2,
                          topProducts: [
                              { productId: `prod-${hash}-1`, productName: 'VIP Role', sales: 1, revenue: 999 },
                              { productId: `prod-${hash}-2`, productName: 'Premium Key', sales: 1, revenue: 1999 }
                          ],
                          recentOrders: [
                              { id: `order-${hash}-1`, storefrontId: `store-${hash}`, customerId: `cust-${hash}-1`, customerDiscordId: '123456789', customerEmail: 'customer@example.com', items: [{ productId: `prod-${hash}-1`, productName: 'VIP Role', quantity: 1, price: 999 }], totalAmount: 999, currency: 'USD', status: 'completed', paymentProcessor: 'stripe', deliveryData: { rolesAssigned: ['123456789'], keysDelivered: [], filesDownloaded: [] }, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
                          ],
                          pendingPayouts: 999
                      };
                      res.writeHead(200, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify(analytics));
                      return;
                  }
              }

              if (req.method === 'POST') {
                  console.log(`[POST /api/storefronts${path}] Received:`, (req as any).body);
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: true, message: 'Action completed successfully!' }));
                  return;
              }
          }

          // Handle client-side routing fallback
          if (req.url.startsWith('/auth') || req.url.startsWith('/dashboard')) {
            req.url = '/';
          }
          
          next();
        });
      }
    },
    {
      name: 'rewrite-assets',
      enforce: 'pre',
      transform(code, id) {
        if (id.endsWith('.ts') || id.endsWith('.js')) {
          return {
            code: code.replace(/@Velari_Logo\.png/g, '/Velari_Logo.png'),
            map: null
          }
        }
      }
    }
  ]
}) 