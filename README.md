# DiscordInvites

[![VERSION](https://img.shields.io/badge/dynamic/json.svg?color=blue&label=version&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2FYourNetworkNerd%2FDiscordInvites%2Fmaster%2Fpackage.json)](https://github.com/YourNetworkNerd/DiscordInvites)
[![LICENSE](https://img.shields.io/badge/license-BSD--3--Clause-green.svg)](https://github.com/YourNetworkNerd/DiscordInvites/blob/master/LICENSE)
[![TWITTER](https://img.shields.io/badge/Twitter-YourNetworkNerd-1DA1F2.svg?logo=twitter)](https://twitter.com/YourNetworkNerd)
[![CHAT](https://img.shields.io/badge/Chat-Discord-7289DA.svg?logo=discord)](https://discord.gg/VG87Snx)
[![DOWNLOAD](https://img.shields.io/badge/Browser%20Version-JavaScript-F7DF1E.svg?logo=javascript)](https://raw.githubusercontent.com/YourNetworkNerd/DiscordInvites/master/dist/discord-invite.min.js)
[![DOWNLOAD](https://img.shields.io/badge/Node%20Version-TypeScript-007ACC.svg?logo=typescript)](https://raw.githubusercontent.com/YourNetworkNerd/DiscordInvites/master/src/discord-invite.node.ts)

📜 Read Discord Invites (In Browser and in Node!)

### Why Discord Invite?
This was a project I had on the backburner for a few years and going now as a nice way to parse
Discord Invites.

### Demonstration
Setup in HTML:
```html
<script src="./lib/discord-invite.min.js"></script>
<script type="text/javascript">
let inviteData = parseDiscordInvite('https://discord.gg/example');
</script>
```
Setup in Node.JS:
```ts
import parseDiscordInvite from './discord-invite';

let inviteData = parseDiscordInvite('https://discord.gg/example');
```

What this returns:
```js
// Verification Levels Legend:
// 0 = None
// 1 = Low
// 2 = Medium
// 3 = (╯°□°）╯︵ ┻━┻
// 4 = ┻━┻ミヽ(ಠ益ಠ)ﾉ彡┻━┻

// Channel Types Legend:
// 0 = Text Channel
// 1 = Direct Message
// 2 = Voice Channel
// 3 = Group DM
// 4 = Server Category
// 5 = News Channel
// 6 = Store Channel

let response = {
    code: "string",                     // Invite Code
    invite: "string",                   // Invite Link
    guild: {
        id: "string",                   // Server ID
        name: "string",                 // Server Name
        description: "string",          // Server Description (Feature)
        verification: 0,                // Verification Level
        icon: "string",                 // Hash String of Icon
        iconURL: "string",              // Server Icon URL
        features: [],                   // Array of String Features
        splash: "string",               // Hash String of Invite Splash (Feature)
        banner: "string",               // Hash String of Server Banner (Feature)
        vanityURL: "string",            // Vanity Invite Code (Feature)
        online: 0,                      // Approximate Users Online
        total: 0                        // Approximate Total Users
    },
    channel: {
        id: "string",                   // Channel ID
        type: 0,                        // Channel Type
        name: "string"                  // Channel Name
    }
}
```