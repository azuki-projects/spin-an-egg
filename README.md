# Coin Economy Messenger Bot 🪙

Node.js Facebook Messenger bot with username profiles, coin transfers, slots, math challenges, leaderboard, and administrator tools. MongoDB Atlas stores player accounts.

## Setup
1. Install dependencies: `npm install`
2. Configure your existing `setting.json` with Page token, webhook verify token, dashboard credentials, MongoDB URI/database, port, prefix and admins.
3. In Meta Messenger Webhooks set callback to `https://YOUR_HOST/webhook`, use the verify token from setting.json, and subscribe to `messages`.
4. Run `npm start`. Dashboard: `/`; health: `/health`.

## Player commands
- `setname <username>` — 3–16 letters, numbers or underscores. Free once every 7 days; early rename costs 1sx.
- `help [command]` — categorized help.
- `profile` — account ID, username, role, wallet.
- `bal`, `bal full`, `bal top [amount]`, `bal give <username> <amount>`
- `slot <bet|half|all|percentage%>` — five reels; 2 matching = x3, 3 = x6, 4 = x12, 5 = x25.
- `math <easy|normal|hard|very hard|extreme|impossible>`; answer with `math ans <number>`. Active challenges cannot be rerolled.

Amounts support suffixes including k, m, b, t, qa, qi, sx, sp, oc, no, dc and higher suffixes; scientific notation is also accepted.

## Admin commands
- `user set balance <username> <amount>`
- `user reset <username>` — resets wallet to 1,000 coins and clears active math.
- `user ban <username> <reason>`, `user unban <username>`
- `user admin add <username>`, `user admin rem <username>`

The bot sends direct notifications for transfers, admin coin grants, balance changes, bans/unbans and admin-role changes.

## Security
Do not publish Page access tokens, MongoDB connection strings, or dashboard credentials. If credentials were exposed, rotate them immediately.
