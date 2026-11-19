const express=require("express"),path=require("path"),settings=require("./setting.json");
const db=require("./handlers/database"),commands=require("./handlers/commandHandler"),bot=require("./handlers/bot"),webhook=require("./handlers/webhook");
const app=express();app.use(express.json());app.get("/",(_,r)=>r.sendFile(path.join(__dirname,"index.html")));
app.get("/health",(_,r)=>r.json({ok:true,database:db.ready,commands:commands.commands.size}));
app.get("/webhook",webhook.verify);app.post("/webhook",webhook.receive);
app.post("/admin/login",(q,r)=>r.status(q.body.username===settings.adminUsername&&q.body.password===settings.adminPassword?200:401).json({ok:q.body.username===settings.adminUsername&&q.body.password===settings.adminPassword,token:settings.adminPassword}));
app.get("/admin/data",(q,r)=>{if(q.headers.authorization!=="Bearer "+settings.adminPassword)return r.sendStatus(401);r.json({status:db.ready?"connected":"offline",commands:[...commands.commands.values()].map(c=>c.meta),pets:require("./pets.json"),mutations:require("./mutations.json"),webhook:q.protocol+"://"+q.get("host")+"/webhook",uptime:process.uptime()})});
(async()=>{await db.connect();commands.load();bot.setHandler(commands);const port=process.env.PORT||settings.port;app.listen(port,"0.0.0.0",()=>console.log("Spin an Egg listening on "+port))})().catch(e=>{console.error(e);process.exit(1)});