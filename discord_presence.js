const clientId = 'presence';
const DiscordRPC = require('discord-rpc');
DiscordRPC.register(clientId);
const path = require('path');
const url = require('url');
const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

async function setActivity() {
 
  rpc.setActivity({
    details: `Stage 2`,
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
    setActivity();
});
 
rpc.login({ clientId }).catch(console.error);
module.exports.rpc=rpc;
