const clientId = '938822371207438476';
const DiscordRPC = require('discord-rpc');

// Only needed if you want to use spectate, join, or ask to join
DiscordRPC.register(clientId);
const path = require('path');
const url = require('url');


const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

async function setActivity() {
 

  const boops = 2;

  // You'll need to have snek_large and snek_small assets uploaded to
  // https://discord.com/developers/applications/<application_id>/rich-presence/assets
  rpc.setActivity({
    details: `Stage ${boops}`,
    state: 'in Development',
    startTimestamp,
    largeImageKey: 'snek_large',
    largeImageText: 'Beta Mode',
    smallImageKey: 'snek_small',
    smallImageText: 'Electron',
    instance: false,
  });
}

rpc.on('ready', () => {
  setActivity();

  console.log("ready");
  setInterval(() => {
    setActivity();
  }, 15e3);
});

rpc.login({ clientId }).catch(console.error);