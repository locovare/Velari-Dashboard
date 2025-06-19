export default async function handler(req, res) {
  const guildId = req.query.guildId;
  const botToken = process.env.VITE_DISCORD_BOT_TOKEN || process.env.DISCORD_TOKEN;
  console.log('guildId:', guildId, 'botToken exists:', !!botToken);

  if (!guildId || !botToken) {
    console.log('Missing guildId or botToken');
    return res.status(400).json({ inGuild: false });
  }

  try {
    const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}`, {
      headers: {
        Authorization: `Bot ${botToken}`,
      },
    });
    console.log('Discord API status:', response.status);
    res.status(200).json({ inGuild: response.ok });
  } catch (e) {
    console.log('Error:', e);
    res.status(200).json({ inGuild: false });
  }
} 