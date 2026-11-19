# Spin an Egg Facebook Messenger Game 🥚
Node.js Messenger bot with pet spins, collection, passive income, mutations, admin tools, and MongoDB Atlas.

## Setup
1. `npm install`
2. Edit `setting.json`: Facebook Page access token, webhook verify token, admin dashboard username/password, MongoDB Atlas URI and database, port, and admin Facebook IDs.
3. Meta Developer Messenger Webhooks: callback `https://YOUR_HOST/webhook`, verify token must match setting.json, subscribe the Page to `messages` and `messaging_postbacks`.
4. Run `npm start`. Dashboard at `/`, health check at `/health`.

Commands: setname (required first), profile, help, spin, pets equip/unequip, inventory, shop, upgrades, mutate, give. Admin commands: spawnpet, setpesos, reset, ban, unban. Pets/mutations are editable in JSON files.

MongoDB database and `users` collection are created automatically after the first user is saved.

**Security:** Never store real Page tokens, Mongo URI, or dashboard password in a public repository. Change the default dashboard password and keep secrets private.
