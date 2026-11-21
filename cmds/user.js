const db=require("../handlers/database");
const eco=require("../handlers/economy");
const noti=require("../handlers/notifications");
const db=require("../handlers/database");
const eco=require("../handlers/economy");
const noti=require("../handlers/notifications");

const ACTIONS=["setbalance","reset","ban","unban","adminadd","adminrem"];
module.exports={
 meta:{name:"user",aliases:["users"],description:"Administrator user management.",usage:"user <setbalance|reset|ban|unban|adminadd|adminrem> <username> [value]",permission:"admin",category:"Admin"},
 async run({id,u,args,bot}){
  const action=(args[0]||"").toLowerCase();
  if(!ACTIONS.includes(action))return bot.sendText(id,"Available actions:\nuser setbalance <username> <amount>\nuser reset <username>\nuser ban <username> [reason]\nuser unban <username>\nuser adminadd <username>\nuser adminrem <username>");
  const target=await eco.get(args[1]);
  if(!target)return bot.sendText(id,"Player not found. Use their registered username.");
  if(action==="setbalance"){
   const amount=eco.parseAmount(args[2]);
   if(!Number.isFinite(amount)||amount<0)return bot.sendText(id,"user setbalance <username> <amount>");
   const old=target.money;target.money=amount;await target.save();
   if(amount>old)noti.adminGift(target.fbId,u.username,amount-old);else noti.balance(target.fbId,amount,u.username);
   return bot.sendText(id,"Player: @"+target.username+"\nPrevious: "+eco.fmt(old)+"\nNew: "+eco.fmt(amount));
  }
  if(action==="reset"){
   target.money=1000;target.mathChallenge=null;await target.save();
   bot.sendText(target.fbId,"An administrator reset your wallet to 1,000 coins.");
   return bot.sendText(id,"Player: @"+target.username+"\nWallet: 1,000 coins");
  }
  if(action==="ban"||action==="unban"){
   if(target.fbId===id||(await db.getAdmins()).includes(target.fbId))return bot.sendText(id,"You cannot ban yourself or another administrator.");
   if(action==="ban"){
    target.banned=true;target.banReason=args.slice(2).join(" ")||"No reason provided";await target.save();noti.ban(target.fbId,target.banReason);
    return bot.sendText(id,"Player: @"+target.username+"\nReason: "+target.banReason);
   }
   target.banned=false;target.banReason="";await target.save();noti.unban(target.fbId);
   return bot.sendText(id,"Player: @"+target.username+"\nStatus: Unbanned");
  }
  if(target.fbId===id)return bot.sendText(id,"You cannot change your own administrator role.");
  if(action==="adminadd"){
   if(!await db.addAdmin(target.fbId))return bot.sendText(id,"Already an administrator.");
   noti.admin(target.fbId,true,u.username);
   return bot.sendText(id,"Player: @"+target.username+"\nRole: Administrator");
  }
  if(!await db.removeAdmin(target.fbId))return bot.sendText(id,"This player is not an administrator.");
  noti.admin(target.fbId,false,u.username);
  return bot.sendText(id,"Player: @"+target.username+"\nRole: Member");
 }
};